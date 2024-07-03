
# Documentation
- Class name: SaltAudioMixer
- Category: SALT/Audio/Process
- Output node: False

SaltAudioMixer节点旨在将两个音频输入混合成单一输出，通过在指定的混音时间将一个音频片段叠加到另一个上。这一功能对于在多媒体项目中从多个音源创建合成音轨至关重要，允许进行动态音频混合。

# Input types
## Required
- audio_a
    - 第一个要混合的音频输入。它作为基础层，第二个音频输入将叠加其上。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- audio_b
    - 第二个要混合的音频输入。这段音频将在指定的混音时间叠加到第一个输入上，共同构成合成输出。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- mix_time_seconds
    - 指定第二个音频输入(audio_b)将叠加到第一个(audio_a)上的时间偏移量，以秒为单位。这个参数允许精确控制音频混合的时机。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mixed_audio
    - 混合两个输入后得到的音频结果。这个输出是一个单一的音轨，结合了两个输入轨道的元素。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioMixer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_a": ("AUDIO", {}),
                "audio_b": ("AUDIO", {}),
                "mix_time_seconds": ("FLOAT", {"min": 0.0, "default": 0.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("mixed_audio",)
    FUNCTION = "mix_audios"
    CATEGORY = "SALT/Audio/Process"

    def mix_audios(self, audio_a, audio_b, mix_time_seconds):
        audio_segment_1 = AudioSegment.from_file(io.BytesIO(audio_a), format="wav")
        audio_segment_2 = AudioSegment.from_file(io.BytesIO(audio_b), format="wav")

        position_ms = int(mix_time_seconds * 1000)
        audio_segment = audio_segment_1.overlay(audio_segment_2, position=position_ms)

        return (get_buffer(audio_segment), )

```
