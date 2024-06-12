---
tags:
- Audio
---

# Audio Trim
## Documentation
- Class name: `SaltAudioTrim`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioTrim node is designed for trimming audio files to a specified start and end time, allowing for precise control over the segment of the audio that is of interest.
## Input types
### Required
- **`audio`**
    - The raw audio data to be trimmed. This is the primary input for the operation, determining the audio segment to be processed.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`start_time_seconds`**
    - The start time in seconds from which the audio should begin. This parameter sets the initial point of the audio segment to be retained.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_time_seconds`**
    - The end time in seconds at which the audio should stop. This parameter defines the final point of the audio segment to be retained, effectively trimming the audio.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The trimmed audio data, returned as a byte stream. This output represents the audio segment between the specified start and end times.
    - Python dtype: `bytes`
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
