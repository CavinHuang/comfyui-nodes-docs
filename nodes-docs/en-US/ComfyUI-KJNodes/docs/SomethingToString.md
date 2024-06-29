---
tags:
- String
- Text
---

# SomethingToString
## Documentation
- Class name: `SomethingToString`
- Category: `KJNodes/text`
- Output node: `False`

Provides a flexible way to convert various input types into a string format, optionally allowing for the addition of prefixes or suffixes to customize the output.
## Input types
### Required
- **`input`**
    - The primary input for conversion to string. This parameter is central to the node's operation, as it determines the base content that will be transformed into a string format.
    - Comfy dtype: `*`
    - Python dtype: `Union[int, float, bool]`
### Optional
- **`prefix`**
    - An optional prefix to prepend to the stringified input. This allows for additional context or formatting to be applied to the beginning of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`suffix`**
    - An optional suffix to append to the stringified input. This enables further customization or formatting at the end of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of the conversion process, potentially including any specified prefixes or suffixes, formatted as a string.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SomethingToString:
    @classmethod
    
    def INPUT_TYPES(s):
     return {
        "required": {
        "input": (any, {}),
    },
    "optional": {
        "prefix": ("STRING", {"default": ""}),
        "suffix": ("STRING", {"default": ""}),
    }
    }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "stringify"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Converts any type to a string.
"""

    def stringify(self, input, prefix="", suffix=""):
        if isinstance(input, (int, float, bool)):   
            stringified = str(input)
            if prefix:  # Check if prefix is not empty
                stringified = prefix + stringified  # Add the prefix
            if suffix:  # Check if suffix is not empty
                stringified = stringified + suffix  # Add the suffix
        else:
            return
        return (stringified,)

```
