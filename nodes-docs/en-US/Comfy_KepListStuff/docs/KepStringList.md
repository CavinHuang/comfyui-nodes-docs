---
tags:
- List
- Text
---

# String List
## Documentation
- Class name: `KepStringList`
- Category: `List Stuff`
- Output node: `False`

The KepStringList node is designed to aggregate and process multiple string inputs into a list format, accommodating both required and optional text inputs. It effectively combines various textual elements, providing a flexible mechanism for handling and organizing string data within a list structure.
## Input types
### Required
- **`Text1`**
    - A required string input that contributes to the formation of the string list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Text2`**
    - Another required string input that is included in the string list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`Text3`**
    - An optional string input that can be included in the string list if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Text4`**
    - An optional string input that can be included in the string list if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Text5`**
    - An optional string input that can be included in the string list if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Text6`**
    - An optional string input that can be included in the string list if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Text7`**
    - An optional string input that can be included in the string list if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`Strings`**
    - Comfy dtype: `STRING`
    - The list of strings aggregated from the input texts.
    - Python dtype: `List[str]`
- **`Num Strings`**
    - Comfy dtype: `INT`
    - The number of strings included in the output list, indicating the list's length.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringList:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "Text1": ("STRING", {}),
                "Text2": ("STRING", {}),
            },
            "optional": {
                "Text3": ("STRING", {}),
                "Text4": ("STRING", {}),
                "Text5": ("STRING", {}),
                "Text6": ("STRING", {}),
                "Text7": ("STRING", {}),
            },
        }

    RETURN_TYPES = ("STRING", "INT")
    RETURN_NAMES = ("Strings", "Num Strings")
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "to_string_list"

    CATEGORY = "List Stuff"

    def to_string_list(
            self,
            *args: str,
            **kwargs: str,
    ) -> Tuple[List[str], List[int]]:
        ret = []
        for arg in args:
            ret.append(arg)
        for arg in kwargs.values():
            if arg != "":
                ret.append(arg)

        return ret, [len(ret)]

```
