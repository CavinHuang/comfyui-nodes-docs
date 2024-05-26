# Documentation
- Class name: CR_EncodeScheduledPrompts
- Category: Comfyroll/Animation/Prompt
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_EncodeScheduledPrompts 节点旨在管理动画序列中提示的编码。它根据指定的权重智能地混合当前提示和下一个提示，确保状态之间的平滑过渡。此节点对于创建连贯且内容丰富的动画至关重要。

# Input types
## Required
- clip
    - clip 参数至关重要，因为它代表了编码过程的核心输入。它是将被标记化和编码以生成提示的原始数据。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- current_prompt
    - current_prompt 参数作为当前动画中使用的文本输入。它是编码过程中的关键组成部分，因为它定义了过渡的起点。
    - Comfy dtype: STRING
    - Python dtype: str
- next_prompt
    - next_prompt 参数表示动画中将过渡到的即将到来的文本输入。它在确定提示编码的方向中起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - weight 参数用于控制当前提示和下一个提示的混合。它通过确定过渡的强度直接影响编码过程。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONDITIONING
    - CONDITIONING 输出代表已编码的提示，准备用于动画中。它是一个关键的输出，因为它为后续的动画步骤提供了必要的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以进一步协助和理解如何有效地使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_EncodeScheduledPrompts:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'current_prompt': ('STRING', {'multiline': True}), 'next_prompt': ('STRING', {'multiline': True}), 'weight': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING', 'STRING')
    RETURN_NAMES = ('CONDITIONING', 'show_help')
    FUNCTION = 'condition'
    CATEGORY = icons.get('Comfyroll/Animation/Prompt')

    def condition(self, clip, current_prompt, next_prompt, weight):
        tokens = clip.tokenize(str(next_prompt))
        (cond_from, pooled_from) = clip.encode_from_tokens(tokens, return_pooled=True)
        tokens = clip.tokenize(str(current_prompt))
        (cond_to, pooled_to) = clip.encode_from_tokens(tokens, return_pooled=True)
        print(weight)
        conditioning_to_strength = weight
        conditioning_from = [[cond_from, {'pooled_output': pooled_from}]]
        conditioning_to = [[cond_to, {'pooled_output': pooled_to}]]
        out = []
        if len(conditioning_from) > 1:
            print('Warning: Conditioning from contains more than 1 cond, only the first one will actually be applied to conditioning_to.')
        cond_from = conditioning_from[0][0]
        pooled_output_from = conditioning_from[0][1].get('pooled_output', None)
        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            pooled_output_to = conditioning_to[i][1].get('pooled_output', pooled_output_from)
            t0 = cond_from[:, :t1.shape[1]]
            if t0.shape[1] < t1.shape[1]:
                t0 = torch.cat([t0] + [torch.zeros((1, t1.shape[1] - t0.shape[1], t1.shape[2]))], dim=1)
            tw = torch.mul(t1, conditioning_to_strength) + torch.mul(t0, 1.0 - conditioning_to_strength)
            t_to = conditioning_to[i][1].copy()
            if pooled_output_from is not None and pooled_output_to is not None:
                t_to['pooled_output'] = torch.mul(pooled_output_to, conditioning_to_strength) + torch.mul(pooled_output_from, 1.0 - conditioning_to_strength)
            elif pooled_output_from is not None:
                t_to['pooled_output'] = pooled_output_from
            n = [tw, t_to]
            out.append(n)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-encode-scheduled-prompts'
        return (out, show_help)
```