---
tags:
- Image
- ImageTransformation
---

# Batch Transform (mtb)
## Documentation
- Class name: `Batch Transform (mtb)`
- Category: `mtb/batch`
- Output node: `False`

This node is designed to apply a series of 2D transformations to batches of images, including operations such as translation, rotation, and scaling. It abstracts complex image manipulation processes into a more accessible interface for batch processing, enhancing the efficiency and flexibility of image transformation tasks.
## Input types
### Required
- **`image`**
    - The input image tensor to be transformed, serving as the primary data upon which the batch transformations are applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`border_handling`**
    - Specifies the method for handling borders during the transformation process, affecting how the image is extended or cropped.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`constant_color`**
    - Defines the color used to fill any new areas of the image created as a result of the transformation, ensuring visual consistency.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
### Optional
- **`x`**
    - Optional list of floats representing the translation distances along the x-axis for each image in the batch.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float] | None`
- **`y`**
    - Optional list of floats representing the translation distances along the y-axis for each image in the batch.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float] | None`
- **`zoom`**
    - Optional list of floats indicating the zoom levels to be applied to each image in the batch.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float] | None`
- **`angle`**
    - Optional list of floats specifying the rotation angles for each image in the batch, in degrees.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float] | None`
- **`shear`**
    - Optional list of floats detailing the shear angles to be applied to each image in the batch, adding a skew effect.
    - Comfy dtype: `FLOATS`
    - Python dtype: `list[float] | None`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed image tensor, resulting from the applied batch of 2D transformations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_Batch2dTransform:
    """Transform a batch of images using a batch of keyframes"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "border_handling": (
                    ["edge", "constant", "reflect", "symmetric"],
                    {"default": "edge"},
                ),
                "constant_color": ("COLOR", {"default": "#000000"}),
            },
            "optional": {
                "x": ("FLOATS",),
                "y": ("FLOATS",),
                "zoom": ("FLOATS",),
                "angle": ("FLOATS",),
                "shear": ("FLOATS",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "transform_batch"
    CATEGORY = "mtb/batch"

    def get_num_elements(
        self, param: None | torch.Tensor | list[torch.Tensor] | list[float]
    ) -> int:
        if isinstance(param, torch.Tensor):
            return torch.numel(param)

        elif isinstance(param, list):
            return len(param)

        return 0

    def transform_batch(
        self,
        image: torch.Tensor,
        border_handling: str,
        constant_color: str,
        x: list[float] | None = None,
        y: list[float] | None = None,
        zoom: list[float] | None = None,
        angle: list[float] | None = None,
        shear: list[float] | None = None,
    ):
        if all(
            self.get_num_elements(param) <= 0
            for param in [x, y, zoom, angle, shear]
        ):
            raise ValueError(
                "At least one transform parameter must be provided"
            )

        keyframes: dict[str, list[float]] = {
            "x": [],
            "y": [],
            "zoom": [],
            "angle": [],
            "shear": [],
        }

        default_vals = {"x": 0, "y": 0, "zoom": 1.0, "angle": 0, "shear": 0}

        if x and self.get_num_elements(x) > 0:
            keyframes["x"] = x
        if y and self.get_num_elements(y) > 0:
            keyframes["y"] = y
        if zoom and self.get_num_elements(zoom) > 0:
            # some easing types like elastic can pull back... maybe it should abs the value?
            keyframes["zoom"] = [max(x, 0.00001) for x in zoom]
        if angle and self.get_num_elements(angle) > 0:
            keyframes["angle"] = angle
        if shear and self.get_num_elements(shear) > 0:
            keyframes["shear"] = shear

        for name, values in keyframes.items():
            count = len(values)
            if count > 0 and count != image.shape[0]:
                raise ValueError(
                    f"Length of {name} values ({count}) must match number of images ({image.shape[0]})"
                )
            if count == 0:
                keyframes[name] = [default_vals[name]] * image.shape[0]

        transformer = MTB_TransformImage()
        res = [
            transformer.transform(
                image[i].unsqueeze(0),
                keyframes["x"][i],
                keyframes["y"][i],
                keyframes["zoom"][i],
                keyframes["angle"][i],
                keyframes["shear"][i],
                border_handling,
                constant_color,
            )[0]
            for i in range(image.shape[0])
        ]
        return (torch.cat(res, dim=0),)

```
