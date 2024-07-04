
# Documentation
- Class name: WAV Curve [Dream]
- Category: ✨ Dream/🎥 animation/📈 curves
- Output node: False

WAV Curve节点基于WAV文件的音频数据动态生成动画曲线，使动画能够与音频同步。它会对给定帧的振幅值进行缩放，同时提供浮点数和整数输出，以便在动画脚本中灵活使用。

# Input types
## Required
- frame_counter
    - 帧计数器对于确定动画时间线上的当前位置至关重要，它影响使用WAV文件振幅的哪一部分来生成曲线。
    - Comfy dtype: FRAME_COUNTER
    - Python dtype: FrameCounter
- wav_path
    - 指定用于生成动画曲线的WAV文件路径。提供了一个默认路径，但可以自定义。
    - Comfy dtype: STRING
    - Python dtype: str
- scale
    - 用于调整从WAV文件提取的振幅值的乘数，允许调整动画曲线的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 以浮点数形式输出WAV文件中经过缩放的振幅值，适用于精确的动画调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- INT
    - 将WAV文件中经过缩放的振幅值四舍五入为最接近的整数，适用于离散的动画步骤。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamWavCurve:
    NODE_NAME = "WAV Curve"
    CATEGORY = NodeCategories.ANIMATION_CURVES
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"
    ICON = "∿"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "wav_path": ("STRING", {"default": "audio.wav"}),
                "scale": ("FLOAT", {"default": 1.0, "multiline": False})
            },
        }

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, frame_counter: FrameCounter, wav_path, scale):
        if not os.path.isfile(wav_path):
            return (0.0, 0)
        data = _wav_loader(wav_path, frame_counter.frames_per_second)
        frame_counter.current_time_in_seconds
        v = data.value_at_time(frame_counter.current_time_in_seconds)
        return (v * scale, round(v * scale))

```
