---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Image scale to side
## Documentation
- Class name: `DF_Image_scale_to_side`
- Category: `Derfuu_Nodes/Modded nodes/Image`
- Output node: `False`

This node is designed to upscale an image to a specified side length while maintaining the aspect ratio. It allows for the selection of which side (width, height, longest, or shortest) to scale to, the method of upscaling, and whether to apply cropping, providing flexibility in image processing tasks.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. It serves as the base for the upscaling process, determining the initial dimensions and aspect ratio that will be adjusted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`side_length`**
    - Specifies the target length of the side (width or height) to which the image will be scaled. This value directly influences the final dimensions of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`side`**
    - Determines which side of the image (width, height, longest, or shortest) will be scaled to the specified side length, affecting the upscaling direction and final aspect ratio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_method`**
    - The method used for upscaling the image, which affects the quality and characteristics of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Indicates whether and how the upscaled image should be cropped, affecting the final composition and dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled image, adjusted to the specified side length while maintaining the original aspect ratio.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - Reroute
    - [ImpactImageInfo](../../ComfyUI-Impact-Pack/Nodes/ImpactImageInfo.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class ImageScale_Side:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
                "side_length": Field.int(),
                "side": Field.combo(["Longest", "Shortest", "Width", "Height"]),
                "upscale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = TREE_IMAGES

    def upscale(self, image, upscale_method, side_length: int, side: str, crop):
        samples = image.movedim(-1, 1)

        size = get_image_size(image)

        width_B = int(size[0])
        height_B = int(size[1])

        width = width_B
        height = height_B

        def determineSide(_side: str) -> tuple[int, int]:
            width, height = 0, 0
            if _side == "Width":
                heigh_ratio = height_B / width_B
                width = side_length
                height = heigh_ratio * width
            elif _side == "Height":
                width_ratio = width_B / height_B
                height = side_length
                width = width_ratio * height
            return width, height

        if side == "Longest":
            if width > height:
                width, height = determineSide("Width")
            else:
                width, height = determineSide("Height")
        elif side == "Shortest":
            if width < height:
                width, height = determineSide("Width")
            else:
                width, height = determineSide("Height")
        else:
            width, height = determineSide(side)

        width = math.ceil(width)
        height = math.ceil(height)

        cls = common_upscale(samples, width, height, upscale_method, crop)
        cls = cls.movedim(1, -1)
        return (cls,)

```
