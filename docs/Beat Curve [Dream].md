
# Documentation
- Class name: Beat Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

Beat Curve节点根据音乐节拍生成动画曲线，实现视觉动画与音轨节奏元素的同步。它利用BPM（每分钟节拍数）、小节长度和可选的重音来创建动态的、与节拍对齐的动画。

# Input types
## Required
- frame_counter
    - 提供当前帧和时间信息，用于计算与音乐节拍相关的动画曲线。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- bpm
    - 指定音乐轨道的每分钟节拍数，影响动画曲线的时间以匹配节奏。
    - Comfy dtype: FLOAT
    - Python dtype: float
- time_offset
    - 调整动画曲线的起始时间，允许与音乐轨道精确同步。
    - Comfy dtype: FLOAT
    - Python dtype: float
- measure_length
    - 定义音乐小节的节拍长度，用于计算动画曲线中重音的时间。
    - Comfy dtype: INT
    - Python dtype: int
- low_value
    - 设置动画曲线的最小值，定义生成值的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_value
    - 设置动画曲线的最大值，定义生成值的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- invert
    - 反转动画曲线，在指定的低值和高值之间翻转生成的值。该参数接受'yes'或'no'来指示是否反转。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- power
    - 对动画曲线应用幂函数，调整曲线进程的强度和动态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- accent_i
    - 指定小节内的重音节拍，增强动画曲线对音乐节奏的响应。重音范围从1到小节长度，允许自定义动态节奏。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- FLOAT
    - 当前帧动画曲线的浮点值，反映节奏模式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 当前帧动画曲线的整数四舍五入值，适用于离散动画。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBeatCurve:
    NODE_NAME = "Beat Curve"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "bpm": ("FLOAT", {"default": 100.0, "multiline": False}),
                "time_offset": ("FLOAT", {"default": 0.0, "multiline": False}),
                "measure_length": ("INT", {"default": 4, "min": 1}),
                "low_value": ("FLOAT", {"default": 0.0}),
                "high_value": ("FLOAT", {"default": 1.0}),
                "invert": (["no", "yes"],),
                "power": ("FLOAT", {"default": 2.0, "min": 0.25, "max": 4}),
                "accent_1": ("INT", {"default": 1, "min": 1, "max": 24}),
            },
            "optional": {
                "accent_2": ("INT", {"default": 3, "min": 1, "max": 24}),
                "accent_3": ("INT", {"default": 0}),
                "accent_4": ("INT", {"default": 0}),
            }
        }

    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _get_value_for_accent(self, accent, measure_length, bpm, frame_counter: FrameCounter, frame_offset):
        current_frame = frame_counter.current_frame + frame_offset
        frames_per_minute = frame_counter.frames_per_second * 60.0
        frames_per_beat = frames_per_minute / bpm
        frames_per_measure = frames_per_beat * measure_length
        frame = (current_frame % frames_per_measure)
        accent_start = (accent - 1) * frames_per_beat
        accent_end = accent * frames_per_beat
        if frame >= accent_start and frame < accent_end:
            return 1.0 - ((frame - accent_start) / frames_per_beat)
        return 0

    def result(self, bpm, frame_counter: FrameCounter, measure_length, low_value, high_value, power, invert,
               time_offset, **accents):
        frame_offset = int(round(time_offset * frame_counter.frames_per_second))
        accents_set = set(filter(lambda v: v >= 1 and v <= measure_length,
                                 map(lambda i: accents.get("accent_" + str(i), -1), range(30))))
        v = 0.0
        for a in accents_set:
            v += math.pow(self._get_value_for_accent(a, measure_length, bpm, frame_counter, frame_offset), power)
        if invert == "yes":
            v = 1.0 - v

        r = low_value + v * (high_value - low_value)
        return _curve_result(r)

```
