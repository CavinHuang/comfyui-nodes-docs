---
tags:
- Mask
- MaskGeneration
---

# 🔧 Mask From Color
## Documentation
- Class name: `MaskFromColor+`
- Category: `essentials`
- Output node: `False`

The `MaskFromColor` node generates a binary mask from an image based on specified RGB color values and a threshold. It identifies areas within the image that match the given color within the threshold range, creating a mask that highlights these regions.
## Input types
### Required
- **`image`**
    - The input image from which to generate the mask. The color within this image is compared against the specified RGB values to create the mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`red`**
    - The red component of the target color, used in conjunction with green and blue components to define the color to match in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the target color, used together with red and blue to specify the color to match within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the target color, which, when combined with red and green, defines the specific color to match in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`threshold`**
    - The tolerance level for color matching. A higher threshold allows for a broader range of color variation to be considered a match.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output binary mask highlighting areas of the image that match the specified color within the given threshold.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskFromColor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "red": ("INT", { "default": 255, "min": 0, "max": 255, "step": 1, }),
                "green": ("INT", { "default": 255, "min": 0, "max": 255, "step": 1, }),
                "blue": ("INT", { "default": 255, "min": 0, "max": 255, "step": 1, }),
                "threshold": ("INT", { "default": 0, "min": 0, "max": 127, "step": 1, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, red, green, blue, threshold):
        temp = (torch.clamp(image, 0, 1.0) * 255.0).round().to(torch.int)
        color = torch.tensor([red, green, blue])
        lower_bound = (color - threshold).clamp(min=0)
        upper_bound = (color + threshold).clamp(max=255)
        lower_bound = lower_bound.view(1, 1, 1, 3)
        upper_bound = upper_bound.view(1, 1, 1, 3)
        mask = (temp >= lower_bound) & (temp <= upper_bound)
        mask = mask.all(dim=-1)
        mask = mask.float()

        return (mask, )

```
