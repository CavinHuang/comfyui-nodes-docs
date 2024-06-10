# Documentation
- Class name: CLIPTextEncodeSDXL
- Category: advanced/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPTextEncodeSDXL节点旨在将文本信息编码为可用于高级条件任务的格式。它利用CLIP模型理解和处理文本的能力，将其转换为一组令牌，这些令牌可以用于图像生成或基于文本的搜索等下游应用。此节点对于将文本上下文整合到各种AI模型中至关重要，允许生成更丰富、更微妙的输出。

# Input types
## Required
- width
    - ‘width’参数指定编码过程的宽度维度。这对于确定输出的分辨率并确保与系统中其他组件的兼容性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数设置编码过程的高度维度。它与‘width’参数协同工作，以确定编码输出的总体大小。
    - Comfy dtype: INT
    - Python dtype: int
- target_width
    - ‘target_width’参数指示编码输出的期望宽度。它指导编码过程产生满足特定尺寸要求的输出。
    - Comfy dtype: INT
    - Python dtype: int
- target_height
    - ‘target_height’参数设置编码输出的期望高度。这对于保持纵横比并确保编码数据适合于预期的显示或处理框架至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- text_g
    - ‘text_g’参数接受要编码的文本作为输入。它是一个关键组件，因为它直接影响编码输出的质量和相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- text_l
    - ‘text_l’参数为编码过程提供额外的文本输入。它增强了节点可用的上下文信息，可能提高编码的准确性和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - ‘clip’参数应该是CLIP模型的一个实例，这对编码过程至关重要。正是通过这个模型，文本被标记化和编码。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model instance
## Optional
- crop_w
    - ‘crop_w’参数用于在编码过程中定义裁剪区域的宽度。它允许对输入数据的特定部分进行选择性关注。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h
    - ‘crop_h’参数在编码过程中确定裁剪区域的高度。它补充‘crop_w’以控制输入内部的空间焦点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- CONDITIONING
    - CLIPTextEncodeSDXL节点的输出是一个'CONDITIONING'对象，它封装了编码后的文本信息。这个对象对于需要将文本上下文整合到模型输出中的应用至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPTextEncodeSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text_g': ('STRING', {'multiline': True, 'dynamicPrompts': True}), 'clip': ('CLIP',), 'text_l': ('STRING', {'multiline': True, 'dynamicPrompts': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'advanced/conditioning'

    def encode(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l):
        tokens = clip.tokenize(text_g)
        tokens['l'] = clip.tokenize(text_l)['l']
        if len(tokens['l']) != len(tokens['g']):
            empty = clip.tokenize('')
            while len(tokens['l']) < len(tokens['g']):
                tokens['l'] += empty['l']
            while len(tokens['l']) > len(tokens['g']):
                tokens['g'] += empty['g']
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled, 'width': width, 'height': height, 'crop_w': crop_w, 'crop_h': crop_h, 'target_width': target_width, 'target_height': target_height}]],)
```