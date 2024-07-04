
# Documentation
- Class name: ColorDictionary
- Category: Bmad/CV/Color A.
- Output node: False

ColorDictionary节点提供了一组预定义的颜色名称及其对应的RGB值。它允许根据输入参数从这组颜色中选择特定数量的颜色，以创建自定义的颜色字典。

# Input types
## Required
- number_of_colors
    - 指定从预定义集合中选择的颜色数量。这决定了生成的颜色字典的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- color_dict
    - 一个将颜色名称映射到其RGB值的字典，颜色数量受指定的数量限制。
    - Comfy dtype: COLOR_DICT
    - Python dtype: Dict[str, Tuple[int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorDefaultDictionary:
    default_color_dict = {
        "red": (255, 0, 0),
        "green": (0, 255, 0),
        "blue": (0, 0, 255),
        "white": (255, 255, 255),
        "black": (0, 0, 0),
        "yellow": (255, 255, 0),
        "cyan": (0, 255, 255),
        "magenta": (255, 0, 255),
        "purple": (128, 0, 128),
        "teal": (0, 128, 128),
        "orange": (255, 165, 0),
        "pink": (255, 192, 203),
        #    "brown": (165, 42, 42),
        #    "gray": (128, 128, 128),
    }

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"number_of_colors": ("INT", {"default": 8, "min": 2, "max": 12})}}

    RETURN_TYPES = ("COLOR_DICT",)
    FUNCTION = "ret"
    CATEGORY = "Bmad/CV/Color A."

    def ret(self, number_of_colors):
        dic = dict(list(self.default_color_dict.items())[0: number_of_colors])
        return (dic,)

```
