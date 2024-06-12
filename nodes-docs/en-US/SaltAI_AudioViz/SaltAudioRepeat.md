---
tags:
- Audio
---

# Audio Repeat
## Documentation
- Class name: `SaltAudioRepeat`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioRepeat node is designed to repeat an audio clip a specified number of times. This functionality is useful for extending the duration of an audio segment without altering its original content.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter is the raw audio data to be processed. It serves as the base audio clip that will be repeated according to the 'repeat_times' parameter.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`repeat_times`**
    - The 'repeat_times' parameter specifies how many times the audio clip should be repeated. This directly influences the length of the resulting audio output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The output is the audio data after being repeated the specified number of times, effectively extending its duration.
    - Python dtype: `bytes`
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
