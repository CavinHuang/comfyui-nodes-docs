---
tags:
- Color
---

# ColorDictionary
## Documentation
- Class name: `ColorDictionary`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

The ColorDictionary node provides a predefined set of color names and their corresponding RGB values. It allows for the selection of a specific number of colors from this set, based on the input parameter, to create a customized color dictionary.
## Input types
### Required
- **`number_of_colors`**
    - Specifies the number of colors to select from the predefined set. This determines the size of the resulting color dictionary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`color_dict`**
    - Comfy dtype: `COLOR_DICT`
    - A dictionary mapping color names to their RGB values, limited by the specified number of colors.
    - Python dtype: `Dict[str, Tuple[int, int, int]]`
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
