---
tags:
- List
- Text
---

# String List From Newline
## Documentation
- Class name: `KepStringListFromNewline`
- Category: `List Stuff`
- Output node: `False`

This node is designed to convert a multiline string into a list of strings, each representing a line from the original string. It also calculates the number of strings generated.
## Input types
### Required
- **`Text`**
    - The 'Text' parameter takes a multiline string as input, which is then split into individual strings based on newline characters. This parameter is essential for determining the content and structure of the output list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`Strings`**
    - Comfy dtype: `STRING`
    - A list of strings, each representing a line from the input multiline string.
    - Python dtype: `List[str]`
- **`Num Strings`**
    - Comfy dtype: `INT`
    - The number of strings generated from splitting the input multiline string.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringListFromNewline:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "Text": ("STRING", {"multiline": True}),
            },
        }

    RETURN_TYPES = ("STRING", "INT")
    RETURN_NAMES = ("Strings", "Num Strings")
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "to_string_list"

    CATEGORY = "List Stuff"

    def to_string_list(self, Text: str) -> Tuple[List[str], List[int]]:
        return Text.split("\n"), [len(Text.split("\n"))]

```
