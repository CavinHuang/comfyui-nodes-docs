
# Documentation
- Class name: SaltAudioStereoMerge
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioStereoMerge节点旨在将两个单声道音频输入合并为一个立体声音频输出。它确保两个音频输入的长度相同，并在合并为立体声轨道之前将它们转换为单声道（如果它们尚未转换）。

# Input types
## Required
- audio_a
    - 要合并的第一个音频输入。它被视为结果立体声音频中的一个声道。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- audio_b
    - 要与第一个输入一起合并的第二个音频输入。它与第一个输入相辅相成，形成立体声音频输出。
    - Comfy dtype: AUDIO
    - Python dtype: bytes

# Output types
- audio
    - 通过合并两个输入音轨而产生的立体声音频输出。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioStereoMerge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_a": ("AUDIO", {}),
                "audio_b": ("AUDIO", {}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "merge_stereo"
    CATEGORY = "SALT/Audio/Effect"

    def merge_stereo(self, audio_a, audio_b):
        segment_a = AudioSegment.from_file(io.BytesIO(audio_a), format="wav")
        segment_b = AudioSegment.from_file(io.BytesIO(audio_b), format="wav")
        
        if segment_a.channels > 1:
            segment_a = segment_a.set_channels(1)
        if segment_b.channels > 1:
            segment_b = segment_b.set_channels(1)
        
        min_length = min(len(segment_a), len(segment_b))
        segment_a = segment_a[:min_length]
        segment_b = segment_b[:min_length]
        stereo_audio = AudioSegment.from_mono_audiosegments(segment_a, segment_b)
        
        stereo_audio_bytes = io.BytesIO()
        stereo_audio.export(stereo_audio_bytes, format="wav")
        stereo_audio_bytes.seek(0)
        
        return stereo_audio_bytes.read(),

```
