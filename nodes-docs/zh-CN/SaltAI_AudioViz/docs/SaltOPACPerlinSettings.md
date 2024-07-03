
# Documentation
- Class name: SaltOPACPerlinSettings
- Category: SALT/Scheduling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltOPACPerlinSettings节点用于配置OPAC节点的柏林噪声采样参数，以基于噪声模式生成动态视觉效果。它处理输入设置以调整视觉效果的外观，如通过应用柏林噪声算法来调整不透明度和纹理。

# Input types
## Required
- zoom_octaves
    - 控制要应用的柏林噪声层数，影响视觉效果的复杂程度。
    - Comfy dtype: INT
    - Python dtype: int
- zoom_persistence
    - 影响柏林噪声中每个倍频程的振幅，调整视觉效果的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoom_lacunarity
    - 影响柏林噪声中每个倍频程的频率，修改视觉效果的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoom_repeat
    - 决定柏林噪声模式重复的频率，影响视觉效果的周期性。
    - Comfy dtype: INT
    - Python dtype: int
- angle_octaves
    - 指定角度调整的柏林噪声层数，影响旋转的复杂程度。
    - Comfy dtype: INT
    - Python dtype: int
- angle_persistence
    - 调整角度柏林噪声每个倍频程的振幅，影响旋转的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- angle_lacunarity
    - 修改角度柏林噪声每个倍频程的频率，改变旋转的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- angle_repeat
    - 设置角度柏林噪声模式的重复率，影响旋转的周期性。
    - Comfy dtype: INT
    - Python dtype: int
- trx_octaves
    - 定义X轴平移的柏林噪声层数，影响移动的复杂程度。
    - Comfy dtype: INT
    - Python dtype: int
- trx_persistence
    - 控制X轴平移每个倍频程的振幅，调整移动的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trx_lacunarity
    - 影响X轴平移每个倍频程的频率，修改移动的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trx_repeat
    - 决定X轴平移柏林噪声模式的重复率，影响移动的周期性。
    - Comfy dtype: INT
    - Python dtype: int
- try_octaves
    - 指定Y轴平移的柏林噪声层数，影响移动的复杂程度。
    - Comfy dtype: INT
    - Python dtype: int
- try_persistence
    - 调整Y轴平移每个倍频程的振幅，影响移动的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- try_lacunarity
    - 修改Y轴平移每个倍频程的频率，改变移动的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- try_repeat
    - 设置Y轴平移柏林噪声模式的重复率，影响移动的周期性。
    - Comfy dtype: INT
    - Python dtype: int
- trz_octaves
    - 定义Z轴平移的柏林噪声层数，影响深度移动的复杂程度。
    - Comfy dtype: INT
    - Python dtype: int
- trz_persistence
    - 控制Z轴平移每个倍频程的振幅，调整深度移动的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trz_lacunarity
    - 影响Z轴平移每个倍频程的频率，修改深度移动的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- trz_repeat
    - 决定Z轴平移柏林噪声模式的重复率，影响深度移动的周期性。
    - Comfy dtype: INT
    - Python dtype: int
- rotx_octaves
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- rotx_persistence
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- rotx_lacunarity
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- rotx_repeat
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- roty_octaves
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- roty_persistence
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- roty_lacunarity
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- roty_repeat
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- rotz_octaves
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- rotz_persistence
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- rotz_lacunarity
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- rotz_repeat
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown

# Output types
- opac_perlin_settings
    - 配置好的柏林噪声参数，可以应用于OPAC节点以生成动态视觉效果。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltOPACPerlinSettings:
    """
        Configuration node for Perlin noise sampling in OPAC node
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "zoom_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "zoom_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "zoom_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "zoom_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "angle_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "angle_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "angle_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "angle_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "trx_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "trx_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "trx_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "trx_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "try_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "try_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "try_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "try_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "trz_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "trz_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "trz_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "trz_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "rotx_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "rotx_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "rotx_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "rotx_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "roty_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "roty_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "roty_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "roty_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
                "rotz_octaves": ("INT", {"default": 1, "min": 1, "max": 10}),
                "rotz_persistence": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0}),
                "rotz_lacunarity": ("FLOAT", {"default": 2.0, "min": 1.0, "max": 4.0}),
                "rotz_repeat": ("INT", {"default": 1024, "min": 256, "max": 4096}),
            }
        }
    
    RETURN_TYPES = ("DICT",)
    RETURN_NAMES = ("opac_perlin_settings",)
    FUNCTION = "process"
    CATEGORY = "SALT/Scheduling"

    def process(self, **kwargs):
        return (kwargs, )

```
