# Documentation
- Class name: ModelMergeBlockNumber
- Category: model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

ModelMergeBlockNumber节点旨在将多个模型合并为一个单一的、紧密的结构。它通过合并两个输入模型的指定块来实现这一点，确保生成的模型保持其组成部分的功能和性能。该节点在创建能够利用其组件优势的统一模型中起着关键作用。

# Input types
## Required
- model1
    - ‘model1’参数是要合并的第一个模型。它在确定最终合并模型的架构和功能方面起着关键作用。这个参数至关重要，因为它对输出模型的整体结构和性能有重大贡献。
    - Comfy dtype: MODEL
    - Python dtype: Any
- model2
    - ‘model2’参数表示要合并的第二个模型。它与‘model1’一样，对最终输出至关重要，影响合并模型的特性和性能。‘model1’和‘model2’的结合旨在创建一个比任何单独模型都更强大、更通用的模型。
    - Comfy dtype: MODEL
    - Python dtype: Any
## Optional
- time_embed.
    - ‘time_embed.’参数用于将与时间相关的信息嵌入到模型中。它对于需要时间上下文的模型特别重要。此参数允许模型考虑基于时间的特征，增强其预测能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks
    - 每个‘input_blocks.i.’参数，其中‘i’的范围从0到11，代表模型输入层中的一个块。这些块对于处理输入数据并为其准备进一步的模型阶段至关重要。这些块的配置可以显著影响模型学习和从输入数据泛化的能力。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: List[float]
- middle_block
    - ‘middle_block.i.’参数，对于‘i’的范围从0到2，对应于模型中间层中的块。这些块对于模型的中间处理步骤至关重要，影响模型在最终输出之前如何转换和利用输入数据。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: List[float]
- output_blocks
    - ‘output_blocks.i.’参数，其中‘i’的范围从0到11，定义了输出层块的配置。这些块负责将模型的内部表示转换为所需的输出格式。它们的设置对于模型产生准确和有意义的结果至关重要。
    - Comfy dtype: COMBO[FLOAT]
    - Python dtype: List[float]
- out.
    - ‘out.’参数指定了模型的最终输出配置。它是一个关键组件，决定了模型的预测或输出的结构。正确设置此参数确保模型的输出与预期的格式和要求一致。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label_emb.
    - ‘label_emb.’参数用于将标签信息嵌入到模型中。当模型需要理解并将其处理中的分类数据或类标签纳入时，这特别有用。嵌入增强了模型根据标签数据做出明智决策的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- merged_model
    - 'merged_model'输出代表合并过程生成的组合模型。它封装了输入模型的集成特性和功能，为预测任务提供了一个更加健壮和多功能的解决方案。
    - Comfy dtype: MODEL
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ModelMergeBlockNumber(comfy_extras.nodes_model_merging.ModelMergeBlocks):

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