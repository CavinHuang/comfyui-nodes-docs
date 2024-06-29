# Documentation
- Class name: SepconvVFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

SepconvVFI节点旨在使用可分离卷积神经网络执行视频帧插值。它增强了视频序列中帧之间过渡的流畅性和平滑性，有助于在不需要大量计算开销的情况下提供更高质量的视觉体验。

# Input types
## Required
- ckpt_name
    - 检查点名称对于加载预训练模型权重至关重要，这些权重是帧插值过程所必需的。它保模型能够生成准确和高质量的插值帧。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - 输入帧是节点处理以创建中间帧的原始视频数据。这个输入是必不可少的，因为它构成了插值任务的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - 此参数决定了在处理过程中多久清除一次GPU缓存以保持最佳性能。这是一个可选设置，可以帮助管理系统资源。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - 乘数影响在两个输入帧之间生成的插值帧的数量。它是一个可选参数，允许用户控制插值帧的密度。
    - Comfy dtype: INT
    - Python dtype: int
- optional_interpolation_states
    - 这个可选参数提供了对插值过程的额外控制，允许为每个帧定制插值状态。
    - Comfy dtype: INTERPOLATION_STATES
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数包含节点生成的插值帧。这些帧是帧插值过程的结果，对于创建更平滑的视频过渡非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SepconvVFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .sepconv_enhanced import Network
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = Network()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model):
            return model(frame_0, frame_1)
        args = [interpolation_model]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, use_timestep=False, dtype=torch.float32))
        return (out,)
```