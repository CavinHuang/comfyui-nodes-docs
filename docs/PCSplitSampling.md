# Documentation
- Class name: PCSplitSampling
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

PCSplitSampling节点旨在通过启用或禁用一种称为提示控制分割采样的特定采样技术来修改给定模型。该技术对于控制模型的生成过程至关重要，允许实现更精细和针对性的输出。通过应用此节点，用户可以轻松切换采样方法以实现所需的结果，而无需更改底层模型架构。

# Input types
## Required
- model
    - ‘model’参数至关重要，因为它代表了将要接受采样技术调整的机器学习模型。它是节点操作的核心组件，其修改将直接影响模型的生成能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- split_sampling
    - ‘split_sampling’参数决定是否为模型启用提示控制分割采样技术。这个切换直接影响模型对数据采样的方法，对于实现模型预测或生成中的特定结果可能至关重要。
    - Comfy dtype: COMBO['enable', 'disable']
    - Python dtype: str

# Output types
- model
    - 输出‘model’是应用了用户选择的提示控制分割采样功能的输入模型的修改版本。这允许模型在后续任务中使用所需的采样行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class PCSplitSampling:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'split_sampling': (['enable', 'disable'],)}}
    RETURN_TYPES = ('MODEL',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, model, split_sampling):
        model = clone_model(model)
        model.model_options['pc_split_sampling'] = split_sampling == 'enable'
        return (model,)
```