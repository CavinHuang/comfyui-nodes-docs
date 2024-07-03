
# Documentation
- Class name: SaltChangeAudioVolume
- Category: SALT/Audio/Process
- Output node: False

SaltChangeAudioVolume节点用于调整音频文件的音量。它通过指定的分贝数来修改音量级别，可以实现音频信号的放大和衰减。

# Input types
## Required
- audio
    - audio参数代表要处理的音频文件。它是音量调整的主要输入。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- volume_decibals
    - volume_decibals参数指定增加或减少音频音量的幅度。正值表示放大声音，负值表示衰减声音。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过音量调整的音频文件。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltChangeAudioVolume:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ),
                "volume_decibals": ("FLOAT", {"min": -60, "max": 60, "default": 0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "change_volume"
    CATEGORY = "SALT/Audio/Process"

    def change_volume(self, audio_data, volume_decibals):
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_data), format="wav")
        modified_audio_segment = audio_segment + volume_decibals
        return (get_buffer(modified_audio_segment), )

```
