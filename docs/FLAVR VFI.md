# Documentation
- Class name: FLAVR_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

FLAVR_VFI节点旨在对输入帧序列执行帧插值，增强动画的平滑度和连续性。它使用底层模型生成中间帧，有效地将帧率翻倍。此节点对于需要流畅运动而无需大量计算资源的应用至关重要。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于识别用于帧插值的特定模型权重至关重要。它确保加载正确的模型配置以处理帧。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是一个关键输入，包含要进行插值的图像序列。它构成了插值过程的基础，节点在提供的帧之间生成额外的帧，以实现更平滑的过渡。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames参数决定了在处理期间多久清除一次GPU缓存以保持最佳性能。它有助于有效管理内存使用，防止由于内存过载而导致的潜在减速或崩溃。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - multiplier参数指定应增加帧率的倍数。目前，节点仅支持乘数为2，这将输入序列的帧率翻倍。
    - Comfy dtype: int
    - Python dtype: int
- duplicate_first_last_frames
    - 当设置为true时，duplicate_first_last_frames参数会在输出序列中复制第一帧和最后一帧。这对于保持插值动画的一致开头和结尾非常有用。
    - Comfy dtype: bool
    - Python dtype: bool
- optional_interpolation_states
    - optional_interpolation_states参数提供了一种通过指定应跳过或包含哪些帧来自定义插值过程的方法。这允许微调插值以满足特定的创意要求。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- interpolated_frames
    - interpolated_frames输出包含插值过程后的帧序列结果。这些帧包括原始输入帧以及新生成的中间帧，提供了更平滑、更连续的视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class FLAVR_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 2}), 'duplicate_first_last_frames': ('BOOLEAN', {'default': False})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, duplicate_first_last_frames: bool=False, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        if multiplier != 2:
            warnings.warn('Currently, FLAVR only supports 2x interpolation. The process will continue but please set multiplier=2 afterward')
        assert_batch_size(frames, batch_size=4, vfi_name='ST-MFNet')
        interpolation_states = optional_interpolation_states
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        model = build_flavr(model_path)
        frames = preprocess_frames(frames)
        padder = InputPadder(frames.shape, 16)
        frames = padder.pad(frames)
        number_of_frames_processed_since_last_cleared_cuda_cache = 0
        output_frames = []
        for frame_itr in range(len(frames) - 3):
            if interpolation_states is not None and interpolation_states.is_frame_skipped(frame_itr) and interpolation_states.is_frame_skipped(frame_itr + 1):
                continue
            (frame0, frame1, frame2, frame3) = (frames[frame_itr:frame_itr + 1].float(), frames[frame_itr + 1:frame_itr + 2].float(), frames[frame_itr + 2:frame_itr + 3].float(), frames[frame_itr + 3:frame_itr + 4].float())
            new_frame = model([frame0.to(device), frame1.to(device), frame2.to(device), frame3.to(device)])[0].detach().cpu()
            number_of_frames_processed_since_last_cleared_cuda_cache += 2
            if frame_itr == 0:
                output_frames.append(frame0)
                if duplicate_first_last_frames:
                    output_frames.append(frame0)
                output_frames.append(frame1)
            output_frames.append(new_frame)
            output_frames.append(frame2)
            if frame_itr == len(frames) - 4:
                output_frames.append(frame3)
                if duplicate_first_last_frames:
                    output_frames.append(frame3)
            if number_of_frames_processed_since_last_cleared_cuda_cache >= clear_cache_after_n_frames:
                print('Comfy-VFI: Clearing cache...', end=' ')
                soft_empty_cache()
                number_of_frames_processed_since_last_cleared_cuda_cache = 0
                print('Done cache clearing')
            gc.collect()
        dtype = torch.float32
        output_frames = [frame.cpu().to(dtype=dtype) for frame in output_frames]
        out = torch.cat(output_frames, dim=0)
        out = padder.unpad(out)
        print('Comfy-VFI: Final clearing cache...', end=' ')
        soft_empty_cache()
        print('Done cache clearing')
        return (postprocess_frames(out),)
```