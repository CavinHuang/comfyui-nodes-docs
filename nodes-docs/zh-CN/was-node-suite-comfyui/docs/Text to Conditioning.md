# Documentation
- Class name: WAS_Text_to_Conditioning
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_to_Conditioning节点旨在将文本输入转换为可用于生成模型中的条件格式。它利用文本编码器的能力来处理文本，并创建一个可以引导生成过程的条件信号。该节点抽象了文本编码的复杂性，为用户提供了一个简单的接口，将文本元素集成到他们的工作流程中。

# Input types
## Required
- clip
    - ‘clip’参数对于文本到条件的过程至关重要，因为它代表了文本将与之关联的上下文信息。这个参数对于节点的执行至关重要，因为它构成了编码过程的基础。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.sd.CLIP]
- text
    - ‘text’参数是一个强制性输入，它提供了要被编码为条件格式的文本内容。它的重要性在于它直接影响到输出的条件，这被用来指导生成过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- encoded_conditioning
    - ‘encoded_conditioning’输出是输入文本的加工版本，被转换成适合用于条件生成模型的格式。它以一种可以被模型用于生成输出的方式来封装文本的语义内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_to_Conditioning:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'clip': ('CLIP',), 'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'text_to_conditioning'
    CATEGORY = 'WAS Suite/Text/Operations'

    def text_to_conditioning(self, clip, text):
        encoder = nodes.CLIPTextEncode()
        encoded = encoder.encode(clip=clip, text=text)
        return (encoded[0], {'ui': {'string': text}})
```