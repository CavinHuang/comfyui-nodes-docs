
# Documentation
- Class name: SaltAudioTrim
- Category: SALT/Audio/Process
- Output node: False

SaltAudioTrim节点旨在将音频文件修剪到指定的起始和结束时间，从而精确控制感兴趣的音频片段。

# Input types
## Required
- audio
    - 待修剪的原始音频数据。这是操作的主要输入，决定了要处理的音频片段。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- start_time_seconds
    - 音频应该开始的起始时间（以秒为单位）。此参数设置要保留的音频片段的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_time_seconds
    - 音频应该停止的结束时间（以秒为单位）。此参数定义要保留的音频片段的结束点，有效地修剪音频。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 修剪后的音频数据，以字节流的形式返回。这个输出代表了指定起始和结束时间之间的音频片段。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioTrim:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "start_time_seconds": ("FLOAT", {"min": 0.0, "default": 0.0, "step": 0.01}),
                "end_time_seconds": ("FLOAT", {"min": 0.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "trim_audio"
    CATEGORY = "SALT/Audio/Process"

    def trim_audio(cls, audio, start_time_seconds, end_time_seconds):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        trimmed_audio_segment = audio_segment[start_time_seconds * 1000:end_time_seconds * 1000]
        return (get_buffer(trimmed_audio_segment),)

```
