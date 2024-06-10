---
tags:
- Crop
- Image
- ImageTransformation
---

# ImageTransformCropCorners
## Documentation
- Class name: `ImageTransformCropCorners`
- Category: `image/transform`
- Output node: `False`

This node applies a cropping operation to the corners of images, allowing for rounded corners with specified radii. It supports selective rounding of each corner and utilizes supersampling anti-aliasing (SSAA) for higher quality results.
## Input types
### Required
- **`images`**
    - The input images to be processed for corner cropping.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - The radius of the corners to be rounded.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top_left_corner`**
    - Flag to indicate whether the top left corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`top_right_corner`**
    - Flag to indicate whether the top right corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`bottom_right_corner`**
    - Flag to indicate whether the bottom right corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`bottom_left_corner`**
    - Flag to indicate whether the bottom left corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`SSAA`**
    - The supersampling anti-aliasing factor to improve the quality of the corner rounding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for resizing the image during the SSAA process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The images after cropping and rounding the specified corners.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropCorners:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {
                    "default": 180,
                    "max": 360,
                    "step": 1
                }),
                "top_left_corner": (["true", "false"],),
                "top_right_corner": (["true", "false"],),
                "bottom_right_corner": (["true", "false"],),
                "bottom_left_corner": (["true", "false"],),
                "SSAA": ("INT", {
                    "default": 4,
                    "min": 1,
                    "max": 16,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    # noinspection PyUnresolvedReferences, PyArgumentList
    def node(
            self,
            images,
            radius,
            top_left_corner,
            top_right_corner,
            bottom_right_corner,
            bottom_left_corner,
            SSAA,
            method
    ):
        sampler = get_sampler_by_name(method)

        height, width = images[0, :, :, 0].shape

        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)

        draw.rounded_rectangle(
            ((0, 0), (width * SSAA, height * SSAA)),
            radius * SSAA, (255, 255, 255, 255),
            corners=(
                True if top_left_corner == "true" else False,
                True if top_right_corner == "true" else False,
                True if bottom_right_corner == "true" else False,
                True if bottom_left_corner == "true" else False
            )
        )

        canvas = canvas.resize((width, height), sampler)
        mask = 1.0 - canvas.image_to_tensor()[:, :, 3]

        def crop_tensor(tensor):
            return torch.stack([
                (tensor[:, :, i] - mask).clamp(0, 1) for i in range(tensor.shape[2])
            ], dim=2)

        return (torch.stack([
            crop_tensor(images[i]) for i in range(len(images))
        ]),)

```
