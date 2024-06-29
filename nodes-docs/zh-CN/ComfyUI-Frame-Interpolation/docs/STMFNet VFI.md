# Documentation
- Class name: STMFNet_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

STMFNet_VFI节点旨在执行视频帧插值，增强视频序列中帧之间过渡的平滑度。它通过生成原始素材中不存在的中间帧来实现这一点，从而增加帧率并提高整体视觉质量。

# Input types
## Required
- ckpt_name
    - 检查点名称对于加载帧插值过程所需的预训练模型权重至关重要。它确保模型具有生成准确中间帧所需的必要参数。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - 输入帧是节点处理以创建插值帧的原始视频数据。这些帧的质量和分辨率直接影响插值的输出。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - 此参数确定系统在处理期间多久清除一次缓存，这有助于管理内存使用。对于长视频序列来说尤其重要，以防止内存过载。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - 乘数用于确定帧率将增加的倍数。然而，当前实现仅支持乘数为2。
    - Comfy dtype: int
    - Python dtype: int
- duplicate_first_last_frames
    - 启用此选项时，它会在输出中复制第一帧和最后一帧，这可以为插值视频序列提供更平滑的开始和结束。
    - Comfy dtype: bool
    - Python dtype: bool
- optional_interpolation_states
    - 此可选参数允许自定义插值状态，可以根据特定标准在插值过程中跳过某些帧。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- interpolated_frames
    - STMFNet_VFI节点的输出是插值后的视频帧。这些帧是帧插值过程的结果，准备用于视频编辑或播放。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class STMFNet_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (['stmfnet.pth'],), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 2}), 'duplicate_first_last_frames': ('BOOLEAN', {'default': False})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, duplicate_first_last_frames: bool=False, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .stmfnet_arch import STMFNet_Model
        if multiplier != 2:
            warnings.warn('Currently, ST-MFNet only supports 2x interpolation. The process will continue but please set multiplier=2 afterward')
        assert_batch_size(frames, batch_size=4, vfi_name='ST-MFNet')
        interpolation_states = optional_interpolation_states
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        model = STMFNet_Model()
        model.load_state_dict(torch.load(model_path))
        model = model.eval().to(device)
        frames = preprocess_frames(frames)
        number_of_frames_processed_since_last_cleared_cuda_cache = 0
        output_frames = []
        for frame_itr in range(len(frames) - 3):
            if interpolation_states is not None and interpolation_states.is_frame_skipped(frame_itr) and interpolation_states.is_frame_skipped(frame_itr + 1):
                continue
            (frame0, frame1, frame2, frame3) = (frames[frame_itr:frame_itr + 1].float(), frames[frame_itr + 1:frame_itr + 2].float(), frames[frame_itr + 2:frame_itr + 3].float(), frames[frame_itr + 3:frame_itr + 4].float())
            new_frame = model(frame0.to(device), frame1.to(device), frame2.to(device), frame3.to(device)).detach().cpu()
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
                print('Comfy-VFI: Clearing cache...')
                soft_empty_cache()
                number_of_frames_processed_since_last_cleared_cuda_cache = 0
                print('Comfy-VFI: Done cache clearing')
            gc.collect()
        dtype = torch.float32
        output_frames = [frame.cpu().to(dtype=dtype) for frame in output_frames]
        out = torch.cat(output_frames, dim=0)
        print('Comfy-VFI: Final clearing cache...')
        soft_empty_cache()
        print('Comfy-VFI: Done cache clearing')
        return (postprocess_frames(out),)
```