
# Documentation
- Class name: SaltAudio2VHS
- Category: SALT/Audio/Util
- Output node: False

SaltAudio2VHS节点旨在将音频输入转换为模拟VHS磁带音频特性的格式，从而提供一种怀旧或复古的音频效果。

# Input types
## Required
- audio
    - 'audio'输入是将被处理以模拟VHS磁带音质的原始音频数据。它对于在应用VHS效果之前定义基础音频内容至关重要。
    - Comfy dtype: AUDIO
    - Python dtype: bytes

# Output types
- vhs_audio
    - Comfy dtype: VHS_AUDIO
    - 'vhs_audio'输出是经过处理以模仿VHS磁带音频特性的转换后的音频数据，提供独特的复古音频体验。
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudio2VHS:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", ), 
            },
        }

    RETURN_TYPES = ("VHS_AUDIO",)
    RETURN_NAMES = ("vhs_audio",)

    FUNCTION = "convert"
    CATEGORY = "SALT/Audio/Util"

    def convert(self, audio):
        return (lambda : audio,)

```
