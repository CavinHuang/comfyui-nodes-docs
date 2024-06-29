---
tags:
- ImageSize
- ImageTransformation
---

# Match Dimensions (mtb)
## Documentation
- Class name: `Match Dimensions (mtb)`
- Category: `mtb/utils`
- Output node: `False`

The MTB_MatchDimensions node is designed to adjust the dimensions of an image to match those of a reference image along a specified dimension (height or width), ensuring the aspect ratio is preserved throughout the process.
## Input types
### Required
- **`source`**
    - The source image to be resized. It plays a crucial role in determining the new dimensions while preserving the aspect ratio.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`reference`**
    - The reference image whose dimensions are used as the target for resizing the source image. It dictates the final dimensions to aim for, guiding the resizing process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`match`**
    - Specifies whether the matching should be done based on the height or width of the reference image. This choice influences the resizing strategy and the final aspect ratio of the source image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str, Dict[str, str]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image with dimensions matched to the reference image, maintaining the original aspect ratio.
    - Python dtype: `IMAGE`
- **`new_width`**
    - Comfy dtype: `INT`
    - The new width of the resized image.
    - Python dtype: `INT`
- **`new_height`**
    - Comfy dtype: `INT`
    - The new height of the resized image.
    - Python dtype: `INT`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_MatchDimensions:
    """Match images dimensions along the given dimension, preserving aspect ratio."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "source": ("IMAGE",),
                "reference": ("IMAGE",),
                "match": (["height", "width"], {"default": "height"}),
            },
        }

    RETURN_TYPES = ("IMAGE", "INT", "INT")
    RETURN_NAMES = ("image", "new_width", "new_height")
    CATEGORY = "mtb/utils"
    FUNCTION = "execute"

    def execute(
        self, source: torch.Tensor, reference: torch.Tensor, match: str
    ):
        _batch_size, height, width, _channels = source.shape
        _rbatch_size, rheight, rwidth, _rchannels = reference.shape

        source_aspect_ratio = width / height
        # reference_aspect_ratio = rwidth / rheight

        source = source.permute(0, 3, 1, 2)
        reference = reference.permute(0, 3, 1, 2)

        if match == "height":
            new_height = rheight
            new_width = int(rheight * source_aspect_ratio)
        else:
            new_width = rwidth
            new_height = int(rwidth / source_aspect_ratio)

        resized_images = [
            F.resize(
                source[i],
                (new_height, new_width),
                antialias=True,
                interpolation=Image.BICUBIC,
            )
            for i in range(_batch_size)
        ]
        resized_source = torch.stack(resized_images, dim=0)
        resized_source = resized_source.permute(0, 2, 3, 1)

        return (resized_source, new_width, new_height)

```
