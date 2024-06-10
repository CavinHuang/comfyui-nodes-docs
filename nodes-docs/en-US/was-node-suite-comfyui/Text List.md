---
tags:
- List
- Text
---

# Text List
## Documentation
- Class name: `Text List`
- Category: `WAS Suite/Text`
- Output node: `False`

The node is designed to aggregate multiple string inputs into a single list, allowing for flexible text data collection and manipulation.
## Input types
### Required
### Optional
- **`text_a`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_e`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_f`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_g`**
    - A string input that can be optionally provided to be included in the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`list`**
    - Comfy dtype: `LIST`
    - The output is a list of strings aggregated from the provided inputs.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_List:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "text_a": ("STRING", {"forceInput": True}),
                "text_b": ("STRING", {"forceInput": True}),
                "text_c": ("STRING", {"forceInput": True}),
                "text_d": ("STRING", {"forceInput": True}),
                "text_e": ("STRING", {"forceInput": True}),
                "text_f": ("STRING", {"forceInput": True}),
                "text_g": ("STRING", {"forceInput": True}),
            }
        }
    RETURN_TYPES = ("LIST",)
    FUNCTION = "text_as_list"

    CATEGORY = "WAS Suite/Text"

    def text_as_list(self, **kwargs):
        text_list: list[str] = []

        # Iterate over the received inputs in sorted order.
        for k in sorted(kwargs.keys()):
            v = kwargs[k]

            # Only process string input ports.
            if isinstance(v, str):
                text_list.append(v)

        return (text_list,)

```
