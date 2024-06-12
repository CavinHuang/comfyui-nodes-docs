# Documentation
- Class name: ModelMergeSDXLDetailedTransformers
- Category: model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

ModelMergeSDXLDetailedTransformers 节点旨在将多个模型融合为一个单一的、统一的结构。它通过合并不同的模型组件，如嵌入层和变换器块，来创建一个具有改进性能的增强型模型。该节点强调模型的无缝集成，以利用它们的综合优势。

# Input types
## Required
- model1
    - 参数 'model1' 至关重要，因为它代表了要在节点内合并的第一个模型。它与其他模型的集成对于合并模型的整体功能和性能至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 参数 'model2' 是合并过程中的另一个关键组件，代表要组合的第二个模型。它对于实现最终合并模型的预期能力具有重要意义。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- time_embed.
    - 参数 'time_embed.' 允许将基于时间的嵌入纳入模型，这对于对数据的时间方面敏感的任务可能很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks
    - 参数 'input_blocks' 是一个复杂的结构，包含多个子参数，每个子参数代表模型输入部分中的不同变换器块。这些块在处理输入数据中起着关键作用，并根据模型的需求进行配置。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Union[float, torch.Tensor]]
- middle_block
    - 参数 'middle_block' 指的是模型的中间部分，在这里可以应用额外的层或操作。它在模型处理和转换数据然后传递到输出层之前的能力中起着至关重要的作用。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Union[float, torch.Tensor]]
- output_blocks
    - 参数 'output_blocks' 定义了模型的输出部分，由各种变换器块组成，负责根据处理后的数据生成最终的预测或输出。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: Dict[str, Union[float, torch.Tensor]]
- out.
    - 参数 'out.' 表示合并模型的最终输出，它包含了所有处理步骤完成后的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 输出 'merged_model' 代表合并过程产生的最终集成模型。它包含了输入模型的组合能力，提高了下游任务的整体性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ModelMergeSDXLDetailedTransformers(comfy_extras.nodes_model_merging.ModelMergeBlocks):

    @classmethod
    def INPUT_TYPES(s):
        arg_dict = {'model1': ('MODEL',), 'model2': ('MODEL',)}
        argument = ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})
        arg_dict['time_embed.'] = argument
        arg_dict['label_emb.'] = argument
        transformers = {4: 2, 5: 2, 7: 10, 8: 10}
        transformers_args = ['norm1', 'attn1.to_q', 'attn1.to_k', 'attn1.to_v', 'attn1.to_out', 'ff.net', 'norm2', 'attn2.to_q', 'attn2.to_k', 'attn2.to_v', 'attn2.to_out', 'norm3']
        for i in range(9):
            arg_dict['input_blocks.{}.0.'.format(i)] = argument
            if i in transformers:
                arg_dict['input_blocks.{}.1.'.format(i)] = argument
                for j in range(transformers[i]):
                    for x in transformers_args:
                        arg_dict['input_blocks.{}.1.transformer_blocks.{}.{}'.format(i, j, x)] = argument
        for i in range(3):
            arg_dict['middle_block.{}.'.format(i)] = argument
            if i == 1:
                for j in range(10):
                    for x in transformers_args:
                        arg_dict['middle_block.{}.transformer_blocks.{}.{}'.format(i, j, x)] = argument
        transformers = {3: 2, 4: 2, 5: 2, 6: 10, 7: 10, 8: 10}
        for i in range(9):
            arg_dict['output_blocks.{}.0.'.format(i)] = argument
            t = 8 - i
            if t in transformers:
                arg_dict['output_blocks.{}.1.'.format(i)] = argument
                for j in range(transformers[t]):
                    for x in transformers_args:
                        arg_dict['output_blocks.{}.1.transformer_blocks.{}.{}'.format(i, j, x)] = argument
        arg_dict['out.'] = argument
        return {'required': arg_dict}
```