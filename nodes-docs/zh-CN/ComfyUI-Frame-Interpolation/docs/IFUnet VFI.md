# Documentation
- Class name: IFUnet_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

IFUnet_VFI节点旨在执行视频帧插值，通过生成中间帧来增强视频过渡的平滑度和连续性。它利用深度学习模型来预测并插入现有帧之间的帧，从而提高视频序列的整体视觉质量和流畅性。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于识别用于帧插值的特定模型权重至关重要。它将节点指向正确的预训练模型，确保帧生成过程的准确性和效率。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是必需的，因为它提供了节点将处理插值的输入视频帧。输入帧的质量和分辨率直接影响输出帧的视觉外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames参数在帧插值过程中管理内存使用方面非常重要。它通过在处理一定数量的帧后清除缓存，有助于维护系统性能。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - multiplier参数决定了在连续帧之间生成的中间帧的数量。它是控制插值帧的密度，进而控制视频平滑度的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- scale_factor
    - scale_factor参数在处理前调整输入帧的缩放比例。这是一个重要因素，可以影响插值帧的细节和分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ensemble
    - ensemble参数启用集成方法来提高插值帧的稳定性和质量。它是一个可选特性，可以在某些条件下增强节点的性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- optional_interpolation_states
    - optional_interpolation_states参数提供了对插值过程的额外控制，允许根据特定要求或约束定制帧生成。
    - Comfy dtype: INTERPOLATION_STATES
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数代表帧插值过程的结果。它包含原始帧以及新生成的中间帧，增强了视频的连续性和视觉吸引力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IFUnet_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000}), 'scale_factor': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 100, 'step': 0.1}), 'ensemble': ('BOOLEAN', {'default': True})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames: typing.SupportsInt=1, multiplier: typing.SupportsInt=2, scale_factor: typing.SupportsFloat=1.0, ensemble: bool=True, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .IFUNet_arch import IFUNetModel
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = IFUNetModel()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model, scale_factor, ensemble):
            return model(frame_0, frame_1, timestep=timestep, scale=scale_factor, ensemble=ensemble)
        args = [interpolation_model, scale_factor, ensemble]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32))
        return (out,)
```