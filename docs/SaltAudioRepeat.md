
# Documentation
- Class name: SaltAudioRepeat
- Category: SALT/Audio/Process
- Output node: False

SaltAudioRepeat节点的设计目的是将一个音频片段重复指定的次数。这个功能对于在不改变原始内容的情况下延长音频片段的时长非常有用。

# Input types
## Required
- audio
    - audio参数是待处理的原始音频数据。它作为基础音频片段，将根据repeat_times参数进行重复。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- repeat_times
    - repeat_times参数指定音频片段应重复的次数。这直接影响最终音频输出的长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- audio
    - 输出是经过指定次数重复后的音频数据，有效地延长了其持续时间。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioRepeat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "repeat_times": ("INT", {"min": 1, "default": 2}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "loop_audio"
    CATEGORY = "SALT/Audio/Process"

    def loop_audio(cls, audio, repeat_times):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        looped_audio_segment = audio_segment * repeat_times
        return (get_buffer(looped_audio_segment),)

```
