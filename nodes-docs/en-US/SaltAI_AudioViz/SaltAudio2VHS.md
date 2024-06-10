---
tags:
- Audio
---

# Audio to VHS Audio
## Documentation
- Class name: `SaltAudio2VHS`
- Category: `SALT/Audio/Util`
- Output node: `False`

The SaltAudio2VHS node is designed to convert audio inputs into a format that emulates the audio characteristics of VHS tapes, providing a nostalgic or vintage audio effect.
## Input types
### Required
- **`audio`**
    - The 'audio' input is the raw audio data that will be processed to simulate the sound quality of VHS tapes. It is crucial for defining the base audio content before applying the VHS effect.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
## Output types
- **`vhs_audio`**
    - Comfy dtype: `VHS_AUDIO`
    - The 'vhs_audio' output is the transformed audio data that has been processed to mimic the audio characteristics of a VHS tape, offering a unique, retro audio experience.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudio2VHS:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ), 
            },
        }

    RETURN_TYPES = ("VHS_AUDIO",)
    RETURN_NAMES = ("vhs_audio",)

    FUNCTION = "convert"
    CATEGORY = "SALT/Audio/Util"

    def convert(self, audio):
        return (lambda : audio,)

```
