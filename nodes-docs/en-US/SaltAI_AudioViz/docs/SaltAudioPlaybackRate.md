---
tags:
- Audio
---

# Audio Playback Rate
## Documentation
- Class name: `SaltAudioPlaybackRate`
- Category: `SALT/Audio/Process`
- Output node: `False`

This node is designed to adjust the playback speed of an audio file, allowing users to speed up or slow down the audio without altering its pitch.
## Input types
### Required
- **`audio`**
    - The audio input that will be adjusted in terms of speed. This parameter is crucial for determining the source audio file to be processed.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`speed_factor`**
    - A factor by which the audio's speed is adjusted. This parameter directly influences the rate at which the audio is played back, enabling the audio to be sped up or slowed down.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The output audio with its speed adjusted according to the specified speed factor. This is the processed audio file ready for playback at the new speed.
    - Python dtype: `bytes`
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
