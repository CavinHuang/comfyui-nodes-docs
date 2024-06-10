---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Image scale by ratio
## Documentation
- Class name: `DF_Image_scale_by_ratio`
- Category: `Derfuu_Nodes/Modded nodes/Image`
- Output node: `False`

This node is designed to upscale an image by a specified ratio, applying a chosen upscale method and optionally cropping the image. It focuses on adjusting the image's dimensions based on a scaling factor, enhancing the image quality or fitting it into a desired size while maintaining its aspect ratio.
## Input types
### Required
- **`image`**
    - The image to be upscaled. It is central to the node's operation as it determines the base for scaling and the subject of the upscale process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_by`**
    - The factor by which the image's dimensions should be increased. This value directly influences the final size of the upscaled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_method`**
    - The method used for upscaling the image. Different methods can affect the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Determines if and how the upscaled image should be cropped, affecting the final composition and aspect ratio of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled version of the input image, potentially cropped according to the specified method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageScale_Ratio:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
                "upscale_by": Field.float(),
                "upscale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = TREE_IMAGES

    def upscale(self, image, upscale_method, upscale_by, crop):
        size = get_image_size(image)

        width_B = int(size[0])
        height_B = int(size[1])

        samples = image.movedim(-1, 1)

        height = math.ceil(height_B * upscale_by)
        width = math.ceil(width_B * upscale_by)
        cls = common_upscale(samples, width, height, upscale_method, crop)
        cls = cls.movedim(1, -1)
        return (cls,)

```
