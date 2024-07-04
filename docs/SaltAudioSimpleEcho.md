
# Documentation
- Class name: SaltAudioSimpleEcho
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioSimpleEcho节点用于为音频输入添加回声效果。它允许用户自定义回声的次数、每次回声之间的延迟时间以及每次回声的衰减系数。通过控制重复效果，该节点能够增强音轨的深度感和空间感。

# Input types
## Required
- audio
    - 这是将要添加回声效果的主要音频输入。它作为生成回声的基础。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- times
    - 指定应用回声效果的次数，影响最终音频的丰富度和复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- delay_ms
    - 每次回声之间的延迟时间，以毫秒为单位。这决定了回声的时间间隔。
    - Comfy dtype: INT
    - Python dtype: int
- decay_factor
    - 控制每次后续回声的音量衰减，影响随时间推移的淡出效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 应用了回声效果的修改后的音频输出，展现了深度和空间感的增强效果。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioSimpleEcho:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "times": ("INT", {"default": 3, "min": 1, "max": 10}),
                "delay_ms": ("INT", {"default": 100, "min": 100, "max": 2000}),
                "decay_factor": ("FLOAT", {"default": 0.4, "min": 0.1, "max": 0.9, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_echo"
    CATEGORY = "SALT/Audio/Effect"

    def apply_echo(self, audio, times, delay_ms, decay_factor):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        silence = AudioSegment.silent(duration=delay_ms)
        echo = original
        fade_duration = int(delay_ms * 0.1)
        speed_increase_factor = 1.01
        speed_increase_step = 0.01

        for i in range(1, times):
            decayed = original - (decay_factor * 10 * i)
            playback_speed = speed_increase_factor + (speed_increase_step * i)
            decayed = decayed.speedup(playback_speed=playback_speed)
            for j in range(1, 5):
                decayed = decayed.overlay(silence + decayed - (5 * j), position=50 * j)
            decayed_with_fades = decayed.fade_in(fade_duration).fade_out(fade_duration)
            echo = echo.overlay(silence + decayed_with_fades, position=delay_ms * i)

        return (get_buffer(echo),)

```
