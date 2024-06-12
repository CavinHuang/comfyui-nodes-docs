---
tags:
- Crop
- Image
- ImageTransformation
---

# Bounded Image Crop with Mask
## Documentation
- Class name: `Bounded Image Crop with Mask`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

This node is designed to crop images based on specified masks, adjusting the cropping boundaries with additional padding parameters. It ensures that the cropping operation is sensitive to the presence and shape of objects within the images as defined by the masks, allowing for dynamic and context-aware image processing.
## Input types
### Required
- **`image`**
    - The input image or batch of images to be cropped. This parameter is crucial as it defines the visual content that will be processed and cropped according to the mask and padding parameters.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask or batch of masks used to determine the cropping boundaries around the objects of interest within the images. This parameter is essential for identifying the relevant areas to be retained after cropping.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding_left`**
    - Specifies the amount of padding to add to the left boundary of the crop. This affects the horizontal positioning and width of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_right`**
    - Specifies the amount of padding to add to the right boundary of the crop. This affects the horizontal positioning and width of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_top`**
    - Specifies the amount of padding to add to the top boundary of the crop. This affects the vertical positioning and height of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_bottom`**
    - Specifies the amount of padding to add to the bottom boundary of the crop. This affects the vertical positioning and height of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output consists of a batch of cropped images, each adjusted according to its corresponding mask and the specified padding parameters.
    - Python dtype: `torch.Tensor`
- **`image_bounds`**
    - Comfy dtype: `IMAGE_BOUNDS`
    - The boundaries used for each crop are returned, providing insight into the cropping process.
    - Python dtype: `List[List[int]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Bounded_Image_Crop_With_Mask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "padding_left": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "padding_right": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "padding_top": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
                "padding_bottom": ("INT", {"default": 64, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE_BOUNDS",)
    FUNCTION = "bounded_image_crop_with_mask"

    CATEGORY = "WAS Suite/Image/Bound"

    def bounded_image_crop_with_mask(self, image, mask, padding_left, padding_right, padding_top, padding_bottom):
        # Ensure we are working with batches
        image = image.unsqueeze(0) if image.dim() == 3 else image
        mask = mask.unsqueeze(0) if mask.dim() == 2 else mask

        # If number of masks and images don't match, then only the first mask will be used on
        # the images, otherwise, each mask will be used for each image 1 to 1
        mask_len = 1 if len(image) != len(mask) else len(image)

        cropped_images = []
        all_bounds = []
        for i in range(len(image)):
            # Single mask or multiple?
            if (mask_len == 1 and i == 0) or mask_len > 0:
                rows = torch.any(mask[i], dim=1)
                cols = torch.any(mask[i], dim=0)
                rmin, rmax = torch.where(rows)[0][[0, -1]]
                cmin, cmax = torch.where(cols)[0][[0, -1]]

                rmin = max(rmin - padding_top, 0)
                rmax = min(rmax + padding_bottom, mask[i].shape[0] - 1)
                cmin = max(cmin - padding_left, 0)
                cmax = min(cmax + padding_right, mask[i].shape[1] - 1)

            # Even if only a single mask, create a bounds for each cropped image
            all_bounds.append([rmin, rmax, cmin, cmax])
            cropped_images.append(image[i][rmin:rmax+1, cmin:cmax+1, :])

            return torch.stack(cropped_images), all_bounds

```
