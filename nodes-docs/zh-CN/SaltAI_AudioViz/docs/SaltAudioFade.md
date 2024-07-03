
# Documentation
- Class name: SaltAudioFade
- Category: SALT/Audio/Process
- Output node: False

SaltAudioFade节点用于对音频片段应用淡入或淡出效果，从而增强其听觉过渡。这个过程涉及从音频片段的指定点开始，在特定的持续时间内逐渐增加或减少音量。

# Input types
## Required
- audio
    - 需要应用淡变效果的原始音频数据。这个参数对于定义将要进行淡变处理的音频片段至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- fade_type
    - 指定要应用的淡变效果类型：'in'表示淡入效果（音量逐渐增加），'out'表示淡出效果（音量逐渐减小）。这个选择直接影响音频片段的听觉过渡。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- fade_duration
    - 淡变效果发生的持续时间，以秒为单位。这决定了音量过渡完成所需的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- fade_start
    - 淡变效果在音频片段中的起始点，以秒为单位。这个可选参数允许精确控制淡变开始的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 应用了淡入或淡出效果的修改后的音频数据，增强了音频片段的听觉体验。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioFade:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "fade_type": (["in", "out"],),
                "fade_duration": ("FLOAT", {"min": 0.01}),
            },
            "optional": {
                "fade_start": ("FLOAT", {"default": 0, "min": 0}),
            },
        }

    RETURN_TYPES = ("AUDIO", )
    RETURN_NAMES = ("audio", )
    FUNCTION = "apply_fade"
    CATEGORY = "SALT/Audio/Process"

    def apply_fade(self, audio, fade_type, fade_duration, fade_start=0):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")

        start_ms = int(fade_start * 1000)
        duration_ms = int(fade_duration * 1000)

        before_fade = audio_segment[:start_ms]
        during_and_after_fade = audio_segment[start_ms:]

        if fade_type == "in":
            faded_part = during_and_after_fade.fade_in(duration_ms)
        else:
            faded_part = during_and_after_fade.fade_out(duration_ms)

        output = before_fade + faded_part

        return(get_buffer(output), )

```
