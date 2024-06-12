# Documentation
- Class name: CLIPTextEncodeControlnet
- Category: _for_testing/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPTextEncodeControlnet节点旨在将文本输入编码成可用于控制图像生成的格式。它利用CLIP模型理解文本并将其转换为可以引导图像生成过程的潜在空间表示。该节点对于在图像合成中实现基于文本的指导至关重要的应用是核心的。

# Input types
## Required
- clip
    - ‘clip’参数至关重要，因为它代表了将用于文本编码的CLIP模型。这是一个关键组件，它使节点能够将文本描述转换为可以影响下游图像生成任务的形式。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- conditioning
    - ‘conditioning’参数在节点的操作中起着至关重要的作用，因为它决定了应用文本编码的条件。这是一个关键输入，有助于塑造编码过程的最终输出，确保生成的图像符合所需的规格。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]
- text
    - ‘text’参数是节点处理的文本输入。它很重要，因为它直接影响编码表示的内容和风格，进而影响生成图像的特征。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning
    - ‘conditioning’输出是从输入文本派生的一组编码表示。它很重要，因为它构成了控制图像生成过程的基础，确保生成的图像符合提供的文本描述。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPTextEncodeControlnet:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'conditioning': ('CONDITIONING',), 'text': ('STRING', {'multiline': True, 'dynamicPrompts': True})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'encode'
    CATEGORY = '_for_testing/conditioning'

    def encode(self, clip, conditioning, text):
        tokens = clip.tokenize(text)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['cross_attn_controlnet'] = cond
            n[1]['pooled_output_controlnet'] = pooled
            c.append(n)
        return (c,)
```