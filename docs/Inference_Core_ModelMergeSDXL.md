
# Documentation
- Class name: Inference_Core_ModelMergeSDXL
- Category: advanced/model_merging
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_ModelMergeSDXL节点专门用于将两个不同的模型架构合并成一个统一的模型。它注重整合各种组件,如输入块、中间块和输出块,以及特定的transformer元素。这个过程旨在通过利用两个原始模型的优势来提升模型性能。

# Input types
## Required
- model1
    - 代表要合并的第一个模型,在组合模型的架构和输出中扮演关键角色。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 表示要合并的第二个模型,对塑造最终集成模型的能力同样重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- time_embed.
    - 调整时间嵌入层在合并模型中的影响,影响模型处理的时间方面。这个参数对于调整模型如何解释时间相关信息至关重要,直接影响模型的时间处理能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label_emb.
    - 修改标签嵌入层的影响,影响标签信息如何整合到模型中。这个参数对于调整标签数据的整合很关键,影响模型如何处理和利用标签信息。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.i
    - 控制两个模型的第i个输入块的混合,其中i从0到8,决定输入的初始处理。每个索引指定特定输入块的贡献,直接影响数据处理的初始阶段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- middle_block.i
    - 影响第i个中间块的贡献,其中i从0到2,对模型的中间计算至关重要。这些参数对于决定中间处理阶段的行为至关重要,影响模型的整体计算流程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- output_blocks.i
    - 影响第i个输出块的角色,其中i从0到8,影响最终输出生成。每个索引决定特定输出块对最终模型输出的影响,在输出特征中发挥重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- out.
    - 调整整体输出层的行为,微调最终模型输出特征。这个参数对于模型输出的最终调整至关重要,允许精确控制输出特征。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 由两个输入模型整合而成的合并模型,体现了两者的综合特征和能力。这个输出是一个新的、增强的模型,利用了输入模型的优势来实现更好的性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSDXL(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    @classmethod
    def INPUT_TYPES(s):
        arg_dict = { "model1": ("MODEL",),
                              "model2": ("MODEL",)}

        argument = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01})

        arg_dict["time_embed."] = argument
        arg_dict["label_emb."] = argument

        for i in range(9):
            arg_dict["input_blocks.{}".format(i)] = argument

        for i in range(3):
            arg_dict["middle_block.{}".format(i)] = argument

        for i in range(9):
            arg_dict["output_blocks.{}".format(i)] = argument

        arg_dict["out."] = argument

        return {"required": arg_dict}

```
