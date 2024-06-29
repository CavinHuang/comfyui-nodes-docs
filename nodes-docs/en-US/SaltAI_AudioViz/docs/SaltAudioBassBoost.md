---
tags:
- Audio
---

# Audio Bass Boost
## Documentation
- Class name: `SaltAudioBassBoost`
- Category: `SALT/Audio/Effect`
- Output node: `False`

This node enhances the bass frequencies of an audio input, applying a low-pass filter and gain increase to boost the lower end of the audio spectrum.
## Input types
### Required
- **`audio`**
    - The raw audio data to be processed for bass enhancement.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`cutoff_freq`**
    - The frequency below which the audio will be boosted, serving as the threshold for the low-pass filter.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`boost_dB`**
    - The amount of gain to apply to the frequencies below the cutoff, measured in decibels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The modified audio data with enhanced bass frequencies.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioBassBoost:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "cutoff_freq": ("INT", {"default": 150, "min": 20, "max": 300, "step": 1}),
                "boost_dB": ("FLOAT", {"default": 5.0, "min": 0.0, "max": 24.0, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "boost_bass"
    CATEGORY = "SALT/Audio/Effect"

    def boost_bass(self, audio, cutoff_freq, boost_dB):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        
        low_pass_gain = original.low_pass_filter(cutoff_freq).apply_gain(boost_dB)
        if len(low_pass_gain) > len(original):
            low_pass_gain = low_pass_gain[:len(original)]

        boosted = original.overlay(low_pass_gain, position=0)
        
        return (get_buffer(boosted), )

```
