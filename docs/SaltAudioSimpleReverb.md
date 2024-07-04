
# Documentation
- Class name: SaltAudioSimpleReverb
- Category: SALT/Audio/Effect
- Output node: False

SaltAudioSimpleReverb节点为音频输入添加混响效果，模拟物理空间的声音反射特性。它允许调整混响水平和衰减以定制效果。

# Input types
## Required
- audio
    - 将应用混响效果的音频输入。它作为混响模拟的原始素材。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- reverb_level
    - 确定应用于音频的混响效果强度，影响虚拟空间的感知大小和反射性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- decay
    - 控制混响效果的衰减速率，模拟模拟空间的吸收特性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 应用了混响效果的音频输出，模拟具有混响特性的空间的声学特征。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioSimpleReverb:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "reverb_level": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.01}),
                "decay": ("FLOAT", {"default": 0.5, "min": 0.1, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "apply_reverb"
    CATEGORY = "SALT/Audio/Effect"

    def apply_reverb(self, audio, reverb_level, decay):
        original = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        reverb_duration = int(len(original) * reverb_level)
        output = original

        for overlay_delay in range(50, reverb_duration, 50):
            decayed_overlay = original - (decay * overlay_delay)
            output = output.overlay(decayed_overlay, position=overlay_delay)

        return (get_buffer(output),)

```
