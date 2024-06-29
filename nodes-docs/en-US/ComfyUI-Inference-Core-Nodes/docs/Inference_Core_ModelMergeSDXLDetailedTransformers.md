---
tags:
- ModelMerge
---

# Inference_Core_ModelMergeSDXLDetailedTransformers
## Documentation
- Class name: `Inference_Core_ModelMergeSDXLDetailedTransformers`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two SDXL transformer models, incorporating detailed configuration options for transformer blocks within the model architecture. It enables precise adjustments and fine-tuning of transformer parameters across various sections of the input, middle, and output blocks, facilitating enhanced model integration and performance optimization.
## Input types
### Required
- **`model1`**
    - One of the models to be merged, serving as a primary component in the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model2`**
    - The second model to be merged, serving as the secondary component in the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`time_embed.`**
    - A parameter for adjusting the time embedding layers' weights in the merging process, affecting the temporal dynamics of the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - A parameter for adjusting the label embedding layers' weights in the merging process, influencing how labels are represented in the merged model.
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
    - Adjusts the weights for the query transformation in the second attention mechanism of transformer blocks within input blocks. The indices i, j, and k represent the input block number, the sub-block within the input block (if applicable), and the transformer block number, respectively, allowing for precise control over specific components of the model architecture.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
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
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
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
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The merged model, optimized through detailed transformer parameter adjustments for improved performance and integration.
    - Python dtype: `torch.nn.Module`
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
