---
tags:
- Mask
- MaskList
---

# 🔧 Mask From List
## Documentation
- Class name: `MaskFromList+`
- Category: `essentials`
- Output node: `False`

The `MaskFromList` node is designed for creating masks from a list of values, allowing for the specification of mask dimensions through width and height parameters. This functionality is essential for generating custom masks tailored to specific dimensions, facilitating various image processing tasks such as segmentation and conditioning.
## Input types
### Required
- **`values`**
    - The `values` parameter is a list of floating-point numbers representing the intensity values for the mask. These values are crucial for defining the mask's appearance, with each value corresponding to a pixel's intensity in the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
- **`width`**
    - The `width` parameter specifies the width of the mask to be generated. It determines the horizontal dimension of the mask, playing a critical role in shaping the mask's size and aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The `height` parameter defines the height of the mask to be generated. It determines the vertical dimension of the mask, affecting the mask's size and aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output `mask` parameter is the generated mask based on the provided values and dimensions. It represents the custom mask created to meet the specified width and height, suitable for various image processing applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskFromList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "values": ("FLOAT", { "min": 0.0, "max": 1.0, "step": 0.01, }),
                "width": ("INT", { "default": 32, "min": 1, "max": MAX_RESOLUTION, "step": 8, }),
                "height": ("INT", { "default": 32, "min": 1, "max": MAX_RESOLUTION, "step": 8, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, values, width, height):
        if not isinstance(values, list):
            values = [values]

        values = torch.tensor(values).float()
        values = torch.clamp(values, 0.0, 1.0)
        #values = (values - values.min()) / values.max()

        return (values.unsqueeze(1).unsqueeze(2).repeat(1, width, height), )

```
