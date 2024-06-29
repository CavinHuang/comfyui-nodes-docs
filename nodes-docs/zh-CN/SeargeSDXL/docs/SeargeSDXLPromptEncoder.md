# Documentation
- Class name: SeargeSDXLPromptEncoder
- Category: Searge/_deprecated_/ClipEncoding
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在将文本输入处理并编码为生成模型的条件数据。它专注于将提示转换为可以指导生成过程的结构化格式，强调节点在为创意任务准备输入方面的作用。

# Input types
## Required
- base_clip
    - 该参数至关重要，因为它提供了用于编码文本提示的基础CLIP模型。它对节点的运行至关重要，并影响生成的条件数据的质量。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel
- refiner_clip
    - 细化CLIP模型用于进一步处理和细化文本提示，提高条件数据的有效性。其在节点执行和最终输出质量中的作用至关重要。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel
- base_width
    - 基础宽度参数对于定义生成模型的输入空间尺寸至关重要，直接影响生成内容的范围和分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- base_height
    - 与基础宽度类似，基础高度参数在设置输入空间的垂直尺寸方面至关重要，影响输出的整体结构和构图。
    - Comfy dtype: INT
    - Python dtype: int
- crop_w
    - 裁剪宽度参数决定了裁剪区域的水平范围，这对于将生成集中在输入中的特定兴趣区域至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - 裁剪高度参数设置了裁剪区域的垂直尺寸，对于在生成过程中隔离特定元素起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - 目标宽度参数定义了输出的期望宽度，这是确保生成内容满足所需规格和尺寸的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - 目标高度参数指定了输出的期望高度，直接影响生成内容的最终尺寸和布局。
    - Comfy dtype: INT
    - Python dtype: int
- pos_ascore
    - 正面审美分数参数用于加权正面提示在生成过程中的重要性，确保输出反映了期望的审美品质。
    - Comfy dtype: FLOAT
    - Python dtype: float
- neg_ascore
    - 负面审美分数参数有助于减少输出中不希望的审美元素，提高生成内容的精确性和相关性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_width
    - 细化器宽度参数对于设置细化输入空间的尺寸很重要，这对于在输出中实现详细和高质量的细化至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_height
    - 细化器高度参数对于定义细化输入空间的垂直尺寸至关重要，影响输出中审美细化的粒度和精确度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- pos_g
    - 该参数包含正面全局提示，它影响生成内容的整体主题和方向。在为节点操作设置创意背景方面具有重要意义。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 正面局部提示为生成的特定方面提供详细指导，有助于节点产生针对性和细腻的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_r
    - 正面细化提示用于微调生成过程，确保输出与期望的审美和主题目标紧密对齐。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_g
    - 负面全局提示有助于从生成内容中排除不希望的元素，对塑造最终输出的特征起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_l
    - 负面局部提示用于指定在生成中应避免的特定方面，引导节点产生符合特定排除标准的内容丰富。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_r
    - 负面细化提示用于进一步细化排除不希望的元素，确保节点的输出具有高度的精确度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- base_positive
    - 此输出提供了从基础正面提示派生的条件数据，它作为引导生成模型朝着期望的创意方向发展的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: ConditioningData
- base_negative
    - 基础负面输出包含来自基础负面提示的条件数据，有助于从生成内容中排除不希望的元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: ConditioningData
- refiner_positive
    - 此输出包括来自细化器正面提示的条件数据，专注于微调生成内容的审美和主题方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: ConditioningData
- refiner_negative
    - 细化器负面输出提供基于细化器负面提示的条件数据，确保最终输出经过细化以避免不希望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: ConditioningData

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSDXLPromptEncoder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_clip': ('CLIP',), 'refiner_clip': ('CLIP',), 'pos_g': ('STRING', {'multiline': True, 'default': 'POS_G'}), 'pos_l': ('STRING', {'multiline': True, 'default': 'POS_L'}), 'pos_r': ('STRING', {'multiline': True, 'default': 'POS_R'}), 'neg_g': ('STRING', {'multiline': True, 'default': 'NEG_G'}), 'neg_l': ('STRING', {'multiline': True, 'default': 'NEG_L'}), 'neg_r': ('STRING', {'multiline': True, 'default': 'NEG_R'}), 'base_width': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'base_height': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'target_width': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'target_height': ('INT', {'default': 4096, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'pos_ascore': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'neg_ascore': ('FLOAT', {'default': 2.5, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'refiner_width': ('INT', {'default': 2048, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'refiner_height': ('INT', {'default': 2048, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('base_positive', 'base_negative', 'refiner_positive', 'refiner_negative')
    FUNCTION = 'encode'
    CATEGORY = 'Searge/_deprecated_/ClipEncoding'

    def encode(self, base_clip, refiner_clip, pos_g, pos_l, pos_r, neg_g, neg_l, neg_r, base_width, base_height, crop_w, crop_h, target_width, target_height, pos_ascore, neg_ascore, refiner_width, refiner_height):
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
        tokens3 = refiner_clip.tokenize(pos_r)
        (cond3, pooled3) = refiner_clip.encode_from_tokens(tokens3, return_pooled=True)
        res3 = [[cond3, {'pooled_output': pooled3, 'aesthetic_score': pos_ascore, 'width': refiner_width, 'height': refiner_height}]]
        tokens4 = refiner_clip.tokenize(neg_r)
        (cond4, pooled4) = refiner_clip.encode_from_tokens(tokens4, return_pooled=True)
        res4 = [[cond4, {'pooled_output': pooled4, 'aesthetic_score': neg_ascore, 'width': refiner_width, 'height': refiner_height}]]
        return (res1, res2, res3, res4)
```