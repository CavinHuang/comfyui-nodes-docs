
# Documentation
- Class name: Frame Count Calculator [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Frame Count Calculator节点用于基于给定的时间duration和帧率计算总帧数。它考虑了小时、分钟、秒和毫秒，以提供精确的帧数计算，这对于时间和同步至关重要的动画和视频处理任务来说是必不可少的。

# Input types
## Required
- hours
    - 指定要包含在总时间duration中的小时数，用于计算帧数。它通过贡献整体时间直接影响总帧数。
    - Comfy dtype: INT
    - Python dtype: int
- minutes
    - 指定要包含在总时间duration中的分钟数。此参数与其他参数一起，通过贡献总时间来决定总帧数。
    - Comfy dtype: INT
    - Python dtype: int
- seconds
    - 定义要考虑在总时间duration中的秒数。这对于计算精确的帧数至关重要，特别是在短片或动画中。
    - Comfy dtype: INT
    - Python dtype: int
- milliseconds
    - 在总时间计算中包括毫秒，允许在需要高精度的场景中进行更精确的帧数计算。
    - Comfy dtype: INT
    - Python dtype: int
- frames_per_second
    - 设置每秒的帧率，用于根据提供的时间duration计算总帧数。这个参数对于确定动画或视频的流畅度和质量至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- TOTAL
    - 基于输入的时间duration和帧率计算出的总帧数。这个输出对于规划和同步动画或视频序列至关重要。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameCountCalculator:
    NODE_NAME = "Frame Count Calculator"
    ICON = "⌛"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "hours": ("INT", {"min": 0, "default": 0, "max": 23}),
                "minutes": ("INT", {"min": 0, "default": 0, "max": 59}),
                "seconds": ("INT", {"min": 0, "default": 10, "max": 59}),
                "milliseconds": ("INT", {"min": 0, "default": 0, "max": 59}),
                "frames_per_second": ("INT", {"min": 1, "default": 30})
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("TOTAL",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *v):
        return ALWAYS_CHANGED_FLAG

    def result(self, hours, minutes, seconds, milliseconds, frames_per_second):
        total_s = seconds + 0.001 * milliseconds + minutes * 60 + hours * 3600
        return (round(total_s * frames_per_second),)

```
