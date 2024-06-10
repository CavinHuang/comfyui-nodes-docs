---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# IFRNet VFI
## Documentation
- Class name: `IFRNet VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

The IFRNet VFI node is designed for video frame interpolation, leveraging deep learning models to predict and generate intermediate frames between existing frames in a video sequence. This process enhances video smoothness and can be used to increase the frame rate of videos.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to use, affecting the interpolation quality and style based on the trained data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frames`**
    - The input video frames to be interpolated, serving as the basis for generating intermediate frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Determines after how many frames the cache should be cleared to prevent memory overflow, impacting performance and memory usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Defines the number of intermediate frames to be generated between each pair of original frames, directly affecting the output video's frame rate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale_factor`**
    - The scale factor for resizing frames during the interpolation process, influencing the resolution of the output frames.
    - Comfy dtype: `COMBO[FLOAT]`
    - Python dtype: `float`
### Optional
- **`optional_interpolation_states`**
    - Optional states to control the interpolation process, allowing for customization of frame skipping and other behaviors.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output interpolated frames, enhancing the smoothness and frame rate of the input video sequence.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IFRNet_VFI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (CKPT_NAMES, ),
                "frames": ("IMAGE", ),
                "clear_cache_after_n_frames": ("INT", {"default": 10, "min": 1, "max": 1000}),
                "multiplier": ("INT", {"default": 2, "min": 2, "max": 1000}),
                "scale_factor": ([0.25, 0.5, 1.0, 2.0, 4.0], {"default": 1.0}),
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
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
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
        out = postprocess_frames(
            generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, 
                               interpolation_states=optional_interpolation_states, dtype=torch.float32)
        )
        return (out,)

```
