# Documentation
- Class name: SeargeSDXLBasePromptEncoder
- Category: Searge/_deprecated_/ClipEncoding
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeSDXLBasePromptEncoder类作为处理和编码文本输入到CLIP模型可用格式的中介。它旨在通过平衡和对齐正面和负面文本提示的长度来处理文本编码任务，确保与模型的要求兼容。

# Input types
## Required
- base_clip
    - base_clip参数对于节点的功能至关重要，因为它提供了文本标记化和编码的基础。它是一个CLIP模型实例，用于标记化和编码输入的文本提示。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- pos_g
    - 正面全局文本输入对于生成正面条件数据至关重要。它影响编码过程的整体情感和方向。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 正面局部文本输入对于细化正面条件数据非常重要。它有助于为编码过程增加粒度和特异性。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_g
    - 负面全局文本输入对于产生负面条件数据非常关键。它塑造了编码过程的对比和边界。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_l
    - 负面局部文本输入对于详细说明负面条件数据很重要。它有助于提高编码过程的精确度和专注度。
    - Comfy dtype: STRING
    - Python dtype: str
- base_width
    - base_width参数决定了编码过程中基础图像的宽度尺寸。它是数据空间配置的重要组成部分。
    - Comfy dtype: INT
    - Python dtype: int
- base_height
    - base_height参数设置了编码过程中基础图像的高度尺寸。它对于保持数据的纵横比和结构完整性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- crop_w
    - crop_w参数用于确定从基础图像中裁剪区域的宽度。它影响编码数据的焦点和框架。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - crop_h参数指定从基础图像中裁剪区域的高度。它对编码数据的构图和布局非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - target_width参数概述了最终输出的期望宽度。它在指导编码过程的调整大小和缩放操作中至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - target_height参数定义了最终输出的期望高度。它对于对齐编码数据的尺寸和比例非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- base_positive
    - base_positive输出包含编码后的正面条件数据，对于在后续处理阶段建立正面的上下文和情感至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[str, Dict[str, Union[str, int, torch.Tensor]]]
- base_negative
    - base_negative输出提供编码后的负面条件数据，对于定义编码过程中的边界和对比至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[str, Dict[str, Union[str, int, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSDXLBasePromptEncoder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_clip': ('CLIP',), 'pos_g': ('STRING', {'multiline': True, 'default': 'POS_G'}), 'pos_l': ('STRING', {'multiline': True, 'default': 'POS_L'}), 'neg_g': ('STRING', {'multiline': True, 'default': 'NEG_G'}), 'neg_l': ('STRING', {'multiline': True, 'default': 'NEG_L'}), 'base_width': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'base_height': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'target_width': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'target_height': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('base_positive', 'base_negative')
    FUNCTION = 'encode'
    CATEGORY = 'Searge/_deprecated_/ClipEncoding'

    def encode(self, base_clip, pos_g, pos_l, neg_g, neg_l, base_width, base_height, crop_w, crop_h, target_width, target_height):
        empty = base_clip.tokenize('')
        tokens1 = base_clip.tokenize(pos_g)
        tokens1['l'] = base_clip.tokenize(pos_l)['l']
        if len(tokens1['l']) != len(tokens1['g']):
            while len(tokens1['l']) < len(tokens1['g']):
                tokens1['l'] += empty['l']
            while len(tokens1['l']) > len(tokens1['g']):
                tokens1['g'] += empty['g']
        (cond1, pooled1) = base_clip.encode_from_tokens(tokens1, return_pooled=True)
        res1 = [[cond1, {'pooled_output': pooled1, 'width': base_width, 'height': base_height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]]
        tokens2 = base_clip.tokenize(neg_g)
        tokens2['l'] = base_clip.tokenize(neg_l)['l']
        if len(tokens2['l']) != len(tokens2['g']):
            while len(tokens2['l']) < len(tokens2['g']):
                tokens2['l'] += empty['l']
            while len(tokens2['l']) > len(tokens2['g']):
                tokens2['g'] += empty['g']
        (cond2, pooled2) = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res2 = [[cond2, {'pooled_output': pooled2, 'width': base_width, 'height': base_height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]]
        return (res1, res2)
```