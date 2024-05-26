# Documentation
- Class name: WAS_Latent_Size_To_Number
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Latent_Size_To_Number节点的'latent_width_height'方法旨在从给定的张量中提取并提供宽度和高度维度，该张量表示潜在空间数据。这对于需要空间维度以进行进一步处理或分析的操作在WAS套件中至关重要。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它作为包含潜在空间数据的输入张量。节点依赖此张量来计算宽度和高度维度，这对于后续的数值操作或分析至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor]

# Output types
- tensor_w_num
    - “tensor_w_num”输出参数代表输入张量空间维度的宽度。对于需要知道张量宽度以进行进一步处理的应用程序来说，它是重要的。
    - Comfy dtype: INT
    - Python dtype: int
- tensor_h_num
    - “tensor_h_num”输出参数表示输入张量空间维度的高度。它在需要张量高度以进行后续任务的应用程序中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- width_float
    - “width_float”输出以浮点格式提供输入张量的宽度。这对于需要张量宽度的小数精度的算法来说很有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- height_float
    - “height_float”输出以浮点精度提供输入张量的高度。它特别适用于需要张量高度的准确小数表示的应用程序。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Latent_Size_To_Number:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'samples': ('LATENT',)}}
    RETURN_TYPES = ('NUMBER', 'NUMBER', 'FLOAT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('tensor_w_num', 'tensor_h_num')
    FUNCTION = 'latent_width_height'
    CATEGORY = 'WAS Suite/Number/Operations'

    def latent_width_height(self, samples):
        size_dict = {}
        i = 0
        for tensor in samples['samples'][0]:
            if not isinstance(tensor, torch.Tensor):
                cstr(f'Input should be a torch.Tensor').error.print()
            shape = tensor.shape
            tensor_height = shape[-2]
            tensor_width = shape[-1]
            size_dict.update({i: [tensor_width, tensor_height]})
        return (size_dict[0][0], size_dict[0][1], float(size_dict[0][0]), float(size_dict[0][1]), size_dict[0][0], size_dict[0][1])
```