---
tags:
- ModelMerge
---

# Inference_Core_ModelMergeSDXLTransformers
## Documentation
- Class name: `Inference_Core_ModelMergeSDXLTransformers`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two SDXL model architectures by blending their transformer blocks, allowing for the creation of hybrid models that leverage the strengths of both input models. It provides fine-grained control over the merging process through adjustable parameters for each transformer block component.
## Input types
### Required
- **`model1`**
    - The first SDXL model to be merged. It serves as one of the primary sources for the merging process, contributing its transformer blocks to the hybrid model.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model2`**
    - The second SDXL model to be merged. It complements the first model by providing additional transformer blocks, enriching the hybrid model's capabilities.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`time_embed.`**
    - Adjustable parameters for the time embedding layers, allowing for customized integration of temporal aspects into the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`label_emb.`**
    - Parameters for fine-tuning the label embedding layers, facilitating a nuanced incorporation of label information into the hybrid model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`input_blocks.i.j.`**
    - Adjustable parameters for the transformer blocks within the input section of the models, allowing for customized blending of the models' features. The indices i and j represent the block and sub-block levels, respectively, providing a hierarchical control mechanism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`input_blocks.i.j.transformer_blocks.k.`**
    - Parameters for fine-tuning individual transformer blocks within the input section's sub-blocks, offering precise control over the integration of transformer features. The indices i, j, and k denote the block, sub-block, and transformer block levels, respectively.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`middle_block.i.`**
    - Controls for the transformer blocks in the middle section of the models, enabling a balanced integration of both models' characteristics. The index i represents the level within the middle block structure.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`middle_block.i.transformer_blocks.j.`**
    - Parameters for adjusting the transformer blocks within the middle section's specific level, allowing for detailed customization of the merging process. The indices i and j indicate the middle block level and the transformer block level, respectively.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`output_blocks.i.j.`**
    - Adjustable parameters for the transformer blocks within the output section of the models, facilitating precise control over the final model's output characteristics. The indices i and j represent the block and sub-block levels, respectively, in the output structure.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`output_blocks.i.j.transformer_blocks.k.`**
    - Parameters for fine-tuning individual transformer blocks within the output section's sub-blocks, offering detailed control over the output characteristics. The indices i, j, and k denote the block, sub-block, and transformer block levels, respectively.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
- **`out.`**
    - Controls for the final output layer adjustments, enabling fine-tuning of the merged model's overall output characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, float]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting merged model, incorporating elements from both input models according to the specified parameters.
    - Python dtype: `torch.nn.Module`
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
