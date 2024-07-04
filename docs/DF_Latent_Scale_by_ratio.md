
# Documentation
- Class name: DF_Latent_Scale_by_ratio
- Category: Derfuu_Nodes/Modded nodes/Latent
- Output node: False

这个节点旨在通过指定的比率来缩放图像的潜在表示，在调整其尺寸的同时保持潜在空间的完整性。它支持各种缩放和裁剪方法，以便微调输出结果。

# Input types
## Required
- latent
    - 需要被缩放的图像的潜在表示。它对于确定将根据缩放比例进行修改的基础尺寸至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- modifier
    - 一个缩放因子，决定潜在维度应该增加或减少多少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_method
    - 指定用于缩放潜在图像的方法，如nearest-exact、bilinear等，这会影响输出的质量和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop
    - 定义缩放后要应用的裁剪方法，允许调整潜在表示的纵横比或大小。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- latent
    - 根据指定的修改器、缩放方法和裁剪偏好调整后的缩放潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentScale_Ratio:
    scale_methods = scale_methods
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": Field.latent(),
                "modifier": Field.float(min=0),
                "scale_method": Field.combo(cls.scale_methods),
                "crop": Field.combo(cls.crop_methods),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "scale"
    CATEGORY = TREE_LATENTS

    def scale(self, latent, scale_method, crop, modifier):

        size = get_latent_size(latent, True)

        lat_width = size[0] * modifier
        lat_width = int(lat_width + lat_width % 8)

        lat_height = size[1] * modifier
        lat_height = int(lat_height + lat_height % 8)

        cls = latent.copy()
        cls["samples"] = common_upscale(latent["samples"], lat_width, lat_height, scale_method, crop)
        return (cls,)

```
