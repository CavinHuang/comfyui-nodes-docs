---
tags:
- Audio
---

# Audio Bandpass Filter
## Documentation
- Class name: `SaltAudioBandpassFilter`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioBandpassFilter node applies a bandpass filter to an audio input, allowing frequencies within a specified range to pass through while attenuating frequencies outside this range. This process is useful for isolating specific frequency bands or reducing noise.
## Input types
### Required
- **`audio`**
    - The raw audio data to be processed. This input is crucial for defining the audio content that will undergo bandpass filtering.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`low_cutoff_frequency`**
    - The lower frequency threshold of the bandpass filter. Frequencies below this value will be attenuated, helping to isolate the desired frequency band.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`high_cutoff_frequency`**
    - The upper frequency threshold of the bandpass filter. Frequencies above this value will be attenuated, further refining the isolation of the desired frequency band.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The processed audio data after the bandpass filter has been applied, with specified frequencies allowed to pass and others attenuated.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioBandpassFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "low_cutoff_frequency": ("INT", {"min": 20, "max": 20000, "default": 300}),
                "high_cutoff_frequency": ("INT", {"min": 20, "max": 20000, "default": 3000}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_bandpass_filter"
    CATEGORY = "SALT/Audio/Effect"

    def apply_bandpass_filter(self, audio, low_cutoff_frequency, high_cutoff_frequency):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        filtered_audio = audio_segment.low_pass_filter(high_cutoff_frequency).high_pass_filter(low_cutoff_frequency)
        return (get_buffer(filtered_audio), )

```
