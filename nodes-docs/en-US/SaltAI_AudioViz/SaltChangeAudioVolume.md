---
tags:
- Audio
---

# Audio Volume
## Documentation
- Class name: `SaltChangeAudioVolume`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltChangeAudioVolume node is designed to adjust the volume of an audio file. It modifies the volume level by a specified number of decibels, allowing for both amplification and attenuation of the audio signal.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter represents the audio file to be processed. It is the primary input for volume adjustment.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`volume_decibals`**
    - The 'volume_decibals' parameter specifies the amount by which to increase or decrease the volume of the audio. Positive values amplify the sound, while negative values attenuate it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The modified audio file with the adjusted volume level.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltChangeAudioVolume:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "volume_decibals": ("FLOAT", {"min": -60, "max": 60, "default": 0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "change_volume"
    CATEGORY = "SALT/Audio/Process"

    def change_volume(self, audio_data, volume_decibals):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_data), format="wav")
        modified_audio_segment = audio_segment + volume_decibals
        return (get_buffer(modified_audio_segment), )

```
