
# Documentation
- Class name: SaltAudioPlaybackRate
- Category: SALT/Audio/Process
- Output node: False

SaltAudioPlaybackRate 节点旨在调整音频文件的播放速度，允许用户在不改变音频音调的情况下加快或减慢音频的播放速度。这种功能对于需要压缩或延长音频时长，同时保持原有音调特性的场景尤为有用。

# Input types
## Required
- audio
    - 这是将要进行速度调整的音频输入。该参数对于确定要处理的源音频文件至关重要。它是整个处理过程的基础，直接影响最终输出的质量和特性。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- speed_factor
    - 这是一个用于调整音频速度的因子。该参数直接影响音频的播放速率，使音频可以被加速或减速。例如，factor值为2.0时会使音频播放速度加倍，而0.5则会使音频播放速度减半。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 输出的是根据指定速度因子调整后的音频。这是经过处理的音频文件，可以按新的速度进行播放。输出的音频保持了原始音频的音调特性，只是播放速度发生了变化。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioPlaybackRate:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "speed_factor": ("FLOAT", {"min": 0.5, "max": 12.0, "default": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "adjust_speed"
    CATEGORY = "SALT/Audio/Process"

    def adjust_speed(cls, audio, speed_factor):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        playback_rate = int(audio_segment.frame_rate * speed_factor)
        adjusted_audio_segment = audio_segment.set_frame_rate(playback_rate)
        return (get_buffer(adjusted_audio_segment),)

```
