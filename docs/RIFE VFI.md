# Documentation
- Class name: RIFE_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

RIFE_VFI节点旨在使用指定的检查点模型执行视频帧插值。它能够生成输入视频帧之间的插值帧，有效地将帧率翻倍。该节点通过顺序处理每个帧并创建新的帧来操作，增强了视频序列的平滑度和连续性。

# Input types
## Required
- ckpt_name
    - ckpt_name参数对于选择用于帧插值的适当检查点模型至关重要。它决定了节点将应用以生成插值帧的特定权重和架构。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - frames参数是必需的，因为它包含节点将处理的输入视频帧。输入帧的质量和分辨率直接影响插值的输出，使这个参数对节点的操作非常重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - clear_cache_after_n_frames是一个可选设置，它有助于在插值过程中管理内存使用。它指定在清除CUDA缓存以防止内存溢出之前要处理的帧数，这可以根据系统的内存容量和输入帧数进行调整。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - multiplier参数决定了输入帧生成输出帧时要乘以的倍数。例如，使用2的乘数，每个输入帧将产生两个输出帧，在它们之间有效地创建一个插值帧。
    - Comfy dtype: int
    - Python dtype: int
- fast_mode
    - fast_mode参数是一个可选的布尔标志，设置为True时，可以启用更快但可能不太精确的插值过程。这对于快速预览或处理大量帧时非常有用。
    - Comfy dtype: bool
    - Python dtype: bool
- ensemble
    - ensemble参数允许组合多个插值模型以提高插值帧的质量。启用后，它可能会增加处理时间，但可以导致更稳定和更高保真的结果。
    - Comfy dtype: bool
    - Python dtype: bool
- scale_factor
    - scale_factor参数在处理之前调整输入帧的分辨率。它特别适用于处理不同的帧大小，并可以影响最终输出的清晰度和细节。
    - Comfy dtype: float
    - Python dtype: float
- optional_interpolation_states
    - optional_interpolation_states参数提供了一种使用附加状态自定义插值过程的方法。这可以包括特定指令或条件，它们影响帧的插值方式，允许对输出进行更细粒度的控制。
    - Comfy dtype: INTERPOLATION_STATES
    - Python dtype: InterpolationStateList

# Output types
- interpolated_frames
    - interpolated_frames参数代表帧插值过程的输出。它包含原始输入帧以及新生成的中间帧，有效地创建了一个更平滑的视频序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RIFE_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (sorted(list(CKPT_NAME_VER_DICT.keys()), key=lambda ckpt_name: version.parse(CKPT_NAME_VER_DICT[ckpt_name])), {'default': 'rife47.pth'}), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 1}), 'fast_mode': ('BOOLEAN', {'default': True}), 'ensemble': ('BOOLEAN', {'default': True}), 'scale_factor': ([0.25, 0.5, 1.0, 2.0, 4.0], {'default': 1.0})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, fast_mode=False, ensemble=False, scale_factor=1.0, optional_interpolation_states: InterpolationStateList=None, **kwargs):
        """
        Perform video frame interpolation using a given checkpoint model.
    
        Args:
            ckpt_name (str): The name of the checkpoint model to use.
            frames (torch.Tensor): A tensor containing input video frames.
            clear_cache_after_n_frames (int, optional): The number of frames to process before clearing CUDA cache
                to prevent memory overflow. Defaults to 10. Lower numbers are safer but mean more processing time.
                How high you should set it depends on how many input frames there are, input resolution (after upscaling),
                how many times you want to multiply them, and how long you're willing to wait for the process to complete.
            multiplier (int, optional): The multiplier for each input frame. 60 input frames * 2 = 120 output frames. Defaults to 2.
    
        Returns:
            tuple: A tuple containing the output interpolated frames.
    
        Note:
            This method interpolates frames in a video sequence using a specified checkpoint model. 
            It processes each frame sequentially, generating interpolated frames between them.
    
            To prevent memory overflow, it clears the CUDA cache after processing a specified number of frames.
        """
        from .rife_arch import IFNet
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        arch_ver = CKPT_NAME_VER_DICT[ckpt_name]
        interpolation_model = IFNet(arch_ver=arch_ver)
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model, scale_list, in_fast_mode, in_ensemble):
            return model(frame_0, frame_1, timestep, scale_list, in_fast_mode, in_ensemble)
        scale_list = [8 / scale_factor, 4 / scale_factor, 2 / scale_factor, 1 / scale_factor]
        args = [interpolation_model, scale_list, fast_mode, ensemble]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32))
        return (out,)
```