# Documentation
- Class name: WLSH_CLIP_Text_Positive_Negative_XL
- Category: WLSH Nodes/conditioning
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_CLIP_Text_Positive_Negative_XL 节点旨在将文本输入处理并编码为适用于条件生成模型的格式。它接收正面和负面的文本示例，并将它们转换成编码表示，这些表示可用于引导生成过程。该节点在塑造生成模型的输出中起着关键作用，通过基于文本输入提供上下文线索。

# Input types
## Required
- width
    - 宽度参数为节点的图像处理组件定义了宽度维度。它对于设置适当的分辨率并确保输出图像符合所需规格至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数指定要处理的图像的垂直维度。它与宽度参数一起工作，以确定图像的总体分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - target_width 参数设置最终输出图像的期望宽度。它是节点内调整大小和缩放操作的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - target_height 参数设定最终输出图像的期望高度，确保图像在处理后满足所需的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- positive_g
    - positive_g 参数接受表示正面引导文本的字符串。它对于将生成过程的方向引导至更有利的结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_l
    - positive_l 参数提供额外的文本以补充正面引导文本。它有助于为生成模型细化正面条件线索。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_g
    - negative_g 参数包含负面引导文本，用于引导生成过程避免不希望的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_l
    - negative_l 参数补充了负面引导文本，进一步定义了生成输出中要避免的内容的界限。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - clip 参数应该是 CLIP 模型的一个实例，这对于节点内文本编码至关重要。它使得文本输入能够转换成生成模型可以使用的形式。
    - Comfy dtype: CLIP
    - Python dtype: Any
## Optional
- crop_w
    - crop_w 参数用于定义图像中裁剪区域的宽度。它允许对图像的特定区域进行选择性关注以进行进一步处理。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - crop_h 参数确定图像中裁剪区域的高度。它用于提取图像的特定部分进行更详细的分析或处理。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- positive
    - 正面输出提供正面引导文本的编码表示，用于引导生成过程朝向期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- negative
    - 负面输出包含负面引导文本的编码表示，用于指导生成过程避免不希望的方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- positive_text
    - positive_text 输出是正面引导文本的连接字符串，提供了生成过程中使用的正面线索的可读形式。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_text
    - negative_text 输出是负面引导文本的连接字符串，提供了生成过程中用来避免某些结果的负面线索的可读形式。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_CLIP_Text_Positive_Negative_XL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'positive_g': ('STRING', {'multiline': True, 'default': 'POS_G'}), 'positive_l': ('STRING', {'multiline': True, 'default': 'POS_L'}), 'negative_g': ('STRING', {'multiline': True, 'default': 'NEG_G'}), 'negative_l': ('STRING', {'multiline': True, 'default': 'NEG_L'}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative', 'positive_text', 'negative_text')
    FUNCTION = 'encode'
    CATEGORY = 'WLSH Nodes/conditioning'

    def encode(self, clip, width, height, crop_w, crop_h, target_width, target_height, positive_g, positive_l, negative_g, negative_l):
        tokens = clip.tokenize(positive_g)
        tokens['l'] = clip.tokenize(positive_l)['l']
        if len(tokens['l']) != len(tokens['g']):
            empty = clip.tokenize('')
            while len(tokens['l']) < len(tokens['g']):
                tokens['l'] += empty['l']
            while len(tokens['l']) > len(tokens['g']):
                tokens['g'] += empty['g']
        (condP, pooledP) = clip.encode_from_tokens(tokens, return_pooled=True)
        tokensN = clip.tokenize(negative_g)
        tokensN['l'] = clip.tokenize(negative_l)['l']
        if len(tokensN['l']) != len(tokensN['g']):
            empty = clip.tokenize('')
            while len(tokensN['l']) < len(tokensN['g']):
                tokensN['l'] += empty['l']
            while len(tokensN['l']) > len(tokensN['g']):
                tokensN['g'] += empty['g']
        (condN, pooledN) = clip.encode_from_tokens(tokensN, return_pooled=True)
        positive_text = positive_g + ', ' + positive_l
        negative_text = negative_g + ', ' + negative_l
        return ([[condP, {'pooled_output': pooledP, 'width': width, 'height': height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]], [[condN, {'pooled_output': pooledP, 'width': width, 'height': height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]], positive_text, negative_text)
```