# ⌨️IG ZFill
## Documentation
- Class name: `IG ZFill`
- Category: `🐓 IG Nodes/Primitives`
- Output node: `False`

The IG ZFill node provides a simple yet effective way to pad a given integer value with leading zeros until it reaches a specified length. This functionality is essential in formatting numbers to ensure consistent digit counts, which can be particularly useful in data presentation and string manipulation tasks.
## Input types
### Required
- **`value`**
    - Specifies the integer value to be padded with leading zeros. This parameter determines the base number that will undergo transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill`**
    - Determines the total length of the output string after padding. This parameter sets the target length for the zero-filled string.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting string after padding the input value with leading zeros to meet the specified length.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_ZFill:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": -sys.maxsize, "max": sys.maxsize, "step": 1}),
                "fill": ("INT", {"default": 6, "min": 0, "max": 8, "step": 1}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value, fill):
        return (f"{value}".zfill(fill),)

```
