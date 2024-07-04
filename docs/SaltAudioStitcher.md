
# Documentation
- Class name: SaltAudioStitcher
- Category: SALT/Audio/Process
- Output node: False

SaltAudioStitcher节点旨在将两个音频文件拼接在一起，并可选择在它们之间添加静音过渡。它能够通过组合多个音频片段来创造无缝的音频体验。

# Input types
## Required
- audio_a
    - 要拼接的第一个音频文件。它作为拼接音频输出的起点。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- audio_b
    - 要拼接的第二个音频文件。它在拼接音频输出中紧随第一个音频文件之后。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
## Optional
- silent_transition_seconds
    - 在两个音频文件之间插入的静音持续时间（以秒为单位）。这允许在音频片段之间实现平滑过渡或暂停。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- stitched_audio
    - 将输入音频文件拼接在一起后得到的结果音频文件，可能在音频之间包含静音过渡。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioStitcher:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_a": ("AUDIO", {}),
                "audio_b": ("AUDIO", {}),
            },
            "optional": {
                "silent_transition_seconds": ("FLOAT", {"min": 0.0, "default": 0.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("stitched_audio",)
    FUNCTION = "stitch_audios"
    CATEGORY = "SALT/Audio/Process"

    def stitch_audios(self, audio_a, audio_b, silent_transition_seconds=0.0):
        audio_segment_1 = AudioSegment.from_file(io.BytesIO(audio_a), format="wav")
        audio_segment_2 = AudioSegment.from_file(io.BytesIO(audio_b), format="wav")

        if silent_transition_seconds > 0:
            silence_segment = AudioSegment.silent(duration=int(silent_transition_seconds * 1000))
            stitched = audio_segment_1 + silence_segment + audio_segment_2
        else:
            stitched = audio_segment_1 + audio_segment_2

        return (get_buffer(stitched), )

```
