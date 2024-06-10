---
tags:
- Time
---

# Datetime String
## Documentation
- Class name: `JWDatetimeString`
- Category: `jamesWalker55`
- Output node: `False`

This node generates a string representation of the current datetime, formatted according to a specified pattern. It abstracts the complexity of datetime formatting, providing a simple interface for obtaining formatted datetime strings.
## Input types
### Required
- **`format`**
    - Specifies the format in which the current datetime should be returned. This allows for customization of the output string according to the needs of the application.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a string that represents the current datetime, formatted according to the specified pattern.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWDatetimeString", "Datetime String")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "format": ("STRING", {"default": "%Y-%m-%dT%H:%M:%S"}),
        }
    }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "execute"

    def execute(self, format: str):
        now = datetime.now()
        return (now.strftime(format),)

    @classmethod
    def IS_CHANGED(cls, *args):
        # This value will be compared with previous 'IS_CHANGED' outputs
        # If inequal, then this node will be considered as modified
        # NaN is never equal to itself
        return float("NaN")

```
