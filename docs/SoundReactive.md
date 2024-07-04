
# Documentation
- Class name: SoundReactive
- Category: KJNodes/audio
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SoundReactive节点专门用于处理音频输入，并根据声音水平调整其行为。它能动态响应特定频率范围内声音强度的变化，并通过声音水平、频率范围和归一化等参数提供自定义选项。该节点特别适用于创建实时的音频反应式可视化或效果。

# Input types
## Required
- sound_level
    - 指定要处理的当前声音水平。它通过根据乘数和归一化设置进行缩放来影响节点的输出，直接影响对音频输入的动态响应。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_range_hz
    - 定义感兴趣频率范围的下限。该参数有助于将节点的敏感度集中在音频频谱的特定部分。
    - Comfy dtype: INT
    - Python dtype: int
- end_range_hz
    - 设置要考虑的频率范围的上限。它与start_range_hz配合使用，以微调节点对所需频带的反应性。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - 对声音水平应用缩放因子，允许更精细地控制节点对音频输入的响应性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smoothing_factor
    - 决定应用于声音水平的平滑程度，有助于创建更平滑的过渡和效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- normalize
    - 启用或禁用声音水平的归一化，这可以标准化输入范围，以在不同音频源之间实现一致的处理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- sound_level
    - 经过处理的声音水平，根据节点的参数进行调整。它反映了音频强度的动态变化，经过缩放和可选的归一化处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sound_level_int
    - 处理后声音水平的整数表示，为需要离散级别的场景提供简化或量化的输出。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SoundReactive:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {  
            "sound_level": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 99999, "step": 0.01}),
            "start_range_hz": ("INT", {"default": 150, "min": 0, "max": 9999, "step": 1}),
            "end_range_hz": ("INT", {"default": 2000, "min": 0, "max": 9999, "step": 1}),
            "multiplier": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 99999, "step": 0.01}),
            "smoothing_factor": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            "normalize": ("BOOLEAN", {"default": False}),
            },
            }
    
    RETURN_TYPES = ("FLOAT","INT",)
    RETURN_NAMES =("sound_level", "sound_level_int",)
    FUNCTION = "react"
    CATEGORY = "KJNodes/audio"
    DESCRIPTION = """
Reacts to the sound level of the input.  
Uses your browsers sound input options and requires.  
Meant to be used with realtime diffusion with autoqueue.
"""
        
    def react(self, sound_level, start_range_hz, end_range_hz, smoothing_factor, multiplier, normalize):

        sound_level *= multiplier

        if normalize:
            sound_level /= 255

        sound_level_int = int(sound_level)
        return (sound_level, sound_level_int, )     

```
