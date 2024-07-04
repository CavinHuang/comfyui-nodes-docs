
# Documentation
- Class name: SaltAudioInversion
- Category: SALT/Audio/Process
- Output node: False

SaltAudioInversion节点旨在对音频文件的波形进行反转，实现相位翻转的效果。这一过程可用于创造独特的声音效果或进行音频测试，在某些情况下相位反转可能是必要的。

# Input types
## Required
- audio
    - audio参数接收一个音频文件作为输入，这是进行相位反转的目标。该输入至关重要，因为它直接影响反转过程的结果，决定了最终音频的特性。
    - Comfy dtype: AUDIO
    - Python dtype: bytes

# Output types
- audio
    - 输出是经过相位反转的音频文件，原始音频的相位已被翻转。这可以用于进一步的音频处理或作为音频制作中的一种效果。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
