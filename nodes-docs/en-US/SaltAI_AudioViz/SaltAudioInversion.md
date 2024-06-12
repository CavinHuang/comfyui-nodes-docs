---
tags:
- Audio
---

# Audio Reverse
## Documentation
- Class name: `SaltAudioInversion`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioInversion node is designed to invert the waveform of an audio file, effectively flipping its phase. This process can be used to create unique sound effects or for audio testing purposes, where phase inversion might be necessary.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter takes an audio file as input, which is the target for phase inversion. This input is crucial as it directly influences the outcome of the inversion process, determining the characteristics of the resulting audio.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The output is the inverted audio file, where the phase of the original audio has been flipped. This can be used for further audio processing or as an effect in audio production.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioInversion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "invert_audio"
    CATEGORY = "SALT/Audio/Process"

    def invert_audio(cls, audio):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        inverted_samples = np.array(audio_segment.get_array_of_samples()) * -1
        inverted_audio_segment = audio_segment._spawn(inverted_samples.tobytes())
        return (get_buffer(inverted_audio_segment),)

```
