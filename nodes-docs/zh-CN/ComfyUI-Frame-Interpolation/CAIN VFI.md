# Documentation
- Class name: CAIN_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

CAIN_VFI节点旨在对一系列图像执行帧插值，增强帧之间过渡的平滑度和连续性。它利用CAIN架构生成原始序列中不存在的中间帧，从而创建更密集、更详细的运动表示。

# Input types
## Required
- ckpt_name
    - 检查点名称对于加载帧插值所需的预训练模型权重至关重要。它标识了在操作中要使用的特定模型。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - 输入帧表示将被处理以进行帧插值的图像序列。这个输入是必不可少的，因为它构成了生成新帧的基础。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - 此参数确定在处理过程中清除缓存的频率，以管理内存使用情况。它影响节点的性能和内存效率。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - 乘数因子决定了要在每对输入帧之间生成的中间帧的数量。它直接影响输出帧序列的密度。
    - Comfy dtype: int
    - Python dtype: int
- optional_interpolation_states
    - 这个可选参数提供了对帧插值过程的额外控制，允许定制插值状态。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数包含生成的插值帧序列，其中包括原始帧和新创建的中间帧。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CAIN_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (CKPT_NAMES,), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames: typing.SupportsInt=1, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        from .cain_arch import CAIN
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        sd = torch.load(model_path)['state_dict']
        sd = {key.replace('module.', ''): value for (key, value) in sd.items()}
        global interpolation_model
        interpolation_model = CAIN(depth=3)
        interpolation_model.load_state_dict(sd)
        interpolation_model.eval().to(get_torch_device())
        del sd
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model):
            return model(frame_0.detach().clone(), frame_1.detach().clone())[0]
        args = [interpolation_model]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, use_timestep=False, dtype=torch.float32))
        return (out,)
```