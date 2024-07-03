
# Documentation
- Class name: SaltAudioTrebleBoost
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioTrebleBoost节点用于增强音频输入的高频部分，允许用户自定义提升较高频率范围的程度。该节点通过应用高通滤波器和增益调整来修改音频内容，可根据用户指定的截止频率和提升级别进行定制。

# Input types
## Required
- audio
    - audio参数是待处理的原始音频数据。它是高频增强处理的主要输入，决定了将要进行频率特定放大的音频内容。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- cutoff_freq
    - cutoff_freq参数指定了高于该频率阈值的高频将被提升。它在定义受高频提升影响的频率范围方面起着关键作用，从而影响整体声音特性。
    - Comfy dtype: INT
    - Python dtype: int
- boost_dB
    - boost_dB参数控制应用于截止点以上高频的增益水平。它直接影响高频增强的强度，允许从微妙到显著的音频修改范围。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 经过高频增强处理的音频，反映了所应用的高通滤波器和增益调整的效果。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
