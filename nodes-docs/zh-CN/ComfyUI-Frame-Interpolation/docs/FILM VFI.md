# Documentation
- Class name: FILM_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

FILM_VFI节点旨在通过插帧增强视频内容，从而提高帧率和平滑度，同时不牺牲视觉质量。它通过一个复杂的模型实现这一点，该模型利用机器学习技术在现有帧之间生成中间帧，为视频序列带来更流畅、更逼真的运动效果。

# Input types
## Required
- ckpt_name
    - ckpt名称是一个关键参数，用于指定用于帧插值的预训练模型。它直接影响插值帧的质量和准确性，因为不同的模型可能在不同的数据集上训练或使用不同的算法。
    - Comfy dtype: STRING
    - Python dtype: str
- frames
    - 输入帧是帧插值过程的源材料。它们是必不可少的，因为它们提供了节点生成额外帧的视觉上下文，从而增强整个视频序列。这些输入帧的质量和分辨率在决定输出的视觉保真度方面起着重要作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - 该参数通过指定在帧插值过程中应多久清除一次缓存来帮助管理计算资源。它间接影响节点的性能和内存使用情况，确保其在可用系统资源内运行。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - 乘数参数决定了在每对输入帧之间要生成的额外帧数。它对于控制输出视频的密度至关重要，较高的值可以带来更平滑的运动，但代价是增加计算复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- optional_interpolation_states
    - 此参数通过指定哪些帧应跳过或不跳过来允许定制帧插值过程。它提供了对最终输出的一定控制水平，使节点能够迎合视频内容的特定要求或限制。
    - Comfy dtype: INTERPOLATION_STATES
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames代表帧插值过程的结果，包括原始输入帧和新生成的中间帧。这个输出很重要，因为它提供了更高帧率的视频，增强了视觉体验和运动的平滑度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class FILM_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (['film_net_fp32.pt'],), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        interpolation_states = optional_interpolation_states
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        model = torch.jit.load(model_path, map_location='cpu')
        model.eval()
        model = model.to(DEVICE)
        dtype = torch.float32
        frames = preprocess_frames(frames)
        number_of_frames_processed_since_last_cleared_cuda_cache = 0
        output_frames = []
        for frame_itr in range(len(frames) - 1):
            if interpolation_states is not None and interpolation_states.is_frame_skipped(frame_itr):
                continue
            frame_0 = frames[frame_itr:frame_itr + 1].to(DEVICE).float()
            frame_1 = frames[frame_itr + 1:frame_itr + 2].to(DEVICE).float()
            relust = inference(model, frame_0, frame_1, multiplier - 1)
            output_frames.extend([frame.detach().cpu().to(dtype=dtype) for frame in relust[:-1]])
            number_of_frames_processed_since_last_cleared_cuda_cache += 1
            if number_of_frames_processed_since_last_cleared_cuda_cache >= clear_cache_after_n_frames:
                print('Comfy-VFI: Clearing cache...')
                soft_empty_cache()
                number_of_frames_processed_since_last_cleared_cuda_cache = 0
                print('Comfy-VFI: Done cache clearing')
            gc.collect()
        output_frames.append(frames[-1:].to(dtype=dtype))
        output_frames = [frame.cpu() for frame in output_frames]
        out = torch.cat(output_frames, dim=0)
        print('Comfy-VFI: Final clearing cache...')
        soft_empty_cache()
        print('Comfy-VFI: Done cache clearing')
        return (postprocess_frames(out),)
```