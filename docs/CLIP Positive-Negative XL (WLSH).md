# Documentation
- Class name: WLSH_CLIP_Positive_Negative_XL
- Category: WLSH Nodes/conditioning
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

该节点旨在为对比学习处理和编码正负图像对。它利用CLIP模型提取视觉特征，并将其与文本描述对齐，促进有意义的图像-文本关联的创建。

# Input types
## Required
- width
    - 宽度是定义输入图像水平分辨率的关键参数。它对于节点正确处理和调整图像尺寸至关重要，确保从正确的维度提取编码特征。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度与宽度类似，是指定输入图像垂直分辨率的重要参数。它与宽度一起工作，以确保准确的图像处理和特征编码。
    - Comfy dtype: INT
    - Python dtype: int
- positive_g
    - positive_g参数是与正面图像相关联的文本描述。它对于节点在图像内容和文本之间创建语义连接至关重要，这对于编码过程非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_g
    - negative_g是负面图像的文本描述。这个参数很重要，因为它为正面图像提供了必要的对比，增强了节点从两个不同的图像-文本对中区分和学习的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 正面输出包含正面图像的编码特征和元数据。它是节点输出的关键部分，因为它代表了对比学习过程的一方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Union[str, torch.Tensor]]]
- negative
    - 负面输出与正面输出相对应，但针对的是负面图像。它同样重要，因为它提供了有效对比学习所必需的对比视角。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Union[str, torch.Tensor]]]

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_CLIP_Positive_Negative_XL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'positive_g': ('STRING', {'multiline': True, 'default': 'POS_G'}), 'positive_l': ('STRING', {'multiline': True, 'default': 'POS_L'}), 'negative_g': ('STRING', {'multiline': True, 'default': 'NEG_G'}), 'negative_l': ('STRING', {'multiline': True, 'default': 'NEG_L'}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('positive', 'negative')
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
        return ([[condP, {'pooled_output': pooledP, 'width': width, 'height': height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]], [[condN, {'pooled_output': pooledP, 'width': width, 'height': height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]])
```