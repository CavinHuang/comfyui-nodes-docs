# Documentation
- Class name: M2M_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

M2M_VFI节点旨在在两个给定的视频帧之间插入帧，增强视频序列的平滑度和连续性。它利用深度学习模型生成原始素材中不存在的中间帧，从而创造出更加流畅的视觉体验。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于确定用于帧插值的特定预训练模型至关重要。它确保加载正确的权重和配置，以实现所需的插值结果。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是必需的，因为它代表了节点将处理插值的输入视频帧。输入帧的质量和分辨率直接影响插值的输出，使这个参数对节点的执行非常重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames参数决定了节点清理缓存以管理内存使用的频率。这对于维护性能很重要，尤其是在处理大量视频数据时。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - multiplier参数影响在输入帧之间生成的中间帧的数量。值越高，生成的插值帧越多，可以实现更平滑的过渡，但也可能增加计算需求。
    - Comfy dtype: int
    - Python dtype: int
- optional_interpolation_states
    - optional_interpolation_states参数提供了一种通过指定某些状态或条件来自定义插值过程的方法。这个高级功能允许对输出帧进行更大程度的控制，以满足特定项目需求。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数代表帧插值过程的结果。它包含了原始帧以及新生成的中间帧，提供了一个完整和增强的视频序列。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class M2M_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames: typing.SupportsInt=1, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .M2M_arch import M2M_PWC
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = M2M_PWC()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, int_timestep, model):
            tenSteps = [torch.FloatTensor([int_timestep] * len(frame_0)).view(len(frame_0), 1, 1, 1).to(get_torch_device())]
            return model(frame_0, frame_1, tenSteps)[0]
        args = [interpolation_model]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32))
        return (out,)
```