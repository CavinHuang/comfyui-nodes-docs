---
tags:
- ImageMask
- Mask
- MaskGeneration
---

# ImageColorToMask
## Documentation
- Class name: `ImageColorToMask`
- Category: `mask`
- Output node: `False`

The ImageColorToMask node is designed to convert a specified color in an image to a mask. It processes an image and a target color, generating a mask where the specified color is highlighted, facilitating operations like color-based segmentation or object isolation.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be processed. It is crucial for determining the areas of the image that match the specified color to be converted into a mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`color`**
    - The 'color' parameter specifies the target color in the image to be converted into a mask. It plays a key role in identifying the specific color areas to be highlighted in the resulting mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask highlighting the areas of the input image that match the specified color. This mask can be used for further image processing tasks, such as segmentation or object isolation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageColorToMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "image": ("IMAGE",),
                    "color": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFF, "step": 1, "display": "color"}),
                }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)
    FUNCTION = "image_to_mask"

    def image_to_mask(self, image, color):
        temp = (torch.clamp(image, 0, 1.0) * 255.0).round().to(torch.int)
        temp = torch.bitwise_left_shift(temp[:,:,:,0], 16) + torch.bitwise_left_shift(temp[:,:,:,1], 8) + temp[:,:,:,2]
        mask = torch.where(temp == color, 255, 0).float()
        return (mask,)

```
