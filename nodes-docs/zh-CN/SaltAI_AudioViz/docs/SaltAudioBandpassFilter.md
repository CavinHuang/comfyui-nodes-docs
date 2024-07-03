
# Documentation
- Class name: SaltAudioBandpassFilter
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioBandpassFilter节点将带通滤波器应用于音频输入，允许特定频率范围内的频率通过，同时衰减该范围之外的频率。这个过程对于隔离特定频带或减少噪音非常有用。

# Input types
## Required
- audio
    - 待处理的原始音频数据。这个输入对于定义将要进行带通滤波的音频内容至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- low_cutoff_frequency
    - 带通滤波器的低频截止阈值。低于此值的频率将被衰减，有助于隔离所需的频带。
    - Comfy dtype: INT
    - Python dtype: int
- high_cutoff_frequency
    - 带通滤波器的高频截止阈值。高于此值的频率将被衰减，进一步精细化所需频带的隔离。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- audio
    - 应用带通滤波器后的处理音频数据，允许指定频率通过，其他频率被衰减。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


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
