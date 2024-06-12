---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# CAIN VFI
## Documentation
- Class name: `CAIN VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

The CAIN_VFI node is designed for video frame interpolation, leveraging deep learning models to predict intermediate frames between existing ones in a video sequence. It focuses on enhancing video fluidity and frame rate by generating high-quality intermediate frames.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for loading the pre-trained CAIN model, which is essential for initializing the model with learned weights for frame interpolation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frames`**
    - The input frames to be interpolated. This tensor contains the consecutive frames between which the intermediate frames are to be generated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Determines after how many frames the cache should be cleared to manage memory usage efficiently during the interpolation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Defines the factor by which the frame rate is to be increased, indicating how many intermediate frames are to be generated between each pair of original frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_interpolation_states`**
    - Allows for the passing of optional states that can influence the interpolation process, providing flexibility in handling different interpolation scenarios.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output tensor containing the interpolated frames, enhancing the video's fluidity by filling in the gaps between original frames.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CAIN_VFI:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (CKPT_NAMES, ),
                "frames": ("IMAGE", ),
                "clear_cache_after_n_frames": ("INT", {"default": 10, "min": 1, "max": 1000}),
                "multiplier": ("INT", {"default": 2, "min": 2, "max": 1000})
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
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
        from .cain_arch import CAIN
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        sd = torch.load(model_path)["state_dict"]
        sd = {key.replace('module.', ''): value for key, value in sd.items()}


        global interpolation_model
        interpolation_model = CAIN(depth=3)
        interpolation_model.load_state_dict(sd)
        interpolation_model.eval().to(get_torch_device())
        del sd

        frames = preprocess_frames(frames)
    
        
        def return_middle_frame(frame_0, frame_1, timestep, model):
            #CAIN does some direct modifications to input frame tensors so we need to clone them
            return model(frame_0.detach().clone(), frame_1.detach().clone())[0]
        
        args = [interpolation_model]
        out = postprocess_frames(
            generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, 
                               interpolation_states=optional_interpolation_states, use_timestep=False, dtype=torch.float32)
        )
        return (out,)

```
