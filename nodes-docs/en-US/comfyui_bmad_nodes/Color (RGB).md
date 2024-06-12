---
tags:
- Color
---

# Color (RGB)
## Documentation
- Class name: `Color (RGB)`
- Category: `Bmad/image`
- Output node: `False`

This node is designed for creating a color representation from individual red, green, and blue (RGB) components. It enables the specification of each color component to form a composite color, which can be used in various image processing and color manipulation tasks.
## Input types
### Required
- **`r`**
    - The red component of the color, an integral value that defines the intensity of red in the final color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`g`**
    - The green component of the color, an integral value that defines the intensity of green in the final color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The blue component of the color, an integral value that defines the intensity of blue in the final color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - The composite color formed from the specified red, green, and blue components. This output is significant for subsequent image processing or color manipulation tasks, providing a standardized color format.
    - Python dtype: `Tuple[int, int, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorRGB:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"r": color255_INPUT, "g": color255_INPUT, "b": color255_INPUT}}

    RETURN_TYPES = ("COLOR",)
    FUNCTION = "ret"
    CATEGORY = "Bmad/image"

    def ret(self, r, g, b):
        return ([r, g, b],)

```
