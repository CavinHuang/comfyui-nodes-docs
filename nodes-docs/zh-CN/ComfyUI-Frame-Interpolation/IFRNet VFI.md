# Documentation
- Class name: IFRNet_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

IFRNet_VFI节点旨在执行视频帧插值，增强视频序列中帧之间过渡的平滑度。它利用深度学习模型生成中间帧，从而在不牺牲视觉质量的情况下增加帧率。该节点特别适用于需要高帧率视频以获得更好运动清晰度的应用。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于加载帧插值过程所需的预训练模型权重至关重要。它决定了节点要使用的特定模型架构及其相应的权重。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是必需的，因为它代表了节点将处理插值的输入视频帧。输入帧的质量和分辨率直接影响帧插值的输出。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames参数用于优化帧插值过程中的内存使用。它指定了清空缓存以释放内存的帧数。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - multiplier参数定义了在原始帧之间插入新帧的速率。更高的乘数会导致输出视频的帧率更高。
    - Comfy dtype: int
    - Python dtype: int
- scale_factor
    - scale_factor参数用于在处理之前调整输入帧的分辨率。它可以用来根据需要放大或缩小帧。
    - Comfy dtype: float
    - Python dtype: float
- optional_interpolation_states
    - optional_interpolation_states参数提供了对帧插值过程的额外控制。它允许在插值期间为某些帧指定自定义状态或条件。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数代表帧插值过程的结果。它包含原始帧以及新生成的中间帧，从而产生更平滑的视频序列。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IFRNet_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000}), 'scale_factor': ([0.25, 0.5, 1.0, 2.0, 4.0], {'default': 1.0})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames: typing.SupportsInt=1, multiplier: typing.SupportsInt=2, scale_factor: typing.SupportsFloat=1.0, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .IFRNet_S_arch import IRFNet_S
        from .IFRNet_L_arch import IRFNet_L
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = IRFNet_S() if 'S' in ckpt_name else IRFNet_L()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model, scale_factor):
            return model(frame_0, frame_1, timestep, scale_factor)
        args = [interpolation_model, scale_factor]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32))
        return (out,)
```