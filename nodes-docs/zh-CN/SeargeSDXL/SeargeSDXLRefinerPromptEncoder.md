# Documentation
- Class name: SeargeSDXLRefinerPromptEncoder
- Category: Searge/_deprecated_/ClipEncoding
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在通过将文本输入编码成结构化格式来处理和细化它们，这种格式对于后续的分析或生成任务至关重要。它专注于将正面和负面参考转换为调节格式，这对于管道中的后续步骤至关重要。

# Input types
## Required
- refiner_clip
    - 这个参数至关重要，因为它为编码过程提供了基础。它是对CLIP模型的引用，将用于标记化和编码输入文本，使得文本数据能够被节点处理。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- pos_r
    - 这个参数对于提供正面参考文本至关重要。它通过确定后续任务中使用的正面调节数据的上下文和质量来影响编码过程。
    - Comfy dtype: STRING
    - Python dtype: str
- neg_r
    - 这个参数对于提供负面参考文本至关重要。它通过为负面调节数据建立上下文来影响编码，这对于后续步骤的准确性和有效性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_ascore
    - 这个参数很重要，因为它设置了正面参考的审美分数。它在指导细化过程中起着关键作用，确保编码输出符合期望的审美标准。
    - Comfy dtype: FLOAT
    - Python dtype: float
- neg_ascore
    - 这个参数对于定义负面参考的审美分数很重要。它有助于塑造细化过程，以满足负面调节数据所需的审美标准。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_width
    - 这个参数在确定细化空间的宽度方面至关重要。它直接影响输出的尺寸，确保编码符合下游任务的具体要求。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_height
    - 这个参数对于设置细化空间的高度至关重要。它与宽度参数共同作用，定义了调节数据的整体大小，这对于编码过程的精度至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- refiner_positive
    - 输出提供了编码后的正面参考数据，这是后续需要正面调节上下文的任务的关键组成部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[CLIPCondition, Dict[str, Union[float, int]]]
- refiner_negative
    - 输出提供了编码后的负面参考数据，这是依赖于负面调节上下文的任务的基本元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[CLIPCondition, Dict[str, Union[float, int]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSDXLRefinerPromptEncoder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'refiner_clip': ('CLIP',), 'pos_r': ('STRING', {'multiline': True, 'default': 'POS_R'}), 'neg_r': ('STRING', {'multiline': True, 'default': 'NEG_R'}), 'pos_ascore': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'neg_ascore': ('FLOAT', {'default': 2.5, 'min': 0.0, 'max': 1000.0, 'step': 0.01}), 'refiner_width': ('INT', {'default': 2048, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'refiner_height': ('INT', {'default': 2048, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('refiner_positive', 'refiner_negative')
    FUNCTION = 'encode'
    CATEGORY = 'Searge/_deprecated_/ClipEncoding'

    def encode(self, refiner_clip, pos_r, neg_r, pos_ascore, neg_ascore, refiner_width, refiner_height):
        tokens1 = refiner_clip.tokenize(pos_r)
        (cond1, pooled1) = refiner_clip.encode_from_tokens(tokens1, return_pooled=True)
        res1 = [[cond1, {'pooled_output': pooled1, 'aesthetic_score': pos_ascore, 'width': refiner_width, 'height': refiner_height}]]
        tokens2 = refiner_clip.tokenize(neg_r)
        (cond2, pooled2) = refiner_clip.encode_from_tokens(tokens2, return_pooled=True)
        res2 = [[cond2, {'pooled_output': pooled2, 'aesthetic_score': neg_ascore, 'width': refiner_width, 'height': refiner_height}]]
        return (res1, res2)
```