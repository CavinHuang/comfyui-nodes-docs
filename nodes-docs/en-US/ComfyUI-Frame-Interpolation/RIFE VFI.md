---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# RIFE VFI (recommend rife47 and rife49)
## Documentation
- Class name: `RIFE VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

The RIFE_VFI node is designed for video frame interpolation, leveraging deep learning models to predict and generate intermediate frames between existing ones in a video sequence. This process enhances video fluidity and can be used for slow-motion effects, video restoration, or improving frame rates.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name of the model to be used for frame interpolation, affecting the quality and style of the generated frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frames`**
    - The input video frames to be interpolated, provided as a tensor. This is the core data on which frame interpolation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Indicates after how many frames the cache should be cleared to prevent memory overflow, optimizing resource usage during processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Defines the number of intermediate frames to be generated between each pair of original frames, directly influencing the smoothness of the output video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fast_mode`**
    - A boolean flag that, when enabled, allows the interpolation process to run in a faster mode at the possible expense of some quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`ensemble`**
    - A boolean parameter that, when true, enables the use of ensemble methods for improved frame interpolation quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`scale_factor`**
    - Determines the scale factor for resizing frames during the interpolation process, affecting the resolution of the output frames.
    - Comfy dtype: `COMBO[FLOAT]`
    - Python dtype: `float`
### Optional
- **`optional_interpolation_states`**
    - Provides optional states for controlling the interpolation process, allowing for advanced customization of frame generation.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the interpolation process, consisting of the original and newly generated intermediate frames, enhancing the fluidity of the video sequence.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [ImpactImageBatchToImageList](../../ComfyUI-Impact-Pack/Nodes/ImpactImageBatchToImageList.md)
    - [SaveAnimatedWEBP](../../Comfy/Nodes/SaveAnimatedWEBP.md)
    - Reroute



## Source code
```python
class RIFE_VFI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (
                    sorted(list(CKPT_NAME_VER_DICT.keys()), key=lambda ckpt_name: version.parse(CKPT_NAME_VER_DICT[ckpt_name])),
                    {"default": "rife47.pth"}
                ),
                "frames": ("IMAGE", ),
                "clear_cache_after_n_frames": ("INT", {"default": 10, "min": 1, "max": 1000}),
                "multiplier": ("INT", {"default": 2, "min": 1}),
                "fast_mode": ("BOOLEAN", {"default":True}),
                "ensemble": ("BOOLEAN", {"default":True}),
                "scale_factor": ([0.25, 0.5, 1.0, 2.0, 4.0], {"default": 1.0})
            },
            "optional": {
                "optional_interpolation_states": ("INTERPOLATION_STATES", )
            }
        }
    
    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "vfi"
    CATEGORY = "ComfyUI-Frame-Interpolation/VFI"
    
    def vfi(
        self,
        ckpt_name: typing.AnyStr,
        frames: torch.Tensor,
        clear_cache_after_n_frames = 10,
        multiplier: typing.SupportsInt = 2,
        fast_mode = False,
        ensemble = False,
        scale_factor = 1.0,
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
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
        out = postprocess_frames(
            generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, 
                               interpolation_states=optional_interpolation_states, dtype=torch.float32)
        )
        return (out,)

```
