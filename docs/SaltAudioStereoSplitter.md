
# Documentation
- Class name: SaltAudioStereoSplitter
- Category: SALT/Audio/Process
- Output node: False

SaltAudioStereoSplitter节点的主要功能是将立体声音频文件拆分为独立的左声道和右声道单声道音频文件。这一功能对于需要单独处理每个立体声道的音频编辑和处理任务至关重要。

# Input types
## Required
- audio
    - audio参数接收一个立体声音频文件作为输入，这是拆分过程的核心。该节点期望输入的音频为双声道立体声格式，以便成功将其分离为单声道。
    - Comfy dtype: AUDIO
    - Python dtype: bytes

# Output types
- left_channel_mono
    - 输出代表原始立体声音频文件的左声道，经过处理后以单声道音频文件的形式返回。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- right_channel_mono
    - 输出代表原始立体声音频文件的右声道，经过处理后以单声道音频文件的形式返回。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
