# Documentation
- Class name: TextImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点便于创建带有文本内容的图像，提供了一系列定制选项，如字体风格、大小和颜色。它将文本数据与视觉表示融合，使得能够生成将文本和设计元素整合在一起的自定义视觉输出。该节点特别适用于需要将文本信息合成到图像格式的应用场景。

# Input types
## Required
- text
    - 文本参数至关重要，它定义了将要渲染到图像中的文本内容。它是节点操作的主要输入，决定了将要视觉化呈现的信息或消息。
    - Comfy dtype: STRING
    - Python dtype: str
- font_path
    - font_path参数指定了用于文本的字体来源。它在确定生成图像中文本的风格外观方面至关重要，影响整体美感和可读性。
    - Comfy dtype: STRING
    - Python dtype: str
- font_size
    - font_size参数调整文本的大小，直接影响图像中文本的突出性和可读性。它是最终输出视觉影响的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- spacing
    - 间距参数定义了字符和文本行之间的距离，可以增强或降低图像的清晰度和视觉吸引力。它在文本内容的排列和呈现中起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- text_color
    - text_color参数设置了文本的颜色，影响图像的对比度和视觉动态效果。它是设计的重要方面，有助于整体视觉效果。
    - Comfy dtype: STRING
    - Python dtype: str
- vertical
    - vertical参数决定了文本的方向，是水平还是垂直。这个选择影响了图像中文本的布局和结构，影响了构图和流动性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- stroke
    - stroke参数在文本周围应用边框或轮廓，增强了文本的定义和与背景的分离。这为文本增加了额外的视觉细节和深度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - 图像输出是节点的主要结果，代表了输入文本的视觉表示。它封装了设计选择和文本布局，提供了可以用于各种应用的有形输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- MASK
    - MASK输出提供了文本图像的alpha通道表示，可用于高级图像处理和合成任务。它提供了对文本透明度和与其他视觉元素混合的控制水平。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class TextImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': '龍馬精神迎新歲', 'dynamicPrompts': False}), 'font_path': ('STRING', {'multiline': False, 'default': FONT_PATH, 'dynamicPrompts': False}), 'font_size': ('INT', {'default': 100, 'min': 100, 'max': 1000, 'step': 1, 'display': 'number'}), 'spacing': ('INT', {'default': 12, 'min': -200, 'max': 200, 'step': 1, 'display': 'number'}), 'text_color': ('STRING', {'multiline': False, 'default': '#000000', 'dynamicPrompts': False}), 'vertical': ('BOOLEAN', {'default': True}), 'stroke': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False)

    def run(self, text, font_path, font_size, spacing, text_color, vertical, stroke):
        (img, mask) = generate_text_image(text, font_path, font_size, text_color, vertical, stroke, (0, 0, 0), 1, spacing)
        img = pil2tensor(img)
        mask = pil2tensor(mask)
        return (img, mask)
```