---
tags:
- Audio
---

# Audio Stereo Merge
## Documentation
- Class name: `SaltAudioStereoMerge`
- Category: `SALT/Audio/Effect`
- Output node: `False`

The SaltAudioStereoMerge node is designed to merge two mono audio inputs into a single stereo audio output. It ensures that both audio inputs are of the same length and converts them to mono if they are not already, before merging them into a stereo track.
## Input types
### Required
- **`audio_a`**
    - The first audio input to be merged. It is treated as one of the channels in the resulting stereo audio.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`audio_b`**
    - The second audio input to be merged alongside the first input. It complements the first input to form the stereo audio output.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
## Output types
- **`audio`**
    - Comfy dtype: `AUDIO`
    - The resulting stereo audio output from merging the two input audio tracks.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioStereoMerge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_a": ("AUDIO", {}),
                "audio_b": ("AUDIO", {}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "merge_stereo"
    CATEGORY = "SALT/Audio/Effect"

    def merge_stereo(self, audio_a, audio_b):
        segment_a = AudioSegment.from_file(io.BytesIO(audio_a), format="wav")
        segment_b = AudioSegment.from_file(io.BytesIO(audio_b), format="wav")
        
        if segment_a.channels > 1:
            segment_a = segment_a.set_channels(1)
        if segment_b.channels > 1:
            segment_b = segment_b.set_channels(1)
        
        min_length = min(len(segment_a), len(segment_b))
        segment_a = segment_a[:min_length]
        segment_b = segment_b[:min_length]
        stereo_audio = AudioSegment.from_mono_audiosegments(segment_a, segment_b)
        
        stereo_audio_bytes = io.BytesIO()
        stereo_audio.export(stereo_audio_bytes, format="wav")
        stereo_audio_bytes.seek(0)
        
        return stereo_audio_bytes.read(),

```
