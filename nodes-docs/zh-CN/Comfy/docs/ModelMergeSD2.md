# Documentation
- Class name: ModelMergeSD1
- Category: advanced/model_merging/model_specific
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelMergeSD1节点旨在将多个模型融合到一个统一的框架中。它专门用于合并特定于模型的组件，允许进行无缝且高效的集成过程。该节点在高级模型合并中发挥着关键作用，增强了集成模型的功能和性能。

# Input types
## Required
- model1
    - ‘model1’参数至关重要，因为它代表了要合并到框架中的第一个模型。其集成是实现节点合并模型目的的基本步骤。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - ‘model2’参数表示要合并的第二个模型。它是合并过程中的关键组件，与第一个模型相辅相成，形成一个全面模型结构。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- time_embed.
    - ‘time_embed.’参数用于将与时间相关的信息嵌入到模型中。它影响合并模型内如何捕获时间动态，增强它们处理时间敏感数据的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.
    - 对于范围在0到11的每个索引‘i’，‘input_blocks.{}.’表示一个处理输入数据的块。这些块在模型合并的初始阶段至关重要，为后续处理塑造输入特征。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- middle_block.
    - ‘middle_block.{}.’参数，其中‘i’的范围是0到2，表示模型内的中间处理块。这些块在模型整合和转换合并架构中的数据方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- output_blocks.
    - 与‘input_blocks.’类似，‘output_blocks.{}.’中‘i’的范围是0到11，代表合并模型的最终处理阶段。这些块对于提炼模型的输出以满足特定要求至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- out.
    - ‘out.’参数定义了合并模型的最终输出配置。它很重要，因为它决定了模型预测或结果的格式和结构。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class ModelMergeSD1(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    CATEGORY = 'advanced/model_merging/model_specific'

    @classmethod
    def INPUT_TYPES(s):
        arg_dict = {'model1': ('MODEL',), 'model2': ('MODEL',)}
        argument = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})
        arg_dict['time_embed.'] = argument
        arg_dict['label_emb.'] = argument
        for i in range(12):
            arg_dict['input_blocks.{}.'.format(i)] = argument
        for i in range(3):
            arg_dict['middle_block.{}.'.format(i)] = argument
        for i in range(12):
            arg_dict['output_blocks.{}.'.format(i)] = argument
        arg_dict['out.'] = argument
        return {'required': arg_dict}
```