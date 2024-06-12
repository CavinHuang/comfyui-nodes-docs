---
tags:
- ModelMerge
---

# ModelMergeSD2
## Documentation
- Class name: `ModelMergeSD2`
- Category: `advanced/model_merging/model_specific`
- Output node: `False`

ModelMergeSD2 is designed for advanced model merging operations, specifically tailored to work with models that share the same block structures. It enables the precise blending of two models by adjusting the influence of each model's components across various blocks, such as input, middle, and output blocks, using specified blending ratios.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model onto which patches from the second model are applied, influencing the final merged model's behavior.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model to be merged. Key patches from this model are applied to the first model based on specified blending ratios, affecting the final outcome of the merged model.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`time_embed.`**
    - Specifies the blending ratio for the time embedding blocks, influencing how temporal aspects of the models are combined.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Determines the blending ratio for the label embedding blocks, affecting how label information from both models is merged.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.`**
    - Controls the blending ratio for the ith input block, allowing for detailed customization of how input-related features are merged. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.`**
    - Specifies the blending ratio for the ith middle block, enabling precise control over the merging of the models' intermediate processing stages. The index i ranges from 0 to 2.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i.`**
    - Sets the blending ratio for the ith output block, dictating how the final output features of the models are combined. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Defines the blending ratio for the output blocks, influencing the final output characteristics of the merged model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The result of the merging process, a single model that integrates the specified blending ratios and modifications from both input models.
    - Python dtype: `comfy.model_base.Model`
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
