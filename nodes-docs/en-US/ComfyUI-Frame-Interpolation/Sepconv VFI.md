---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# Sepconv VFI
## Documentation
- Class name: `Sepconv VFI`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

The Sepconv VFI node is designed for video frame interpolation, utilizing separable convolutional networks to enhance the smoothness and quality of interpolated frames. It leverages advanced deep learning techniques to predict intermediate frames between existing ones in a video sequence, aiming to achieve high fidelity and temporally coherent video frame interpolation.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model, which is crucial for loading the correct pretrained weights and ensuring the model operates as expected.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frames`**
    - The input video frames to be interpolated. This parameter is essential for providing the raw data from which intermediate frames will be generated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clear_cache_after_n_frames`**
    - Determines after how many frames the cache should be cleared to manage memory usage effectively during interpolation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiplier`**
    - Defines the number of intermediate frames to be generated between each pair of original frames, directly affecting the output video's frame rate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_interpolation_states`**
    - Allows for the passing of optional states that may affect the interpolation process, offering flexibility in handling different interpolation scenarios.
    - Comfy dtype: `INTERPOLATION_STATES`
    - Python dtype: `InterpolationStateList`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output interpolated video frames, enhanced in smoothness and quality through the sepconv VFI process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SepconvVFI:
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
        clear_cache_after_n_frames = 10,
        multiplier: typing.SupportsInt = 2,
        optional_interpolation_states: InterpolationStateList = None,
        **kwargs
    ):
        from .sepconv_enhanced import Network
        model_path = load_file_from_github_release(MODEL_TYPE, ckpt_name)
        interpolation_model = Network()
        interpolation_model.load_state_dict(torch.load(model_path))
        interpolation_model.eval().to(get_torch_device())
        frames = preprocess_frames(frames)
        
        def return_middle_frame(frame_0, frame_1, timestep, model):
            return model(frame_0, frame_1)
        
        args = [interpolation_model]
        out = postprocess_frames(
            generic_frame_loop(frames, clear_cache_after_n_frames, multiplier, return_middle_frame, *args, 
                               interpolation_states=optional_interpolation_states, use_timestep=False, dtype=torch.float32)
        )
        return (out,)

```
