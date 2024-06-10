---
tags:
- ModelMerge
---

# ModelMergeBlockNumber
## Documentation
- Class name: `ModelMergeBlockNumber`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two models by blending their components based on specified ratios for different parts of the models. It allows for fine-grained control over the merging process by enabling the adjustment of blend ratios for various blocks within the models.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model onto which patches from the second model are applied.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.ModelBase`
- **`model2`**
    - The second model to be merged. Key patches from this model are applied to the first model based on specified ratios.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.ModelBase`
- **`time_embed.`**
    - Specifies the blend ratio for the time embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Specifies the blend ratio for the label embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.`**
    - Specifies the blend ratio for each of the input blocks. The index 'i' ranges from 0 to 11, allowing for individual adjustment of 12 input blocks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.`**
    - Specifies the blend ratio for each of the middle blocks. The index 'i' ranges from 0 to 2, targeting 3 middle blocks for adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i.`**
    - Specifies the blend ratio for each of the output blocks. The index 'i' ranges from 0 to 11, enabling individual adjustment of 12 output blocks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Specifies the blend ratio for the final output components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The result of merging two models based on the specified blend ratios for various components.
    - Python dtype: `comfy.model_base.ModelBase`
## Usage tips
- Infra type: `CPU`
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
