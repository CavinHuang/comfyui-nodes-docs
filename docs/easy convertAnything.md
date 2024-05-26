# Documentation
- Class name: ConvertAnything
- Category: EasyUse/Logic
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点能够将给定的输入转换为指定的输出类型，为数据转换任务提供一种多功能的解决方案。它通过解释输入并根据用户的选择将其转换为所需的类别（如字符串、整数、浮点数或布尔值）来执行操作。

# Input types
## Required
- anything
    - ‘anything’参数至关重要，它代表了要转换的输入。它在节点操作中的作用是提供将经历转换过程的数据。
    - Comfy dtype: *
    - Python dtype: Union[str, int, float, bool, torch.Tensor, np.ndarray, Decimal, List, Tuple, Dict[Any, Any]]
- output_type
    - ‘output_type’参数决定了转换过程期望的结果。它在指导节点产生正确类型的输出中至关重要。
    - Comfy dtype: COMBO[string,int,float,boolean]
    - Python dtype: Union[str, int, float, bool]

# Output types
- *
    - 这个节点的输出是转换后的数据，反映了输入转换为指定类型后的结果。
    - Comfy dtype: *
    - Python dtype: Union[str, int, float, bool, torch.Tensor, np.ndarray, Decimal, List, Tuple, Dict[Any, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConvertAnything:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'anything': (AlwaysEqualProxy('*'),), 'output_type': (['string', 'int', 'float', 'boolean'], {'default': 'string'})}}
    RETURN_TYPES = ((AlwaysEqualProxy('*'),),)
    RETURN_NAMES = ('*',)
    OUTPUT_NODE = True
    FUNCTION = 'convert'
    CATEGORY = 'EasyUse/Logic'

    def convert(self, *args, **kwargs):
        print(kwargs)
        anything = kwargs['anything']
        output_type = kwargs['output_type']
        params = None
        if output_type == 'string':
            params = str(anything)
        elif output_type == 'int':
            params = int(anything)
        elif output_type == 'float':
            params = float(anything)
        elif output_type == 'boolean':
            params = bool(anything)
        return (params,)
```