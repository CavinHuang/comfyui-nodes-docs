---
tags:
- ModelMerge
---

# ModelMergeSDXLDetailedTransformers
## Documentation
- Class name: `ModelMergeSDXLDetailedTransformers`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two models with a focus on detailed transformer block adjustments. It allows for fine-tuning of the merging process by providing extensive control over transformer block parameters, enabling precise model customization and optimization.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model for the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model to be merged. Its parameters are used to augment or modify the first model based on the specified merging strategy.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`time_embed.`**
    - Adjusts the time embedding layer's contribution to the merged model, allowing for temporal aspects of the models to be fine-tuned.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Adjusts the label embedding layer's contribution to the merged model, enabling customization of how label information influences the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.j.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.norm1`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn1.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn1.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn1.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn1.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.ff.net`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.norm2`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn2.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn2.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn2.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.attn2.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`input_blocks.i.j.transformer_blocks.k.norm3`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.`**
    - Adjusts the contribution of the i-th middle block in the merged model, where i ranges from 0 to 2. This enables fine-tuning of the model's intermediate processing stages.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.transformer_blocks.j.norm1`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn1.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn1.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn1.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn1.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.ff.net`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.norm2`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn2.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn2.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn2.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.attn2.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`middle_block.i.transformer_blocks.j.norm3`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.norm1`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn1.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn1.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn1.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn1.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.ff.net`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.norm2`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn2.to_q`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn2.to_k`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn2.to_v`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.attn2.to_out`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`output_blocks.i.j.transformer_blocks.k.norm3`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`out.`**
    - Adjusts the final output layer's contribution to the merged model, enabling customization of the model's final output characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting model after merging, incorporating adjustments from both input models and specified transformer block parameters.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `CPU`
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
