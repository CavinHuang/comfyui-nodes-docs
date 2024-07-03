
# Documentation
- Class name: ColorDictionary (custom)
- Category: Bmad/CV/Color A.
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ColorDictionary节点允许用户创建一个自定义的颜色字典，通过将用户定义的颜色名称映射到相应的颜色值来实现。该节点确保颜色名称的数量与提供的颜色值数量相匹配，必要时会调整列表长度以使两者保持一致。

# Input types
## Required
- color_names
    - 这是一个由用户定义的颜色名称列表。这些名称将作为生成的颜色字典中的键使用。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- colors
    - 这是一个与提供的颜色名称相对应的颜色值列表。这些值将作为生成的颜色字典中的值使用。
    - Comfy dtype: COLOR
    - Python dtype: List[Tuple[int, int, int]]

# Output types
- color_dict
    - 输出的color_dict是一个将提供的颜色名称映射到其相应颜色值的自定义颜色字典。
    - Comfy dtype: COLOR_DICT
    - Python dtype: Dict[str, Tuple[int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorCustomDictionary:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "color_names": ("STRING", {"default": ""}),
            "colors": ("COLOR", {"default": ""})
        }
        }

    RETURN_TYPES = ("COLOR_DICT",)
    FUNCTION = "ret"
    CATEGORY = "Bmad/CV/Color A."
    INPUT_IS_LIST = True

    def ret(self, color_names, colors):
        if len(color_names) != len(colors):
            print_yellow("color_names size is different than colors size!")
            min_len = min(len(color_names), len(colors))
            color_names = color_names[0:min_len]
            colors = colors[0:min_len]

        return (dict(zip(color_names, colors)),)

```
