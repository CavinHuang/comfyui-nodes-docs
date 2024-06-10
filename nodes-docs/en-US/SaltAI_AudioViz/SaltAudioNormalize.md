---
tags:
- Audio
---

# Audio Normalize
## Documentation
- Class name: `SaltAudioNormalize`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioNormalize node is designed to adjust the audio level of a given audio file to a standard level, ensuring consistent volume across different audio tracks.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter is the raw audio data that needs normalization. It is crucial for determining the audio's current volume level and adjusting it to the target normalization level.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The normalized audio data, with adjusted volume levels for consistency across different tracks.
    - Python dtype: `bytes`
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
