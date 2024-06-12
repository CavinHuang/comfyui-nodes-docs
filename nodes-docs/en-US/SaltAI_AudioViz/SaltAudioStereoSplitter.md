---
tags:
- Audio
---

# Audio Stereo Splitter
## Documentation
- Class name: `SaltAudioStereoSplitter`
- Category: `SALT/Audio/Process`
- Output node: `False`

The SaltAudioStereoSplitter node is designed to process stereo audio files by splitting them into their left and right channels as separate mono audio files. This functionality is essential for audio editing and processing tasks that require individual manipulation of each stereo channel.
## Input types
### Required
- **`audio`**
    - The 'audio' parameter takes a stereo audio file as input, which is essential for the splitting process. The node expects this audio to be in a two-channel stereo format to successfully separate it into mono channels.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
## Output types
- **`left_channel_mono`**
    - Comfy dtype: `AUDIO`
    - The output representing the left channel of the original stereo audio file, processed and returned as a mono audio file.
    - Python dtype: `bytes`
- **`right_channel_mono`**
    - Comfy dtype: `AUDIO`
    - The output representing the right channel of the original stereo audio file, processed and returned as a mono audio file.
    - Python dtype: `bytes`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioStereoSplitter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
            },
        }

    RETURN_TYPES = ("AUDIO", "AUDIO")
    RETURN_NAMES = ("left_channel_mono", "right_channel_mono")
    FUNCTION = "split_stereo_to_mono"
    CATEGORY = "SALT/Audio/Process"

    def split_stereo_to_mono(self, audio):
        stereo_audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")

        if stereo_audio_segment.channels != 2:
            raise ValueError("Input audio must be two channel stereo.")

        left_channel_mono = stereo_audio_segment.split_to_mono()[0]
        right_channel_mono = stereo_audio_segment.split_to_mono()[1]

        left_audio = get_buffer(left_channel_mono)
        right_audio = get_buffer(right_channel_mono)

        return (left_audio, right_audio)

```
