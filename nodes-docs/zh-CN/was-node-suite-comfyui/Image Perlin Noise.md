# Documentation
- Class name: WAS_Image_Perlin_Noise
- Category: WAS Suite/Image/Generate/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Perlin_Noise 节点旨在生成 Perlin 噪声模式，这些模式可以用于各种图形应用程序中，用于创建自然纹理。它通过利用 Python 成像库根据指定的参数（如宽度、高度、缩放、八度、持续性和可选的随机种子）生成具有程序性噪声的图像。这个节点对于寻求在项目中引入有机和多样化纹理的用户非常有益，无需外部图像资产。

# Input types
## Required
- width
    - ‘宽度’参数决定了生成的噪声图像的水平分辨率。这是定义输出尺寸的关键因素，影响噪声模式在图形应用程序中的显示和使用方式。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘高度’参数设置噪声图像的垂直分辨率。与‘宽度’一起，它建立了Perlin噪声将被渲染的图像画布，影响查看噪声细节的比例。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - ‘缩放’参数调整Perlin噪声单元的大小。它改变了噪声模式的密度，较高的值会导致更复杂和更小的噪声单元，而较低的值则产生更稀疏和更大的单元。
    - Comfy dtype: INT
    - Python dtype: int
- octaves
    - ‘八度’参数控制构建噪声模式所使用的频率级别数量。更多的八度为噪声增添复杂性和细节，创造出更自然和多样化的纹理。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - ‘持续性’参数定义了振幅在连续八度之间降低的速率。它影响不同噪声层之间的对比度，有助于整体纹理特征的形成。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- seed
    - ‘种子’参数是用于初始化随机数生成器的可选整数，确保可重复的噪声模式。当使用相同的种子值时，它允许产生一致的结果。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- image
    - '图像'输出提供生成的Perlin噪声作为图像。它可以进一步操作或直接用于图形应用程序中的纹理目的。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Perlin_Noise:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'max': 2048, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 2048, 'min': 64, 'step': 1}), 'scale': ('INT', {'default': 100, 'max': 2048, 'min': 2, 'step': 1}), 'octaves': ('INT', {'default': 4, 'max': 8, 'min': 0, 'step': 1}), 'persistence': ('FLOAT', {'default': 0.5, 'max': 100.0, 'min': 0.01, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'perlin_noise'
    CATEGORY = 'WAS Suite/Image/Generate/Noise'

    def perlin_noise(self, width, height, scale, octaves, persistence, seed):
        WTools = WAS_Tools_Class()
        image = WTools.perlin_noise(width, height, octaves, persistence, scale, seed)
        return (pil2tensor(image),)
```