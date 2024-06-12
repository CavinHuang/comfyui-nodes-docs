---
tags:
- Audio
---

# Audio Treble Boost
## Documentation
- Class name: `SaltAudioTrebleBoost`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioTrebleBoost node enhances the treble frequencies of an audio input, allowing for a customizable increase in the higher frequency ranges. This node is designed to modify audio content by applying a high-pass filter and gain adjustment, tailored to the user's specifications for cutoff frequency and boost level.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter is the raw audio data to be processed. It serves as the primary input for treble enhancement, determining the audio content that will undergo frequency-specific amplification.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`cutoff_freq`**
    - The 'cutoff_freq' parameter specifies the frequency threshold above which treble frequencies will be boosted. It plays a critical role in defining the range of frequencies affected by the treble boost, impacting the overall sound character.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`boost_dB`**
    - The 'boost_dB' parameter controls the level of gain applied to the treble frequencies above the cutoff point. It directly influences the intensity of the treble enhancement, allowing for a range of subtle to significant audio modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The modified audio with enhanced treble frequencies, reflecting the applied high-pass filter and gain adjustments.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioTrebleBoost:
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
    FUNCTION = "treble_bass"
    CATEGORY = "SALT/Audio/Effect"

    def treble_bass(self, audio, cutoff_freq, boost_dB):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        
        high_pass_gain = original.high_pass_filter(cutoff_freq).apply_gain(boost_dB)
        if len(high_pass_gain) > len(original):
            high_pass_gain = high_pass_gain[:len(original)]

        boosted = original.overlay(high_pass_gain, position=0)
        
        return (get_buffer(boosted), )

```
