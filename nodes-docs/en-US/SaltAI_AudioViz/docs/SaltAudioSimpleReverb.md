---
tags:
- Audio
---

# Audio Simple Reverb
## Documentation
- Class name: `SaltAudioSimpleReverb`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioSimpleReverb node applies a reverb effect to an audio input, simulating the sound reflection characteristics of a physical space. It allows for the adjustment of reverb level and decay to tailor the effect.
## Input types
### Required
- **`audio`**
    - The audio input to which the reverb effect will be applied. It serves as the raw material for the reverb simulation.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`reverb_level`**
    - Determines the intensity of the reverb effect applied to the audio, influencing the perceived size and reflectiveness of the virtual space.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`decay`**
    - Controls the rate at which the reverb effect fades away, simulating the absorption characteristics of the simulated space.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The audio output with the reverb effect applied, simulating the acoustic characteristics of a reverberant space.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioSimpleReverb:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "reverb_level": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.01}),
                "decay": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_reverb"
    CATEGORY = "SALT/Audio/Effect"

    def apply_reverb(self, audio, reverb_level, decay):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        reverb_duration = int(len(original) * reverb_level)
        output = original

        for overlay_delay in range(50, reverb_duration, 50):
            decayed_overlay = original - (decay * overlay_delay)
            output = output.overlay(decayed_overlay, position=overlay_delay)

        return (get_buffer(output),)

```
