# Documentation
- Class name: CR_SDXLBasePromptEncoder
- Category: icons.get('Comfyroll/SDXL')
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SDXLBasePromptEncoder类旨在处理和编码用于生成具有特定属性的图像的提示。它管理正面和负面提示的编码，确保生成的图像符合所需特征并避免不需要的特征。

# Input types
## Required
- base_clip
    - base_clip参数对于编码过程至关重要，它为图像生成提供了基础。它用于标记和编码输入提示，然后这些提示被用来引导图像的创建。
    - Comfy dtype: CLIP
    - Python dtype: PIL.Image
- pos_g
    - pos_g参数代表正面引导文本，对于指定生成图像中所需特征至关重要。它有助于将图像生成过程引向预期的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - pos_l参数是正面语言文本，它补充了引导文本。它提供了额外的上下文来细化图像生成过程，确保所需属性被清晰传达。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_g
    - neg_g参数包含负面引导文本，它指定了生成图像中要避免的特征。它在确保最终输出符合用户偏好方面发挥着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_l
    - neg_l参数代表负面语言文本，通过指定不需要的特征来进一步细化图像生成。这对于实现符合用户期望的最终图像非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- preset
    - preset参数允许用户选择预定义的正面和负面提示组合进行图像生成。它通过提供平衡所需和不期望特征包含的选项，简化了过程。
    - Comfy dtype: COMBO[preset A, preset B, preset C]
    - Python dtype: str
- base_width
    - base_width参数定义了用于编码的基础图像的宽度。它是确定生成图像的分辨率和宽高比的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- base_height
    - base_height参数指定了基础图像的高度，与base_width一起，决定了编码过程产生的图像的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop_w
    - crop_w参数指示从基础图像中裁剪区域的宽度。它在将编码聚焦于图像的特定区域以符合期望输出方面发挥作用。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - crop_h参数定义了裁剪区域的高度，与crop_w一起工作，确定基础图像中被编码和用于图像生成的精确部分。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - target_width参数设置了最终生成图像的期望宽度。它是实现输出的预期分辨率和宽高比的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - target_height参数指定了最终图像的期望高度，确保输出在尺寸和构图方面符合用户的要求。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- base_positive
    - base_positive输出包含正面提示的编码表示，用于引导生成具有所需属性的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- base_negative
    - base_negative输出代表编码后的负面提示，用于从生成的图像中排除不需要的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- show_help
    - show_help输出提供了一个链接到文档，以便进一步协助和理解节点的功能和用法。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SDXLBasePromptEncoder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_clip': ('CLIP',), 'pos_g': ('STRING', {'multiline': True, 'default': 'POS_G'}), 'pos_l': ('STRING', {'multiline': True, 'default': 'POS_L'}), 'neg_g': ('STRING', {'multiline': True, 'default': 'NEG_G'}), 'neg_l': ('STRING', {'multiline': True, 'default': 'NEG_L'}), 'preset': (['preset A', 'preset B', 'preset C'],), 'base_width': ('INT', {'default': 4096.0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64}), 'base_height': ('INT', {'default': 4096.0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64}), 'target_width': ('INT', {'default': 4096.0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64}), 'target_height': ('INT', {'default': 4096.0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 64})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('base_positive', 'base_negative', 'show_help')
    FUNCTION = 'encode'
    CATEGORY = icons.get('Comfyroll/SDXL')

    def encode(self, base_clip, pos_g, pos_l, neg_g, neg_l, base_width, base_height, crop_w, crop_h, target_width, target_height, preset):
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
        tokens2 = base_clip.tokenize(pos_l)
        tokens2['l'] = base_clip.tokenize(neg_l)['l']
        if len(tokens2['l']) != len(tokens2['g']):
            while len(tokens2['l']) < len(tokens2['g']):
                tokens2['l'] += empty['l']
            while len(tokens2['l']) > len(tokens2['g']):
                tokens2['g'] += empty['g']
        (cond2, pooled2) = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res3 = [[cond2, {'pooled_output': pooled2, 'width': base_width, 'height': base_height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]]
        tokens2 = base_clip.tokenize(neg_l)
        tokens2['l'] = base_clip.tokenize(neg_l)['l']
        if len(tokens2['l']) != len(tokens2['g']):
            while len(tokens2['l']) < len(tokens2['g']):
                tokens2['l'] += empty['l']
            while len(tokens2['l']) > len(tokens2['g']):
                tokens2['g'] += empty['g']
        (cond2, pooled2) = base_clip.encode_from_tokens(tokens2, return_pooled=True)
        res4 = [[cond2, {'pooled_output': pooled2, 'width': base_width, 'height': base_height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]]
        if preset == 'preset A':
            base_positive = res1
            base_negative = res2
        elif preset == 'preset B':
            base_positive = res3
            base_negative = res4
        elif preset == 'preset C':
            base_positive = res1 + res3
            base_negative = res2 + res4
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-base-prompt-encoder'
        return (base_positive, base_negative, show_help)
```