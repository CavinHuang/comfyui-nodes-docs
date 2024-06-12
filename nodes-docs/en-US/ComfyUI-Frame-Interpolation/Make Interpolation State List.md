---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# Make Interpolation State List
## Documentation
- Class name: `Make Interpolation State List`
- Category: `ComfyUI-Frame-Interpolation/VFI`
- Output node: `False`

This node is designed to generate a list of interpolation states based on provided frame indices and a skip list flag. It abstracts the process of preparing the necessary state information required for frame interpolation tasks, facilitating the setup for subsequent video frame interpolation operations.
## Input types
### Required
- **`frame_indices`**
    - Specifies the indices of frames to be included in the interpolation process. This string of comma-separated numbers is crucial for determining which frames are considered for interpolation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`is_skip_list`**
    - A boolean flag indicating whether certain frames should be skipped in the interpolation process. This affects the selection of frames for interpolation, enabling more control over the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`interpolation_states`**
    - Comfy dtype: `INTERPOLATION_STATES`
    - The output is a list of states that represent the configuration for frame interpolation, including which frames to interpolate and whether to skip certain frames.
    - Python dtype: `InterpolationStateList`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MakeInterpolationStateList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "frame_indices": ("STRING", {"multiline": True, "default": "1,2,3"}),
                "is_skip_list": ("BOOLEAN", {"default": True},),
            },
        }
    
    RETURN_TYPES = ("INTERPOLATION_STATES",)
    FUNCTION = "create_options"
    CATEGORY = "ComfyUI-Frame-Interpolation/VFI"    

    def create_options(self, frame_indices: str, is_skip_list: bool):
        frame_indices_list = [int(item) for item in frame_indices.split(',')]
        
        interpolation_state_list = InterpolationStateList(
            frame_indices=frame_indices_list,
            is_skip_list=is_skip_list,
        )
        return (interpolation_state_list,)

```
