# Documentation
- Class name: GMFSS_Fortuna_VFI
- Category: ComfyUI-Frame-Interpolation/VFI
- Output node: False
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

GMFSS_Fortuna_VFI节点旨在使用深度学习模型执行视频帧插值。它接收输入视频帧，并通过在现有帧之间生成额外的帧来提高帧率，从而创建更平滑的过渡和更高质量的视频输出。

# Input types
## Required
- ckpt_name
    - 检查点名称至关重要，因为它决定了用于帧插值过程的特定模型权重和架构。它影响插值帧的质量和风格。
    - Comfy dtype: str
    - Python dtype: str
- frames
    - 输入视频帧是插值所需的主要数据。它们被处理以生成中间帧，这对于实现所需的视频增强至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
## Optional
- clear_cache_after_n_frames
    - 此参数决定了在处理过程中CUDA缓存被清除的频率，以防止内存溢出。它在内存使用和处理时间之间进行平衡。
    - Comfy dtype: int
    - Python dtype: int
- multiplier
    - 乘数决定了在每对输入帧之间生成多少帧。乘数越高，输出帧率越高。
    - Comfy dtype: int
    - Python dtype: int
- optional_interpolation_states
    - 这个可选参数允许对插值过程进行自定义控制，例如跳过某些帧或应用特定的插值技术。
    - Comfy dtype: InterpolationStateList
    - Python dtype: InterpolationStateList

# Output types
- output_frames
    - output_frames参数包含插值后的视频帧。这些帧是帧插值过程的结果，代表了增强后的视频序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class GMFSS_Fortuna_VFI:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (list(CKPTS_PATH_CONFIG.keys()),), 'frames': ('IMAGE',), 'clear_cache_after_n_frames': ('INT', {'default': 10, 'min': 1, 'max': 1000}), 'multiplier': ('INT', {'default': 2, 'min': 2, 'max': 1000})}, 'optional': {'optional_interpolation_states': ('INTERPOLATION_STATES',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'vfi'
    CATEGORY = 'ComfyUI-Frame-Interpolation/VFI'

    def vfi(self, ckpt_name: typing.AnyStr, frames: torch.Tensor, clear_cache_after_n_frames=10, multiplier: typing.SupportsInt=2, optional_interpolation_states: InterpolationStateList=None, **kwargs):
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
        interpolation_model = CommonModelInference(model_type=ckpt_name)
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)

        def return_middle_frame(frame_0, frame_1, timestep, model, scale):
            return model(frame_0, frame_1, timestep, scale)
        scale = 1
        args = [interpolation_model, scale]
        out = postprocess_frames(generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, interpolation_states=optional_interpolation_states, dtype=torch.float32))
        return (out,)
```