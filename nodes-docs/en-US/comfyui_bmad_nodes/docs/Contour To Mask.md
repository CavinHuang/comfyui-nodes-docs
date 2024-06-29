---
tags:
- Contour
- Image
---

# Contour To Mask
## Documentation
- Class name: `Contour To Mask`
- Category: `Bmad/CV/Contour`
- Output node: `False`

This node is designed to convert a contour into a mask image, utilizing the specified output format. It effectively transforms the shape defined by the contour into a binary mask, which can be used for various image processing tasks.
## Input types
### Required
- **`image`**
    - The input image on which the contour is to be drawn. It serves as the base for the mask creation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`contour`**
    - The contour to be converted into a mask. It defines the shape that will be filled in the mask.
    - Comfy dtype: `CV_CONTOUR`
    - Python dtype: `custom type representing a contour in computer vision tasks`
- **`output_format`**
    - Specifies the desired output format for the mask image, allowing for flexibility in how the mask is utilized downstream.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `enum representing different image output formats`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting mask image, where the specified contour has been filled to create a binary mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ContourToMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "contour": ("CV_CONTOUR",),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "draw"
    CATEGORY = "Bmad/CV/Contour"

    def draw(self, image, contour, output_format):
        image = tensor2opencv(image, 1)
        image = np.zeros(image.shape, dtype=np.uint8)
        cv.drawContours(image, [contour], 0, (255), -1)
        image = maybe_convert_img(image, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(image)
        return (image,)

```
