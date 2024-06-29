---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Image Blend by Mask
## Documentation
- Class name: `Image Blend by Mask`
- Category: `WAS Suite/Image`
- Output node: `False`

The Image Blend by Mask node is designed to blend two images together based on a mask and a specified blend percentage. It allows for the creation of composite images by selectively blending parts of two input images according to the mask's pattern, offering a high degree of control over the blending process.
## Input types
### Required
- **`image_a`**
    - The first image to be blended. It serves as the base layer in the blending operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second image to be blended. It is combined with the first image according to the mask and blend percentage.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - A mask image that determines the blending pattern. Areas in white allow the second image to show through, while black areas retain the first image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blend_percentage`**
    - A float value that specifies the percentage of blending between the two images. A higher value increases the visibility of the second image in the blended result.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after blending the two input images based on the mask and blend percentage.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Blend_Mask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "mask": ("IMAGE",),
                "blend_percentage": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_blend_mask"

    CATEGORY = "WAS Suite/Image"

    def image_blend_mask(self, image_a, image_b, mask, blend_percentage):

        # Convert images to PIL
        img_a = tensor2pil(image_a)
        img_b = tensor2pil(image_b)
        mask = ImageOps.invert(tensor2pil(mask).convert('L'))

        # Mask image
        masked_img = Image.composite(img_a, img_b, mask.resize(img_a.size))

        # Blend image
        blend_mask = Image.new(mode="L", size=img_a.size,
                               color=(round(blend_percentage * 255)))
        blend_mask = ImageOps.invert(blend_mask)
        img_result = Image.composite(img_a, masked_img, blend_mask)

        del img_a, img_b, blend_mask, mask

        return (pil2tensor(img_result), )

```
