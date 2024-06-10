# Documentation
- Class name: WAS_Image_Voronoi_Noise_Filter
- Category: WAS Suite/Image/Generate/Noise
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Voronoi_Noise_Filter节点旨在从输入图像生成Voronoi噪声模式。它可以用于为进一步的图像处理或艺术目的创建独特的纹理或图案。该节点利用Voronoi图的原理产生噪声模式，可以根据宽度、高度、密度和调制器等参数进行调整，提供了一个用于噪声生成的多功能工具。

# Input types
## Required
- width
    - 宽度参数定义了输出图像的宽度。它对于确定生成的噪声模式的整体尺寸至关重要。此设置通过规定输出的水平范围直接影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置输出图像的高度。它与宽度一起工作，以建立噪声模式的完整分辨率。此参数对于控制噪声纹理的垂直尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- density
    - 密度参数影响噪声模式中Voronoi单元的浓度。更高的密度值会产生更精细、更详细的噪声纹理。该参数对于调整输出中的细节级别非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- modulator
    - 调制器参数调整噪声模式中的变化。它可以通过改变Voronoi单元的分布，引入不同级别的复杂性到噪声中。这个参数是微调噪声纹理视觉外观的关键。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数用于初始化随机数生成器，确保每次使用相同的种子值运行节点时都能得到可重复的模式。它在生成每个特定种子的可预测和一致的噪声纹理中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- flat
    - 平坦参数决定噪声纹理是否应具有平坦或更传统的Voronoi外观。这个可选设置可以用来根据期望的结果实现不同的美学效果。
    - Comfy dtype: COMBO[False, True]
    - Python dtype: bool
- RGB_output
    - RGB_output参数指定输出图像是否应为RGB格式。设置为True时，节点生成RGB图像；设置为False时，它产生灰度图像。这个选项允许在图像输出类型上具有灵活性。
    - Comfy dtype: COMBO[True, False]
    - Python dtype: bool

# Output types
- image
    - 输出图像参数代表节点生成的Voronoi噪声模式的结果。它是一个重要的输出，因为它是节点执行的主要结果，可以用于进一步处理或显示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Voronoi_Noise_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'height': ('INT', {'default': 512, 'max': 4096, 'min': 64, 'step': 1}), 'density': ('INT', {'default': 50, 'max': 256, 'min': 10, 'step': 2}), 'modulator': ('INT', {'default': 0, 'max': 8, 'min': 0, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'optional': {'flat': (['False', 'True'],), 'RGB_output': (['True', 'False'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'voronoi_noise_filter'
    CATEGORY = 'WAS Suite/Image/Generate/Noise'

    def voronoi_noise_filter(self, width, height, density, modulator, seed, flat='False', RGB_output='True'):
        WTools = WAS_Tools_Class()
        image = WTools.worley_noise(height=height, width=width, density=density, option=modulator, use_broadcast_ops=True, seed=seed, flat=flat == 'True').image
        if RGB_output == 'True':
            image = image.convert('RGB')
        else:
            image = image.convert('L')
        return (pil2tensor(image),)
```