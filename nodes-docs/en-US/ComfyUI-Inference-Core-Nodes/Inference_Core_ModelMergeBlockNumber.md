---
tags:
- ModelMerge
---

# Inference_Core_ModelMergeBlockNumber
## Documentation
- Class name: `Inference_Core_ModelMergeBlockNumber`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two models by blending their components based on specified blending ratios for different parts of the models. It allows for fine-tuned control over how elements from each model are combined, facilitating the creation of hybrid models that leverage strengths from both inputs.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model onto which elements from the second model are blended.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model2`**
    - The second model to be merged. Elements from this model are blended into the first model based on the specified ratios.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`time_embed.`**
    - Specifies the blending ratio for the time embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Specifies the blending ratio for the label embedding components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i.`**
    - Specifies the blending ratio for the i-th input block of the models. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i.`**
    - Specifies the blending ratio for the i-th middle block of the models. The index i ranges from 0 to 2.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i.`**
    - Specifies the blending ratio for the i-th output block of the models. The index i ranges from 0 to 11.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Specifies the blending ratio for the output components of the models.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The merged model, which is a hybrid of the two input models with components blended according to the specified ratios.
    - Python dtype: `torch.nn.Module`
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
