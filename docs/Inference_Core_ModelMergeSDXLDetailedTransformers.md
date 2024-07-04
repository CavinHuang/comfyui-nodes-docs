
# Documentation
- Class name: Inference_Core_ModelMergeSDXLDetailedTransformers
- Category: advanced/model_merging
- Output node: False

该节点专门用于融合两个SDXL transformer模型，同时提供了详细的配置选项来调整模型架构中的transformer块。它允许对输入、中间和输出块中各个部分的transformer参数进行精确调整和微调，从而实现增强的模型集成和性能优化。

# Input types
## Required
- model1
    - 要融合的其中一个模型，作为融合过程的主要组成部分。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 要融合的第二个模型，作为融合过程的次要组成部分。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- time_embed.
    - 用于调整融合过程中时间嵌入层权重的参数，影响融合模型的时间动态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label_emb.
    - 用于调整融合过程中标签嵌入层权重的参数，影响融合模型中标签的表示方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.i.j.
    - 输入块的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.norm1
    - 输入块中transformer块的第一个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn1.to_q
    - 输入块中transformer块第一个注意力机制的查询变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn1.to_k
    - 输入块中transformer块第一个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn1.to_v
    - 输入块中transformer块第一个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn1.to_out
    - 输入块中transformer块第一个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.ff.net
    - 输入块中transformer块前馈网络的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.norm2
    - 输入块中transformer块的第二个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn2.to_q
    - 调整输入块中transformer块第二个注意力机制的查询变换权重。索引i、j和k分别表示输入块编号、输入块内的子块编号（如适用）和transformer块编号，允许精确控制模型架构的特定组件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.i.j.transformer_blocks.k.attn2.to_k
    - 输入块中transformer块第二个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn2.to_v
    - 输入块中transformer块第二个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.attn2.to_out
    - 输入块中transformer块第二个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- input_blocks.i.j.transformer_blocks.k.norm3
    - 输入块中transformer块的第三个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.
    - 中间块的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.norm1
    - 中间块中transformer块的第一个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn1.to_q
    - 中间块中transformer块第一个注意力机制的查询变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn1.to_k
    - 中间块中transformer块第一个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn1.to_v
    - 中间块中transformer块第一个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn1.to_out
    - 中间块中transformer块第一个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.ff.net
    - 中间块中transformer块前馈网络的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.norm2
    - 中间块中transformer块的第二个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn2.to_q
    - 中间块中transformer块第二个注意力机制的查询变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn2.to_k
    - 中间块中transformer块第二个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn2.to_v
    - 中间块中transformer块第二个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.attn2.to_out
    - 中间块中transformer块第二个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- middle_block.i.transformer_blocks.j.norm3
    - 中间块中transformer块的第三个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.
    - 输出块的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.norm1
    - 输出块中transformer块的第一个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn1.to_q
    - 输出块中transformer块第一个注意力机制的查询变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn1.to_k
    - 输出块中transformer块第一个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn1.to_v
    - 输出块中transformer块第一个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn1.to_out
    - 输出块中transformer块第一个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.ff.net
    - 输出块中transformer块前馈网络的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.norm2
    - 输出块中transformer块的第二个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn2.to_q
    - 输出块中transformer块第二个注意力机制的查询变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn2.to_k
    - 输出块中transformer块第二个注意力机制的键变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn2.to_v
    - 输出块中transformer块第二个注意力机制的值变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.attn2.to_out
    - 输出块中transformer块第二个注意力机制的输出变换调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- output_blocks.i.j.transformer_blocks.k.norm3
    - 输出块中transformer块的第三个归一化层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- out.
    - 输出层的调整参数。
    - Comfy dtype: FLOAT
    - Python dtype: unknown

# Output types
- model
    - 通过详细的transformer参数调整优化后的融合模型，以提高性能和集成效果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSDXLDetailedTransformers(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    @classmethod
    def INPUT_TYPES(s):
        arg_dict = { "model1": ("MODEL",),
                              "model2": ("MODEL",)}

        argument = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01})

        arg_dict["time_embed."] = argument
        arg_dict["label_emb."] = argument

        transformers = {4: 2, 5:2, 7:10, 8:10}
        transformers_args = ["norm1", "attn1.to_q", "attn1.to_k", "attn1.to_v", "attn1.to_out", "ff.net", "norm2", "attn2.to_q", "attn2.to_k", "attn2.to_v", "attn2.to_out", "norm3"]

        for i in range(9):
            arg_dict["input_blocks.{}.0.".format(i)] = argument
            if i in transformers:
                arg_dict["input_blocks.{}.1.".format(i)] = argument
                for j in range(transformers[i]):
                    for x in transformers_args:
                        arg_dict["input_blocks.{}.1.transformer_blocks.{}.{}".format(i, j, x)] = argument

        for i in range(3):
            arg_dict["middle_block.{}.".format(i)] = argument
            if i == 1:
                for j in range(10):
                    for x in transformers_args:
                        arg_dict["middle_block.{}.transformer_blocks.{}.{}".format(i, j, x)] = argument

        transformers = {3:2, 4: 2, 5:2, 6:10, 7:10, 8:10}
        for i in range(9):
            arg_dict["output_blocks.{}.0.".format(i)] = argument
            t = 8 - i
            if t in transformers:
                arg_dict["output_blocks.{}.1.".format(i)] = argument
                for j in range(transformers[t]):
                    for x in transformers_args:
                        arg_dict["output_blocks.{}.1.transformer_blocks.{}.{}".format(i, j, x)] = argument

        arg_dict["out."] = argument

        return {"required": arg_dict}

```
