# Documentation
- Class name: ModelMergeSDXLTransformers
- Category: model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

ModelMergeSDXLTransformers节点旨在将多个模型融合成一个统一的结构，利用基于变换器的架构。它的目的是协调各个模型的功能，通过复杂的融合过程提高整体性能。

# Input types
## Required
- model1
    - ‘model1’参数是要合并的第一个模型，对组合模型的初始结构至关重要。它为整合过程设定了基础，显著影响最终模型的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - ‘model2’参数代表要合并的第二个模型，在合并模型的最终配置中起着关键作用。它与‘model1’的整合对于实现期望的性能提升至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- input_blocks
    - ‘input_blocks’参数是定义模型内初始变换块的参数集合。每个块都是可调的，有助于模型有效处理输入数据。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Union[float, Dict[str, float]]]
- middle_block
    - ‘middle_block’参数包括一组位于模型输入和输出部分之间的变换块。它在进一步完善模型的处理能力方面起着重要作用。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Dict[str, float]]
- output_blocks
    - ‘output_blocks’参数由构成模型最后阶段的变换块组成。这些块在决定模型输出质量和整体预测能力方面至关重要。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Union[float, Dict[str, float]]]
- out
    - ‘out’参数用于调整模型的最终输出层。它对于微调模型的预测以满足特定要求很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - ‘merged_model’输出代表了合并过程中产生的集成模型。它包含了原始模型的组合能力和学习到的特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ModelMergeSDXLTransformers(comfy_extras.nodes_model_merging.ModelMergeBlocks):

    @classmethod
    def INPUT_TYPES(s):
        arg_dict = {'model1': ('MODEL',), 'model2': ('MODEL',)}
        argument = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})
        arg_dict['time_embed.'] = argument
        arg_dict['label_emb.'] = argument
        transformers = {4: 2, 5: 2, 7: 10, 8: 10}
        for i in range(9):
            arg_dict['input_blocks.{}.0.'.format(i)] = argument
            if i in transformers:
                arg_dict['input_blocks.{}.1.'.format(i)] = argument
                for j in range(transformers[i]):
                    arg_dict['input_blocks.{}.1.transformer_blocks.{}.'.format(i, j)] = argument
        for i in range(3):
            arg_dict['middle_block.{}.'.format(i)] = argument
            if i == 1:
                for j in range(10):
                    arg_dict['middle_block.{}.transformer_blocks.{}.'.format(i, j)] = argument
        transformers = {3: 2, 4: 2, 5: 2, 6: 10, 7: 10, 8: 10}
        for i in range(9):
            arg_dict['output_blocks.{}.0.'.format(i)] = argument
            t = 8 - i
            if t in transformers:
                arg_dict['output_blocks.{}.1.'.format(i)] = argument
                for j in range(transformers[t]):
                    arg_dict['output_blocks.{}.1.transformer_blocks.{}.'.format(i, j)] = argument
        arg_dict['out.'] = argument
        return {'required': arg_dict}
```