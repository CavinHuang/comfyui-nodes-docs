---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# IFUnet VFI
## Documentation
- Class name: `IFUnet VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

The IFUnet_VFI node is designed for video frame interpolation, leveraging deep learning models to predict and generate intermediate frames between existing frames in a video sequence. This process enhances video smoothness and can be used for various applications such as slow-motion video generation, video restoration, and improving video frame rates.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be used in the interpolation process, determining the specific pre-trained weights and configuration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `typing.AnyStr`
- **`frames`**
    - The input video frames to be interpolated, provided as a tensor. This is the core data on which the interpolation model operates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Controls how often the cache is cleared during the interpolation process to manage memory usage effectively.
    - Comfy dtype: `INT`
    - Python dtype: `typing.SupportsInt`
- **`multiplier`**
    - Determines the number of intermediate frames to be generated between each pair of original frames, directly affecting the smoothness of the output video.
    - Comfy dtype: `INT`
    - Python dtype: `typing.SupportsInt`
- **`scale_factor`**
    - A factor that scales the resolution of the output frames, allowing for adjustments in the size of the interpolated frames.
    - Comfy dtype: `FLOAT`
    - Python dtype: `typing.SupportsFloat`
- **`ensemble`**
    - A boolean flag indicating whether to use ensemble methods for interpolation, potentially improving the quality of the output frames.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`optional_interpolation_states`**
    - Provides the option to specify states for selective frame interpolation, enabling more control over which frames are processed.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output interpolated video frames, enhancing the smoothness and temporal resolution of the input video sequence.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IFUnet_VFI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (CKPT_NAMES, ),
                "frames": ("IMAGE", ),
                "clear_cache_after_n_frames": ("INT", {"default": 10, "min": 1, "max": 1000}),
                "multiplier": ("INT", {"default": 2, "min": 2, "max": 1000}),
                "scale_factor": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 100, "step": 0.1}),
                "ensemble": ("BOOLEAN", {"default":True})
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
        clear_cache_after_n_frames: typing.SupportsInt = 1,
        multiplier: typing.SupportsInt = 2,
        scale_factor: typing.SupportsFloat = 1.0,
        ensemble: bool = True,
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
        from .IFUNet_arch import IFUNetModel
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = IFUNetModel()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)
        
        def return_middle_frame(frame_0, frame_1, timestep, model, scale_factor, ensemble):
            return model(frame_0, frame_1, timestep=timestep, scale=scale_factor, ensemble=ensemble)
        
        args = [interpolation_model, scale_factor, ensemble]
        out = postprocess_frames(
            generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, 
                               interpolation_states=optional_interpolation_states, dtype=torch.float32)
        )
        return (out,)

```
