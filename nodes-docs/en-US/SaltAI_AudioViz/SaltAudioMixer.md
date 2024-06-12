---
tags:
- Audio
---

# Audio Mixer
## Documentation
- Class name: `SaltAudioMixer`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioMixer node is designed to blend two audio inputs into a single output by overlaying one audio segment onto another at a specified mix time. This functionality is essential for creating composite audio tracks from multiple sources, allowing for dynamic audio mixing in multimedia projects.
## Input types
### Required
- **`audio_a`**
    - The first audio input to be mixed. It serves as the base layer onto which the second audio input will be overlaid.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`audio_b`**
    - The second audio input to be mixed. This audio is overlaid onto the first input at the specified mix time, contributing to the composite output.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`mix_time_seconds`**
    - Specifies the time offset in seconds at which the second audio input (audio_b) will be overlaid onto the first (audio_a). This parameter allows for precise control over the timing of the audio mix.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mixed_audio`**
    - Comfy dtype: `AUDIO`
    - The resulting audio after mixing the two inputs. This output is a single audio track that combines elements of both input tracks.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioMixer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_a": ("AUDIO", {}),
                "audio_b": ("AUDIO", {}),
                "mix_time_seconds": ("FLOAT", {"min": 0.0, "default": 0.0}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("mixed_audio",)
    FUNCTION = "mix_audios"
    CATEGORY = "SALT/Audio/Process"

    def mix_audios(self, audio_a, audio_b, mix_time_seconds):
        audio_segment_1 = AudioSegment.from_file(io.BytesIO(audio_a), format="wav")
        audio_segment_2 = AudioSegment.from_file(io.BytesIO(audio_b), format="wav")

        position_ms = int(mix_time_seconds * 1000)
        audio_segment = audio_segment_1.overlay(audio_segment_2, position=position_ms)

        return (get_buffer(audio_segment), )

```
