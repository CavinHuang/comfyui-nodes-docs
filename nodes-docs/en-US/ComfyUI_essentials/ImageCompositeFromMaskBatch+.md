---
tags:
- Image
- ImageBlend
- ImageComposite
---

# 🔧 Image Composite From Mask Batch
## Documentation
- Class name: `ImageCompositeFromMaskBatch+`
- Category: `essentials`
- Output node: `False`

This node is designed to create a composite image by blending two images based on a mask. It adjusts the dimensions and scales of the input images and mask to ensure compatibility, then applies the mask to blend 'image_from' and 'image_to' into a single output image.
## Input types
### Required
- **`image_from`**
    - The base image over which the 'image_to' will be blended based on the 'mask'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_to`**
    - The image to be blended onto the 'image_from' image according to the 'mask'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - A binary mask determining the blending of 'image_from' and 'image_to'. The areas marked by the mask will favor 'image_to'.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting composite image after blending 'image_from' and 'image_to' based on the 'mask'.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageCompositeFromMaskBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_from": ("IMAGE", ),
                "image_to": ("IMAGE", ),
                "mask": ("MASK", )
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image_from, image_to, mask):
        frames = mask.shape[0]

        if image_from.shape[1] != image_to.shape[1] or image_from.shape[2] != image_to.shape[2]:
            image_to = p(image_to)
            image_to = comfy.utils.common_upscale(image_to, image_from.shape[2], image_from.shape[1], upscale_method='bicubic', crop='center')
            image_to = pb(image_to)

        if frames < image_from.shape[0]:
            image_from = image_from[:frames]
        elif frames > image_from.shape[0]:
            image_from = torch.cat((image_from, image_from[-1].unsqueeze(0).repeat(frames-image_from.shape[0], 1, 1, 1)), dim=0)

        mask = mask.unsqueeze(3).repeat(1, 1, 1, 3)

        if image_from.shape[1] != mask.shape[1] or image_from.shape[2] != mask.shape[2]:
            mask = p(mask)
            mask = comfy.utils.common_upscale(mask, image_from.shape[2], image_from.shape[1], upscale_method='bicubic', crop='center')
            mask = pb(mask)

        out = mask * image_to + (1 - mask) * image_from

        return (out, )

```
