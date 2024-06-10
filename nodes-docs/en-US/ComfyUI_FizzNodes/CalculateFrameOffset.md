---
tags:
- AnimationScheduling
- Frame
---

# Calculate Frame Offset 📅🅕🅝
## Documentation
- Class name: `CalculateFrameOffset`
- Category: `FizzNodes 📅🅕🅝/HelperNodes`
- Output node: `False`

This node is designed to calculate the offset for frame numbers in a sequence, facilitating the management of frame-based operations in animations or simulations. It computes the starting frame number based on the current frame, maximum number of frames, number of latent inputs, and an index, ensuring seamless transitions and looping in frame sequences.
## Input types
### Required
- **`current_frame`**
    - Specifies the current frame in the sequence. It is crucial for determining the starting point for the offset calculation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_frames`**
    - Defines the maximum number of frames in the sequence. It is essential for ensuring the calculated frame number loops correctly within the sequence limits.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_latent_inputs`**
    - Indicates the number of latent inputs used in the frame sequence. This parameter influences the calculation of the frame offset by adjusting the spacing between frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`index`**
    - Represents an index used in the calculation of the frame offset. It affects the final computed frame number, contributing to the determination of the starting frame.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Returns the calculated frame offset as an integer, facilitating the determination of the next frame in the sequence.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CalculateFrameOffset:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "current_frame": ("INT", {"default": 0, "min": 0}),
                "max_frames": ("INT", {"default": 18, "min": 0}),
                "num_latent_inputs": ("INT", {"default": 4, "min": 0}),
                "index": ("INT", {"default": 4, "min": 0}),
            }
        }
    RETURN_TYPES = ("INT", )
    FUNCTION = "assignFrameNum"

    CATEGORY = "FizzNodes 📅🅕🅝/HelperNodes"

    def assignFrameNum(self, current_frame, max_frames, num_latent_inputs, index):
        if current_frame == 0:
            return (index,)
        else:
            start_frame = (current_frame - 1) * (num_latent_inputs - 1) + (num_latent_inputs-1)
            return ((start_frame + index) % max_frames,)

```
