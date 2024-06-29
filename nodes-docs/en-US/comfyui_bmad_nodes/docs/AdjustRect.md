---
tags:
- Contour
- Image
---

# AdjustRect
## Documentation
- Class name: `AdjustRect`
- Category: `Bmad`
- Output node: `False`

The AdjustRect node is designed to adjust the dimensions and position of a rectangle based on specified modifiers and rounding modes. It abstracts the complexity of geometric transformations, offering a streamlined way to recalibrate rectangle coordinates for various applications.
## Input types
### Required
- **`a`**
    - Represents one of the coordinates (either x1 or y1) of the original rectangle, playing a crucial role in determining the new adjusted rectangle's position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - Represents one of the coordinates (either x2 or y2) of the original rectangle, contributing to the calculation of the new rectangle's dimensions and position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`c`**
    - Serves as a modifier to adjust the rectangle's width, directly influencing the final dimensions of the adjusted rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`d`**
    - Serves as a modifier to adjust the rectangle's height, directly influencing the final dimensions of the adjusted rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`xm`**
    - Specifies the modifier for the rectangle's width adjustment, affecting the calculation of the new width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ym`**
    - Specifies the modifier for the rectangle's height adjustment, affecting the calculation of the new height.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`round_mode`**
    - Determines the rounding mode to be applied during the adjustment process, impacting how the final dimensions are calculated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_format`**
    - Defines the format of the input coordinates, influencing how they are interpreted and transformed during the adjustment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_format`**
    - Specifies the format for the output coordinates, determining how the adjusted rectangle's dimensions and position are represented.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The adjusted rectangle's coordinates, reflecting the modifications applied based on the input parameters. It is represented as a tuple of four integers.
    - Python dtype: `Tuple[int, int, int, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AdjustRect:
    round_mode_map = {
        'Floor': math.floor,  # may be close to the image's edge, keep rect tight
        'Ceil': math.ceil,  # need the margin and image's edges aren't near
        'Round': round,  # whatever fits closest to the original rect
        'Exact': lambda v: 1  # force exact measurement
    }
    round_modes = list(round_mode_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "a": ("INT", {"min": 0, "max": np.iinfo(np.int32).max, "step": 1}),
            "b": ("INT", {"min": 0, "max": np.iinfo(np.int32).max, "step": 1}),
            "c": ("INT", {"min": 0, "max": np.iinfo(np.int32).max, "step": 1}),
            "d": ("INT", {"min": 0, "max": np.iinfo(np.int32).max, "step": 1}),
            "xm": ("INT", {"default": 64, "min": 2, "max": 1280, "step": 2}),
            "ym": ("INT", {"default": 64, "min": 2, "max": 1280, "step": 2}),
            "round_mode": (s.round_modes, {"default": s.round_modes[2]}),
            "input_format": (rect_modes, {"default": rect_modes[1]}),
            "output_format": (rect_modes, {"default": rect_modes[1]}),
        }}

    RETURN_TYPES = tuple(["INT" for x in range(4)])
    FUNCTION = "adjust"
    CATEGORY = "Bmad"

    def adjust(self, a, b, c, d, xm, ym, round_mode, input_format, output_format):
        x1, y1, x2, y2 = rect_modes_map[input_format]["toBounds"](a, b, c, d)
        center_x = (x1 + x2) // 2 + 1
        center_y = (y1 + y2) // 2 + 1
        # reasoning:
        # 00 01 02 03 04 05
        # __ -- -- -- -- __ ( original len of 4 )
        # __ x1 __ cx __ x2 ( target len of 4   )
        # most crop implementations include x1 but exclude x2;
        # thus is closer to original input
        # note that xm and ym are always even

        half_new_len_x = self.round_mode_map[round_mode]((x2 - x1) / xm) * xm // 2
        half_new_len_y = self.round_mode_map[round_mode]((y2 - y1) / ym) * ym // 2

        # note: these points can fall outside the image space
        x2 = x1 = center_x
        x2 += half_new_len_x
        x1 -= half_new_len_x
        y2 = y1 = center_y
        y2 += half_new_len_y
        y1 -= half_new_len_y

        # convert to desired output format
        x1, y1, x2, y2 = rect_modes_map[output_format]["fromBounds"](x1, y1, x2, y2)

        return (x1, y1, x2, y2,)

```
