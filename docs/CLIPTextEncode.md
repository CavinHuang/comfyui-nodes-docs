# Documentation
- Class name: CLIPTextEncode
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPTextEncode节点旨在使用CLIP模型处理文本输入以生成条件向量。它将文本转换为可以用于进一步处理的格式，例如在生成模型中。该节点在弥合文本与其他模态之间的语义差距中发挥关键作用，通过创建包含文本信息的条件向量。

# Input types
## Required
- text
    - ‘text’参数对节点的操作至关重要，因为它是节点处理的原始文本数据。预期它是一个字符串，可能包含多行输入，并支持动态提示，这可以显著影响编码过程和生成的条件向量。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - ‘clip’参数表示节点用于文本编码的CLIP模型。它是一个关键组件，因为CLIP模型的质量和特异性直接影响节点将文本信息准确编码为条件向量的能力。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel

# Output types
- CONDITIONING
    - 输出‘CONDITIONING’是节点生成的关键元素。它是从输入文本派生的条件向量，可用于指导或条件后续过程，如图像生成或其他条件模型。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPTextEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'dynamicPrompts': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'conditioning'

    def encode(self, clip, text):
        tokens = clip.tokenize(text)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled}]],)
```