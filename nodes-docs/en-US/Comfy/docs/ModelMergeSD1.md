---
tags:
- ModelMerge
---

# ModelMergeSD1
## Documentation
- Class name: `ModelMergeSD1`
- Category: `advanced/model_merging/model_specific`
- Output node: `False`

ModelMergeSD1 is designed for advanced model merging operations, specifically tailored to merge different aspects of two models into a single model. It allows for fine-grained control over the merging process by adjusting the influence of each model's components, such as input blocks, middle blocks, and output blocks, on the final merged model.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model for the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.ModelBase`
- **`model2`**
    - The second model to be merged. Its components are selectively integrated into the first model based on specified ratios.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.ModelBase`
- **`time_embed.`**
    - Adjusts the influence of the time embedding components from both models in the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Adjusts the influence of the label embedding components from both models in the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.`**
    - Adjusts the influence of the ith input block from both models in the merged model. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.`**
    - Adjusts the influence of the ith middle block from both models in the merged model. The index i ranges from 0 to 2.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i.`**
    - Adjusts the influence of the ith output block from both models in the merged model. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Adjusts the influence of the final output components from both models in the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The result of the merging process, a single model that integrates selected components and adjustments from the two input models.
    - Python dtype: `comfy.model_base.ModelBase`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSD1(comfy_extras.nodes_model_merging.ModelMergeBlocks):
    CATEGORY = "advanced/model_merging/model_specific"
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
