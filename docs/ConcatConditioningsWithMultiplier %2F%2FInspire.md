# Documentation
- Class name: ConcatConditioningsWithMultiplier
- Category: InspirePack/__for_testing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

ConcatConditioningsWithMultiplier节点旨在通过将条件输入乘以指定因子来增强它们，允许在复杂工作流中调整条件强度。

# Input types
## Required
- conditioning1
    - 主要的条件输入是至关重要的，因为它构成了节点内部后续乘法和连接操作的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
## Optional
- multiplier1
    - 乘数参数对于调整条件输入的强度至关重要，使得节点的输出可以进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - 输出代表增强后的条件数据，它是原始输入与各自乘以因子的附加条件的组合。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]

# Usage tips
- Infra type: GPU

# Source code
```
class ConcatConditioningsWithMultiplier:

    @classmethod
    def INPUT_TYPES(s):
        flex_inputs = {}
        stack = inspect.stack()
        if stack[1].function == 'get_input_data':
            for x in range(0, 100):
                flex_inputs[f'multiplier{x}'] = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})
        else:
            flex_inputs['multiplier1'] = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})
        return {'required': {'conditioning1': ('CONDITIONING',)}, 'optional': flex_inputs}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/__for_testing'

    def doit(self, **kwargs):
        if 'ConditioningMultiplier_PoP' in nodes.NODE_CLASS_MAPPINGS:
            obj = nodes.NODE_CLASS_MAPPINGS['ConditioningMultiplier_PoP']()
        else:
            utils.try_install_custom_node('https://github.com/picturesonpictures/comfy_PoP', "To use 'ConcatConditioningsWithMultiplier' node, 'comfy_PoP' extension is required.")
            raise Exception("'comfy_PoP' node isn't installed.")
        conditioning_to = kwargs['conditioning1']
        conditioning_to = obj.multiply_conditioning_strength(conditioning=conditioning_to, multiplier=float(kwargs['multiplier1']))[0]
        out = None
        for (k, conditioning_from) in kwargs.items():
            if k == 'conditioning1' or not k.startswith('conditioning'):
                continue
            out = []
            if len(conditioning_from) > 1:
                print(f'Warning: ConcatConditioningsWithMultiplier {k} contains more than 1 cond, only the first one will actually be applied to conditioning1.')
            mkey = 'multiplier' + k[12:]
            multiplier = float(kwargs[mkey])
            conditioning_from = obj.multiply_conditioning_strength(conditioning=conditioning_from, multiplier=multiplier)[0]
            cond_from = conditioning_from[0][0]
            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from), 1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)
            conditioning_to = out
        if out is None:
            return (kwargs['conditioning1'],)
        else:
            return (out,)
```