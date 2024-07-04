
# Documentation
- Class name: Common Frame Dimensions [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Common Frame Dimensions节点提供了一个实用工具，用于根据一系列输入参数（包括尺寸、宽高比、方向、除数和对齐方式）计算帧尺寸。它抽象了维度计算和对齐调整的复杂性，为各种显示需求提供了一种简化的方法来确定最佳帧尺寸。

# Input types
## Required
- size
    - 从预定义的分辨率列表中指定所需的帧尺寸。这个选择影响帧的整体尺寸，作为进一步计算的基础。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- aspect_ratio
    - 决定帧的宽高比，按比例影响其宽度和高度，以确保保持指定的比例。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- orientation
    - 指示帧的方向（宽或高），这影响基于宽高比的宽度和高度的计算。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- divisor
    - 用于除以帧尺寸的因子，以更精细地控制尺寸粒度，影响最终尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- alignment
    - 指定尺寸计算的对齐值，确保最终尺寸对齐到某个边界。
    - Comfy dtype: INT
    - Python dtype: int
- alignment_type
    - 根据对齐值确定最终尺寸的舍入方式（向上、向下或最接近）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- width
    - 考虑所有输入参数后计算得出的帧宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 考虑所有输入参数后计算得出的帧高度。
    - Comfy dtype: INT
    - Python dtype: int
- final_width
    - 根据对齐和对齐类型调整后的帧最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- final_height
    - 根据对齐和对齐类型调整后的帧最终高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameDimensions:
    NODE_NAME = "Common Frame Dimensions"
    ICON = "⌗"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "size": (["3840", "1920", "1440", "1280", "768", "720", "640", "512"],),
                "aspect_ratio": (["16:9", "16:10", "4:3", "1:1", "5:4", "3:2", "21:9", "14:9"],),
                "orientation": (["wide", "tall"],),
                "divisor": (["8", "4", "2", "1"],),
                "alignment": ("INT", {"default": 64, "min": 1, "max": 512}),
                "alignment_type": (["ceil", "floor", "nearest"],),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("width", "height", "final_width", "final_height")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, size, aspect_ratio, orientation, divisor, alignment, alignment_type):
        ratio = tuple(map(int, aspect_ratio.split(":")))
        final_width = int(size)
        final_height = int(round((float(final_width) * ratio[1]) / ratio[0]))
        width = _align_num(int(round(final_width / float(divisor))), alignment, alignment_type)
        height = _align_num(int(round((float(width) * ratio[1]) / ratio[0])), alignment, alignment_type)
        if orientation == "wide":
            return (width, height, final_width, final_height)
        else:
            return (height, width, final_height, final_width)

```
