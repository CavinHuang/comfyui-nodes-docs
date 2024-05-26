# Documentation
- Class name: WAS_Image_Perlin_Power_Fractal
- Category: WAS Suite/Image/Generate/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Perlin_Power_Fractal 节点旨在程序化生成分形噪声模式，这些模式可用于创建复杂纹理。它利用 Perlin 噪声算法产生自然和谐且无缝的噪声结构，可以无限平铺。该节点特别适用于为3D模型、游戏环境或任何需要连贯且可重复纹理的应用生成纹理。

# Input types
## Required
- width
    - 宽度参数定义了生成纹理的宽度，以像素为单位。它对于设置输出图像的水平分辨率和影响纹理的整体尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数确定了生成纹理的垂直范围，以像素为单位。它与宽度参数一起工作，以确定输出图像的完整分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - 比例参数影响生成纹理的细节水平。较高的比例值会产生更详细且更小的噪声模式，而较低的值则产生更粗糙且更广泛的模式。
    - Comfy dtype: INT
    - Python dtype: int
- octaves
    - 八度参数控制生成分形噪声所使用的频率数量。更多的八度会创造出更复杂和详细的纹理，但也会提高计算成本。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 持续性参数定义了每个连续的八度对整体噪声模式的贡献程度。它影响不同噪声层之间的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lacunarity
    - 间隙率参数规定了连续八度之间的频率间隔。较高的间隙率值会在较小尺度上产生更碎片化和详细的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- exponent
    - 指数参数调整分形噪声中每个八度的振幅。它塑造了整体噪声模式，并可用于创建更精细的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- seed
    - 种子参数用于生成确定性的噪声模式。它确保相同的种子始终产生相同的纹理，促进多张图像或应用之间的一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是由 Perlin 功率分形函数生成的无缝且可平铺的纹理。它可以直接用于图形应用程序，或根据特定需求进行进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Perlin_Power_Fractal:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 8192, 'min': 64, 'step': 1}), 'scale': ('INT', {'default': 100, 'max': 2048, 'min': 2, 'step': 1}), 'octaves': ('INT', {'default': 4, 'max': 8, 'min': 0, 'step': 1}), 'persistence': ('FLOAT', {'default': 0.5, 'max': 100.0, 'min': 0.01, 'step': 0.01}), 'lacunarity': ('FLOAT', {'default': 2.0, 'max': 100.0, 'min': 0.01, 'step': 0.01}), 'exponent': ('FLOAT', {'default': 2.0, 'max': 100.0, 'min': 0.01, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'perlin_power_fractal'
    CATEGORY = 'WAS Suite/Image/Generate/Noise'

    def perlin_power_fractal(self, width, height, scale, octaves, persistence, lacunarity, exponent, seed):
        WTools = WAS_Tools_Class()
        image = WTools.perlin_power_fractal(width, height, octaves, persistence, lacunarity, exponent, scale, seed)
        return (pil2tensor(image),)
```