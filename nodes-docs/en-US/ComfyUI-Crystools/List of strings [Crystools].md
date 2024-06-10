---
tags:
- List
- Text
---

# 🪛 List of strings
## Documentation
- Class name: `List of strings [Crystools]`
- Category: `crystools 🪛/List`
- Output node: `False`

This node is designed to aggregate multiple string inputs into a single list or a concatenated string, based on the provided delimiter. It facilitates the handling and manipulation of string collections within the Crystools framework, emphasizing ease of string data aggregation and manipulation.
## Input types
### Required
### Optional
- **`string_i`**
    - Represents one of the eight possible string inputs for aggregation. Each contributes to the formation of the list or the concatenated string output, depending on the presence of a delimiter.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`delimiter`**
    - A delimiter string used to concatenate the provided string inputs into a single string, if specified. Its presence or absence determines the output format (list or concatenated string).
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`concatenated`**
    - Comfy dtype: `STRING`
    - The concatenated string result of aggregating the input strings with the specified delimiter.
    - Python dtype: `str`
- **`list_string`**
    - Comfy dtype: `ListString`
    - A list containing the input strings, showcasing the node's ability to aggregate string data into a structured collection.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CListString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "string_1": STRING,
                "string_2": STRING,
                "string_3": STRING,
                "string_4": STRING,
                "string_5": STRING,
                "string_6": STRING,
                "string_7": STRING,
                "string_8": STRING,
                "delimiter": ("STRING", {"default": " "}),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.LIST.value
    RETURN_TYPES = ("STRING", CLASSES.CLIST_STRING_TYPE.value,)
    RETURN_NAMES = (TEXTS.CONCAT.value, KEYS.LIST.value)
    OUTPUT_IS_LIST = (False, True, )

    FUNCTION = "execute"

    def execute(self,
                string_1=None,
                string_2=None,
                string_3=None,
                string_4=None,
                string_5=None,
                string_6=None,
                string_7=None,
                string_8=None,
                delimiter=""):

        list_str = []

        if string_1 is not None and string_1 != "":
            list_str.append(string_1)
        if string_2 is not None and string_2 != "":
            list_str.append(string_2)
        if string_3 is not None and string_3 != "":
            list_str.append(string_3)
        if string_4 is not None and string_4 != "":
            list_str.append(string_4)
        if string_5 is not None and string_5 != "":
            list_str.append(string_5)
        if string_6 is not None and string_6 != "":
            list_str.append(string_6)
        if string_7 is not None and string_7 != "":
            list_str.append(string_7)
        if string_8 is not None and string_8 != "":
            list_str.append(string_8)

        return delimiter.join(list_str), [list_str]

```
