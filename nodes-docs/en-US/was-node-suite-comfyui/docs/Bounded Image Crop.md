---
tags:
- Crop
- Image
- ImageTransformation
---

# Bounded Image Crop
## Documentation
- Class name: `Bounded Image Crop`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

This node is designed to crop images based on specified bounding coordinates, ensuring that the cropping process is adapted to the dimensions of each image in a batch. It facilitates the precise extraction of image regions, allowing for focused analysis or manipulation of specific areas within images.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image or a batch of images to be cropped. It plays a crucial role in determining the regions to be extracted based on the provided bounding coordinates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_bounds`**
    - The 'image_bounds' parameter specifies the coordinates for cropping the image(s). It defines the rectangular region(s) within the image(s) to be extracted, ensuring targeted manipulation of the image content.
    - Comfy dtype: `IMAGE_BOUNDS`
    - Python dtype: `List[Tuple[int, int, int, int]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a cropped version of the input image or images, adjusted according to the specified bounding coordinates. It enables focused analysis or manipulation of specific regions within the images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Bounded_Image_Crop:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": ("IMAGE",),
                "image_bounds": ("IMAGE_BOUNDS",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "bounded_image_crop"

    CATEGORY = "WAS Suite/Image/Bound"

    def bounded_image_crop(self, image, image_bounds):
        # Ensure we are working with batches
        image = image.unsqueeze(0) if image.dim() == 3 else image

        # If number of images and bounds don't match, then only the first bounds will be used
        # to crop the images, otherwise, each bounds will be used for each image 1 to 1
        bounds_len = 1 if len(image_bounds) != len(image) else len(image)

        cropped_images = []
        for idx in range(len(image)):
            # If only one bounds object, no need to extract and calculate more than once.
            if (bounds_len == 1 and idx == 0) or bounds_len > 1:
                rmin, rmax, cmin, cmax = image_bounds[idx]

                # Check if the provided bounds are valid
                if rmin > rmax or cmin > cmax:
                    raise ValueError("Invalid bounds provided. Please make sure the bounds are within the image dimensions.")

            cropped_images.append(image[idx][rmin:rmax+1, cmin:cmax+1, :])

        return (torch.stack(cropped_images, dim=0),)

```
