
# Documentation
- Class name: AdjustRect
- Category: Bmad
- Output node: False

AdjustRect节点旨在根据指定的修改参数和舍入模式调整矩形的尺寸和位置。它抽象了几何变换的复杂性，为各种应用场景提供了一种简化的方式来重新校准矩形坐标。

# Input types
## Required
- a
    - 表示原始矩形的一个坐标(x1或y1)，在确定新调整后矩形位置时起关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 表示原始矩形的另一个坐标(x2或y2)，有助于计算新矩形的尺寸和位置。
    - Comfy dtype: INT
    - Python dtype: int
- c
    - 作为调整矩形宽度的修改参数，直接影响调整后矩形的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- d
    - 作为调整矩形高度的修改参数，直接影响调整后矩形的最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- xm
    - 指定矩形宽度调整的修改参数，影响新宽度的计算。
    - Comfy dtype: INT
    - Python dtype: int
- ym
    - 指定矩形高度调整的修改参数，影响新高度的计算。
    - Comfy dtype: INT
    - Python dtype: int
- round_mode
    - 决定在调整过程中应用的舍入模式，影响最终尺寸的计算方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- input_format
    - 定义输入坐标的格式，影响调整过程中坐标的解释和转换方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_format
    - 指定输出坐标的格式，决定调整后矩形的尺寸和位置如何表示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- int
    - 调整后矩形的坐标，反映了根据输入参数应用的修改。它表示为四个整数的元组。
    - Comfy dtype: INT
    - Python dtype: Tuple[int, int, int, int]


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
