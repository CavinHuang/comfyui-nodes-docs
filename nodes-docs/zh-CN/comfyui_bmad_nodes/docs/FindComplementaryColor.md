
# Documentation
- Class name: FindComplementaryColor
- Category: Bmad/CV/Color A.
- Output node: False

这个节点旨在基于给定的颜色字典和指定的功率因子，在图像中寻找与主色互补的颜色。它还可以选择性地应用蒙版来聚焦于图像的特定区域进行搜索。

# Input types
## Required
- image
    - 需要寻找互补色的图像。它是分析的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- color_dict
    - 一个将颜色名称映射到其RGB值的字典，用于识别和比较图像中的颜色。
    - Comfy dtype: COLOR_DICT
    - Python dtype: Dict[str, Tuple[int, int, int]]
- power
    - 影响互补色选择的因子，用于调整算法对某些颜色的敏感度或偏好。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask
    - 一个可选的蒙版，可以应用于图像以将互补色的搜索限制在特定区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- color
    - 在图像中找到的互补色的RGB值。
    - Comfy dtype: COLOR
    - Python dtype: List[int]
- string
    - 找到的互补色的名称，根据输入的颜色字典定义。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FindComplementaryColor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "color_dict": ("COLOR_DICT",),
            "power": ("FLOAT", {"default": 0.5, "min": .01, "max": 10, "step": "0.01"}),
        },
            "optional":
                {
                    "mask": ("IMAGE",)
                }
        }

    RETURN_TYPES = ("COLOR", "STRING",)
    FUNCTION = "find_color"
    CATEGORY = "Bmad/CV/Color A."

    def find_color(self, image, color_dict, power, mask=None):
        image = tensor2opencv(image, 3)

        if mask is not None:
            mask = tensor2opencv(mask, 1)

            # this is a quality of life feature, so that it is easier to run the node and test stuff
            # the behavior (img resize w/ lin. interpolation) can be avoided by setting up the data prior to this node
            if image.shape[0:2] != mask.shape[0:2]:
                print("FindComplementaryColor node will resize image to fit mask.")
                image = cv.resize(image, (mask.shape[1], mask.shape[0]), interpolation=cv.INTER_LINEAR)

        color = find_complementary_color(image, color_dict, mask, power)
        return (list(color_dict[color]), color,)

```
