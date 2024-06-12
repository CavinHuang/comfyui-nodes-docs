# Documentation
- Class name: ModelMergeSDXL
- Category: Model Merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

ModelMergeSDXL节点旨在将多个模型整合为一个统一的结构，允许进行复杂的交互并提高性能。它专注于以一种方式合并不同的模型，这种方式既保留了它们各自的特性，又实现了集体功能。

# Input types
## Required
- model1
    - ‘model1’参数是要合并的第一个模型，对合并后模型的初始结构至关重要。它为整合过程设定了基础，并影响着统一模型的最终能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - ‘model2’参数代表要合并的第二个模型，它补充了第一个模型，并对合并模型的整体复杂性和性能有所贡献。其整合是实现期望功能的关键。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- time_embed.
    - ‘time_embed.’参数允许将时间动态纳入模型中，影响模型处理和解释基于时间的数据的方式。对于时间敏感的应用来说，它是一个可选但重要的特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.
    - ‘input_blocks.’参数是九个FLOAT值的集合，定义了输入层的转换块。每个索引‘i’在0到8的范围内代表一个独特的块，有助于初始数据处理。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- middle_block.
    - ‘middle_block.’参数由三个FLOAT值组成，每个值对应模型中间层的一个块。这些块对中间处理步骤至关重要，影响模型学习和泛化的能力。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- output_blocks.
    - ‘output_blocks.’参数包括九个FLOAT值，用于配置输出层的转换块。与‘input_blocks.’类似，每个索引‘i’从0到8指定一个块，该块形成模型的最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- out.
    - ‘out.’参数是一个FLOAT值，代表合并模型的最终输出配置。它用于根据集成模型的特性微调模型的预测或结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 'merged_model'输出是合并过程的结果，包含了输入模型的组合功能。它是进一步分析或在各种应用中部署的关键组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class ModelMergeSDXL(comfy_extras.nodes_model_merging.ModelMergeBlocks):

    @classmethod
    def INPUT_TYPES(s):
        arg_dict = {'model1': ('MODEL',), 'model2': ('MODEL',)}
        argument = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})
        arg_dict['time_embed.'] = argument
        arg_dict['label_emb.'] = argument
        for i in range(9):
            arg_dict['input_blocks.{}'.format(i)] = argument
        for i in range(3):
            arg_dict['middle_block.{}'.format(i)] = argument
        for i in range(9):
            arg_dict['output_blocks.{}'.format(i)] = argument
        arg_dict['out.'] = argument
        return {'required': arg_dict}
```