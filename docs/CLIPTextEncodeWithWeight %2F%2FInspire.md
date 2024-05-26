# Documentation
- Class name: CLIPTextEncodeWithWeight
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在使用CLIP模型处理文本数据，具有调整编码强度和对标记应用额外权重的能力，从而允许对文本编码过程进行细微控制。

# Input types
## Required
- text
    - 文本参数是必需的，因为它提供了节点处理的原始文本输入。它是编码和权重调整的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - clip参数代表将用于标记化和编码输入文本的CLIP模型。它对于节点的功能至关重要，因为它决定了编码过程。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
## Optional
- strength
    - 强度参数允许调整文本标记的编码强度。它修改编码过程，以更好地适应手头任务的特定要求。
    - Comfy dtype: FLOAT
    - Python dtype: float
- add_weight
    - add_weight参数提供了在编码过程中对标记应用额外权重的能力。这可以用来根据任务的需要进一步微调编码。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pooled_output
    - pooled_output参数代表编码文本的聚合和浓缩表示，这是节点处理的结果。它封装了文本的精髓以供进一步使用。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class CLIPTextEncodeWithWeight:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'add_weight': ('FLOAT', {'default': 0.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = 'InspirePack/Util'

    def encode(self, clip, text, strength, add_weight):
        tokens = clip.tokenize(text)
        if add_weight != 0 or strength != 1:
            for v in tokens.values():
                for vv in v:
                    for i in range(0, len(vv)):
                        vv[i] = (vv[i][0], vv[i][1] * strength + add_weight)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled}]],)
```