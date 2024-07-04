
# Documentation
- Class name: SaltAudioBassBoost
- Category: SALT/Audio/Effect
- Output node: False

本节点对音频输入的低频部分进行增强，通过应用低通滤波器和增加增益来提升音频频谱的低端部分。

# Input types
## Required
- audio
    - 待处理的原始音频数据，用于进行低音增强。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- cutoff_freq
    - 低通滤波器的截止频率，低于此频率的音频将被增强。
    - Comfy dtype: INT
    - Python dtype: int
- boost_dB
    - 对低于截止频率的频段施加的增益量，以分贝为单位。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过低音增强处理后的音频数据。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
