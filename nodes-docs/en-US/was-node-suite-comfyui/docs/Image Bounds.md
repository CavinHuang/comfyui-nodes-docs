---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Bounds
## Documentation
- Class name: `Image Bounds`
- Category: `WAS Suite/Image/Bound`
- Output node: `False`

The Image Bounds node is designed to calculate the bounding box of an image, effectively identifying the outermost edges where content exists. This functionality is crucial for tasks that require understanding of image dimensions and spatial content, such as cropping, resizing, or further image analysis.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image for which the bounding box is to be calculated. It plays a critical role in determining the spatial limits of the content within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image_bounds`**
    - Comfy dtype: `IMAGE_BOUNDS`
    - The 'image_bounds' output provides the calculated bounding box of the input image, represented as a list of tuples with the format (min_row, max_row, min_col, max_col) for each image in the batch.
    - Python dtype: `List[Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Bounds:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE_BOUNDS",)
    FUNCTION = "image_bounds"

    CATEGORY = "WAS Suite/Image/Bound"

    def image_bounds(self, image):
        # Ensure we are working with batches
        image = image.unsqueeze(0) if image.dim() == 3 else image

        return([(0, img.shape[0]-1 , 0, img.shape[1]-1) for img in image],)

```
