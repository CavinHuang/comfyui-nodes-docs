
# Documentation
- Class name: SaltAudioNormalize
- Category: SALT/Audio/Process
- Output node: False

SaltAudioNormalize 节点用于调整给定音频文件的音量至标准水平，以确保不同音轨之间的音量一致性。

# Input types
## Required
- audio
    - 'audio' 参数是需要进行音量标准化的原始音频数据。它对于确定音频当前音量水平并将其调整到目标标准化水平至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: bytes

# Output types
- audio
    - 经过音量标准化处理的音频数据，其音量水平已被调整以确保不同音轨之间的一致性。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioNormalize:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "normalize_audio"
    CATEGORY = "SALT/Audio/Process"

    def normalize_audio(self, audio):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        normalized_segment = AudioEffects.normalize(audio_segment)
        return (get_buffer(normalized_segment), )

```
