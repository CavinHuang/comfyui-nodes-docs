
# Documentation
- Class name: Inference_Core_ModelMergeBlockNumber
- Category: advanced/model_merging
- Output node: False

Inference_Core_ModelMergeBlockNumber节点专门用于通过根据指定的混合比例来混合模型组件，从而实现两个模型的合并。它允许对模型不同部分的组合方式进行精细控制，有助于创建利用两个输入模型优势的混合模型。

# Input types
## Required
- model1
    - 要合并的第一个模型。它作为基础模型，第二个模型的元素将与之混合。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- model2
    - 要合并的第二个模型。该模型的元素将根据指定的比例混合到第一个模型中。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- time_embed.
    - 指定模型时间嵌入组件的混合比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label_emb.
    - 指定模型标签嵌入组件的混合比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- input_blocks.i.
    - 指定模型第i个输入块的混合比例。索引i的范围从0到11。
    - Comfy dtype: FLOAT
    - Python dtype: float
- middle_block.i.
    - 指定模型第i个中间块的混合比例。索引i的范围从0到2。
    - Comfy dtype: FLOAT
    - Python dtype: float
- output_blocks.i.
    - 指定模型第i个输出块的混合比例。索引i的范围从0到11。
    - Comfy dtype: FLOAT
    - Python dtype: float
- out.
    - 指定模型输出组件的混合比例。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 合并后的模型，是两个输入模型的混合体，其组件根据指定的比例进行混合。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeBlockNumber(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    @classmethod
    def INPUT_TYPES(s):
        arg_dict = { "model1": ("MODEL",),
                              "model2": ("MODEL",)}

        argument = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01})

        arg_dict["time_embed."] = argument
        arg_dict["label_emb."] = argument

        for i in range(12):
            arg_dict["input_blocks.{}.".format(i)] = argument

        for i in range(3):
            arg_dict["middle_block.{}.".format(i)] = argument

        for i in range(12):
            arg_dict["output_blocks.{}.".format(i)] = argument

        arg_dict["out."] = argument

        return {"required": arg_dict}

```
