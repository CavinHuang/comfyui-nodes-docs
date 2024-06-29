# Documentation
- Class name: ModelMergeSD1
- Category: advanced/model_merging/model_specific
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelMergeSD1节点旨在将多个模型无缝集成到一个统一的框架中。它通过合并不同的模型架构实现这一点，允许结合它们的独特优势和能力。此节点在高级模型合并中发挥着关键作用，特别适用于特定于模型的集成场景，增强了整个系统的性能和适应性。

# Input types
## Required
- model1
    - ‘model1’参数是要在节点内合并的第一个模型。它对于定义合并模型的初始结构和行为至关重要。选择此模型将显著影响节点的执行和模型集成过程的最终结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - ‘model2’参数代表要集成到合并框架中的第二个模型。它的包含对于扩展结果模型的能力至关重要。将‘model2’与‘model1’集成的目的是通过对它们各自特征的组合，创建一个更加健壮和多功能的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- time_embed.
    - ‘time_embed.’参数用于调整模型中的时间嵌入。它对于需要时间理解或需要处理时间序列数据的模型特别重要。分配给此参数的值可以微调模型对时间相关特征的敏感性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.
    - 对于范围在0到11的每个索引‘i’，‘input_blocks.{}.’表示可以调整以修改模型内输入块的行为的参数。这些参数对于微调模型如何处理输入至关重要，并且可以极大地影响节点的执行以及合并模型预测的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- middle_block.
    - ‘middle_block.{}.’参数，其中‘i’的范围是0到2，允许自定义模型中的中间块。这些块在模型的中间处理步骤中很关键，可以显著影响节点的性能和模型输出的准确性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- output_blocks.
    - 与‘input_blocks.’类似，对于范围在0到11的每个索引‘i’，‘output_blocks.{}.’是一个可以微调模型输出块的参数。调整这些参数对于控制最终预测并确保它们与期望的结果一致至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- out.
    - ‘out.’参数用于控制合并模型的最终输出。这是一个重要的调整，可以直接影响节点的结果，允许根据特定要求定制模型的预测。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - ‘merged_model’输出代表由节点执行的集成过程产生的组合模型。它封装了两个输入模型的功能，并且对于进一步分析或在各种应用中的部署具有重要意义。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

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