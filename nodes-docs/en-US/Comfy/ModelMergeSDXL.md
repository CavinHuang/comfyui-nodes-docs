---
tags:
- ModelMerge
---

# ModelMergeSDXL
## Documentation
- Class name: `ModelMergeSDXL`
- Category: `advanced/model_merging/model_specific`
- Output node: `False`

ModelMergeSDXL is designed for advanced model merging operations, specifically tailored for handling large-scale models. It enables the precise blending of two models by adjusting the influence of each model's components across various blocks, including input, middle, and output blocks, as well as time embedding and label embedding features.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model for the merging operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model to be merged. Its components are selectively blended into the first model based on specified ratios.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`time_embed.`**
    - Adjusts the blending ratio for the time embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Adjusts the blending ratio for the label embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i`**
    - Adjusts the blending ratio for the ith input block of the models. The index i ranges from 0 to 8.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i`**
    - Adjusts the blending ratio for the ith middle block of the models. The index i ranges from 0 to 2.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i`**
    - Adjusts the blending ratio for the ith output block of the models. The index i ranges from 0 to 8.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Adjusts the blending ratio for the output components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The result of merging two models, incorporating the specified blending ratios across various components.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSDXL(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    CATEGORY = "advanced/model_merging/model_specific"

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
