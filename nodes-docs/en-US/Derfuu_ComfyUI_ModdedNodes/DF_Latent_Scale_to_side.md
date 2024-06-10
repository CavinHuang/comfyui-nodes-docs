---
tags:
- Latent
---

# Latent Scale to side
## Documentation
- Class name: `DF_Latent_Scale_to_side`
- Category: `Derfuu_Nodes/Modded nodes/Latent`
- Output node: `False`

This node is designed to upscale or modify the dimensions of a latent representation based on a specified side length and side (Width, Height, Longest, Shortest). It adjusts the latent's dimensions while maintaining its aspect ratio, using various scaling methods and optional cropping.
## Input types
### Required
- **`latent`**
    - The latent representation to be scaled. It is the core input that undergoes transformation based on the specified parameters.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`side_length`**
    - Specifies the target length for the chosen side (Width, Height, Longest, Shortest) of the latent, dictating the scale to which the latent will be adjusted.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`side`**
    - Determines which side of the latent (Width, Height, Longest, Shortest) the side_length applies to, guiding the scaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_method`**
    - The method used for scaling the latent's dimensions. It affects the quality and characteristics of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Optional parameter that specifies if and how the scaled latent should be cropped, affecting the final output's dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The scaled latent representation, adjusted according to the specified side length, side, scale method, and cropping option.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentScale_Side:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": Field.latent(),
                "side_length": Field.int(default=512),
                "side": Field.combo(["Longest", "Shortest", "Width", "Height"]),
                "scale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods)
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "upscale"

    CATEGORY = TREE_LATENTS

    def upscale(self, latent, side_length: int, side: str, scale_method, crop):

        size = get_latent_size(latent, True)

        lat_width = size[0]
        lat_height = size[1]

        width = lat_width
        height = lat_height

        def determineSide(_side: str) -> tuple[int, int]:
            width, height = 0, 0
            if _side == "Width":
                heigh_ratio = lat_height / lat_width
                width = side_length
                height = heigh_ratio * width
            elif _side == "Height":
                width_ratio = lat_width / lat_height
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

        cls = latent.copy()
        cls["samples"] = common_upscale(latent["samples"], width // 8, height // 8, scale_method, crop)
        return (cls,)

```
