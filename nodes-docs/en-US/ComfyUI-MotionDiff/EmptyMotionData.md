---
tags:
- MotionData
---

# Empty Motion Data
## Documentation
- Class name: `EmptyMotionData`
- Category: `MotionDiff`
- Output node: `False`

The EmptyMotionData node is designed to generate a template for motion data with specified frame lengths. It primarily serves the purpose of creating a base structure for motion data that can be further processed or manipulated, providing a standardized format for initializing motion-related tasks within the MotionDiff framework.
## Input types
### Required
- **`frames`**
    - Specifies the number of frames for the generated motion data. This parameter directly influences the shape of the motion tensor, thereby determining the temporal length of the motion data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`motion_data`**
    - Comfy dtype: `MOTION_DATA`
    - Outputs a dictionary containing tensors for motion, motion mask, and motion length, establishing a foundational structure for motion data with zeroed motion values and appropriate masking.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class EmptyMotionData:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "frames": ("INT", {"default": 196, "min": 1, "max": 196})
            }
        }

    RETURN_TYPES = ("MOTION_DATA", )
    CATEGORY = "MotionDiff"
    FUNCTION = "encode_text"

    def encode_text(self, frames):
        return ({
            'motion': torch.zeros(1, frames, 263),
            'motion_mask': torch.ones(1, frames),
            'motion_length': torch.Tensor([frames]).long(),
        }, )

```
