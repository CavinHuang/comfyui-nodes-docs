
# Documentation
- Class name: DF_Latent_Scale_to_side
- Category: Derfuu_Nodes/Modded nodes/Latent
- Output node: False

此节点旨在根据指定的一侧长度和边(宽度、高度、最长边、最短边)来对潜在表示进行放大或修改尺寸。它会在保持潜在表示纵横比的同时调整其尺寸,可使用多种缩放方法并可选择性裁剪。

# Input types
## Required
- latent
    - 需要进行缩放的潜在表示。这是根据指定参数进行变换的核心输入。
    - Comfy dtype: LATENT
    - Python dtype: dict
- side_length
    - 指定潜在表示所选边(宽度、高度、最长边、最短边)的目标长度,决定了潜在表示将被调整到的比例。
    - Comfy dtype: INT
    - Python dtype: int
- side
    - 确定side_length应用于潜在表示的哪一边(宽度、高度、最长边、最短边),指导缩放过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scale_method
    - 用于缩放潜在表示尺寸的方法。它影响输出的质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop
    - 可选参数,指定是否以及如何裁剪缩放后的潜在表示,影响最终输出的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- latent
    - 根据指定的边长、边、缩放方法和裁剪选项调整后的缩放潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: dict


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
