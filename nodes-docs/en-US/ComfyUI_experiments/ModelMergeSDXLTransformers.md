---
tags:
- ModelMerge
---

# ModelMergeSDXLTransformers
## Documentation
- Class name: `ModelMergeSDXLTransformers`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging the transformer blocks of two SDXL models, allowing for intricate customization of model behavior by adjusting the influence of specific transformer components across the models.
## Input types
### Required
- **`model1`**
    - The first SDXL model to be merged. It serves as the base model for the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second SDXL model to be merged. Its transformer blocks can be selectively blended into the first model.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`time_embed.`**
    - Adjusts the influence of the time embedding component in the merging process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Adjusts the influence of the label embedding component in the merging process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.j.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.`**
    - Adjusts the influence of the i-th middle block in the merging process. The index i ranges from 0 to 2.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.transformer_blocks.j.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`out.`**
    - Adjusts the final output of the merging process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting model after merging the specified components of the two SDXL models.
    - Python dtype: `comfy.model_base.Model`
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
