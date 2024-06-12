# Documentation
- Class name: CR_ConditioningMixer
- Category: Comfyroll/Essential/Core
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ConditioningMixer节点旨在混合或组合不同的条件输入。它为合并或平均条件数据提供了一种方法，这对于某些机器学习应用至关重要，其中输入条件是模型性能的关键因素。节点的功能被抽象化以确保灵活性，允许用户选择组合、平均或连接条件输入以实现所需的结果。

# Input types
## Required
- conditioning_1
    - 第一个条件输入对于节点的操作至关重要，因为它代表了将与另一个条件输入操作或组合的主要数据源之一。它在确定节点的最终输出中起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- conditioning_2
    - 第二个条件输入是节点功能的另一个关键元素。它与第一个条件输入一起使用，根据选定的混合方法创建混合或混合输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- mix_method
    - 混合方法参数定义了如何组合条件输入。它是节点操作的关键决定因素，允许使用不同的策略，如组合、平均或连接输入。
    - Comfy dtype: COMBO['Combine', 'Average', 'Concatenate']
    - Python dtype: str
## Optional
- average_strength
    - 当混合方法设置为'Average'时，使用平均强度参数。它控制两个条件输入之间的混合比例，根据指定的强度影响最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONDITIONING
    - 输出条件是将所选混合方法应用于输入条件的结果。它包含了准备好供机器学习管道中进一步使用的综合或处理过的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- show_help
    - show_help输出提供指向节点文档的URL链接。它是用户寻求有关如何有效使用节点的更多信息的有用参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ConditioningMixer:

    @classmethod
    def INPUT_TYPES(cls):
        mix_methods = ['Combine', 'Average', 'Concatenate']
        return {'required': {'conditioning_1': ('CONDITIONING',), 'conditioning_2': ('CONDITIONING',), 'mix_method': (mix_methods,), 'average_strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING', 'STRING')
    RETURN_NAMES = ('CONDITIONING', 'show_help')
    FUNCTION = 'conditioning'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def conditioning(self, mix_method, conditioning_1, conditioning_2, average_strength):
        conditioning_from = conditioning_1
        conditioning_to = conditioning_2
        conditioning_to_strength = average_strength
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-conditioning-mixer'
        if mix_method == 'Combine':
            return (conditioning_1 + conditioning_2, show_help)
        if mix_method == 'Average':
            out = []
            if len(conditioning_from) > 1:
                print('Warning: ConditioningAverage conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.')
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
            return (out, show_help)
        if mix_method == 'Concatenate':
            out = []
            if len(conditioning_from) > 1:
                print('Warning: ConditioningConcat conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.')
            cond_from = conditioning_from[0][0]
            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from), 1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)
            return (out, show_help)
```