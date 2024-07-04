
# Documentation
- Class name: Inference_Core_ModelMergeSDXLTransformers
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点专门用于合并两个SDXL模型架构，通过混合它们的transformer块来创建混合模型，从而利用两个输入模型的优势。它通过为每个transformer块组件提供可调节的参数，实现了对合并过程的精细控制。

# Input types
## Required
- model1
    - 要合并的第一个SDXL模型。它作为合并过程的主要来源之一，将其transformer块贡献给混合模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 要合并的第二个SDXL模型。它通过提供额外的transformer块来补充第一个模型，从而丰富混合模型的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- time_embed.
    - 时间嵌入层的可调参数，允许将时间方面的信息自定义集成到合并模型中。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- label_emb.
    - 用于微调标签嵌入层的参数，促进将标签信息巧妙地融入混合模型中。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- input_blocks.i.j.
    - 模型输入部分transformer块的可调参数，允许自定义混合模型的特征。索引i和j分别代表块和子块级别，提供了层次化的控制机制。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- input_blocks.i.j.transformer_blocks.k.
    - 用于微调输入部分子块内个别transformer块的参数，提供了对transformer特征集成的精确控制。索引i、j和k分别表示块、子块和transformer块级别。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- middle_block.i.
    - 控制模型中间部分transformer块的参数，实现两个模型特征的均衡集成。索引i代表中间块结构内的级别。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- middle_block.i.transformer_blocks.j.
    - 用于调整中间部分特定级别内transformer块的参数，允许对合并过程进行详细定制。索引i和j分别表示中间块级别和transformer块级别。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- output_blocks.i.j.
    - 模型输出部分transformer块的可调参数，实现对最终模型输出特征的精确控制。索引i和j分别代表输出结构中的块和子块级别。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- output_blocks.i.j.transformer_blocks.k.
    - 用于微调输出部分子块内个别transformer块的参数，提供对输出特征的详细控制。索引i、j和k分别表示块、子块和transformer块级别。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]
- out.
    - 控制最终输出层调整的参数，使得可以微调合并模型的整体输出特征。
    - Comfy dtype: FLOAT
    - Python dtype: Dict[str, float]

# Output types
- model
    - 根据指定参数合并两个输入模型后得到的结果模型，包含了来自两个输入模型的元素。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSDXLTransformers(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    @classmethod
    def INPUT_TYPES(s):
        arg_dict = { "model1": ("MODEL",),
                              "model2": ("MODEL",)}

        argument = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01})

        arg_dict["time_embed."] = argument
        arg_dict["label_emb."] = argument

        transformers = {4: 2, 5:2, 7:10, 8:10}

        for i in range(9):
            arg_dict["input_blocks.{}.0.".format(i)] = argument
            if i in transformers:
                arg_dict["input_blocks.{}.1.".format(i)] = argument
                for j in range(transformers[i]):
                    arg_dict["input_blocks.{}.1.transformer_blocks.{}.".format(i, j)] = argument

        for i in range(3):
            arg_dict["middle_block.{}.".format(i)] = argument
            if i == 1:
                for j in range(10):
                    arg_dict["middle_block.{}.transformer_blocks.{}.".format(i, j)] = argument

        transformers = {3:2, 4: 2, 5:2, 6:10, 7:10, 8:10}
        for i in range(9):
            arg_dict["output_blocks.{}.0.".format(i)] = argument
            t = 8 - i
            if t in transformers:
                arg_dict["output_blocks.{}.1.".format(i)] = argument
                for j in range(transformers[t]):
                    arg_dict["output_blocks.{}.1.transformer_blocks.{}.".format(i, j)] = argument

        arg_dict["out."] = argument

        return {"required": arg_dict}

```
