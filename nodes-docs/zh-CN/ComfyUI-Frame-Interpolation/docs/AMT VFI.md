# Documentation
- Class name: AMT_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

AMT_VFI节点旨在执行视频帧插值，增强帧之间过渡的平滑度，并有效提高视频序列的帧率。它利用预训练模型生成原始素材中不存在的中间帧，为更流畅的视觉效果做出贡献。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于识别用于帧插值的特定模型配置至关重要。它将节点指向正确的预训练模型，确保所需的输出质量和性能。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是必需的，因为它表示节点将处理插值的输入视频帧。输入帧的质量和分辨率直接影响最终的插值输出。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames参数用于通过在处理指定数量的帧后清除缓存来优化内存使用。这有助于防止在密集的帧插值任务期间内存过载。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - multiplier参数决定了在两个现有帧之间生成的中间帧的数量。数值越高，输出视频的帧率越高，但也可能增加计算复杂性。
    - Comfy dtype: int
    - Python dtype: int
- optional_interpolation_states
    - optional_interpolation_states参数提供对帧插值过程的额外控制，允许为特定帧定制插值行为。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- interpolated_frames
    - interpolated_frames输出包含原始视频帧以及新生成的中间帧，从而产生更平滑且帧率更高的视频序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class AMT_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (list(CKPT_CONFIGS.keys()),), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 1, 'min': 1, 'max': 100}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames: typing.SupportsInt=1, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        model_path = load_file_from_direct_url(MODEL_TYPE, f'https://huggingface.co/lalala125/AMT/resolve/main/{ckpt_name}')
        ckpt_config = CKPT_CONFIGS[ckpt_name]
        interpolation_model = ckpt_config['network'](**ckpt_config['params'])
        interpolation_model.load_state_dict(torch.load(model_path)['state_dict'])
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)
        padder = InputPadder(frames.shape, 16)
        frames = padder.pad(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model):
            return model(frame_0, frame_1, embt=torch.FloatTensor([timestep] * frame_0.shape[0]).view(frame_0.shape[0], 1, 1, 1).to(get_torch_device()), scale_factor=1.0, eval=True)['imgt_pred']
        args = [interpolation_model]
        out = generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32)
        out = padder.unpad(out)
        out = postprocess_frames(out)
        return (out,)
```