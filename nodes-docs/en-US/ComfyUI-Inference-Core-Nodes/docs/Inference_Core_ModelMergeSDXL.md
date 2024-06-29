---
tags:
- ModelMerge
---

# Inference_Core_ModelMergeSDXL
## Documentation
- Class name: `Inference_Core_ModelMergeSDXL`
- Category: `advanced/model_merging`
- Output node: `False`

The Inference_Core_ModelMergeSDXL node specializes in merging two distinct model architectures into a single cohesive model, focusing on integrating various components such as input, middle, and output blocks along with specific transformer elements. This process is designed to enhance model performance by leveraging the strengths of both original models.
## Input types
### Required
- **`model1`**
    - Represents the first model to be merged, playing a crucial role in the combined model's architecture and output.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model2`**
    - Denotes the second model to be merged, equally significant in shaping the final integrated model's capabilities.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`time_embed.`**
    - Adjusts the time embedding layer's influence in the merged model, affecting temporal aspects of the model's processing. This parameter is critical for tuning how the model interprets time-related information, directly impacting the model's temporal processing capabilities.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label_emb.`**
    - Modifies the label embedding layer's impact, influencing how label information is integrated into the model. This parameter is key for adjusting the integration of label data, affecting how the model processes and utilizes label information.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_blocks.i`**
    - Controls the blending of the i-th input block from both models, where i ranges from 0 to 8, determining the initial processing of inputs. Each index specifies a particular input block's contribution, directly influencing the initial stages of data processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`middle_block.i`**
    - Affects the i-th middle block's contribution, where i ranges from 0 to 2, crucial for the model's intermediate computations. These parameters are essential for dictating the behavior of intermediate processing stages, impacting the model's overall computational flow.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_blocks.i`**
    - Influences the i-th output block's role, where i ranges from 0 to 8, impacting the final output generation. Each index determines the specific output block's influence on the final model output, playing a significant role in the output characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`out.`**
    - Adjusts the overall output layer's behavior, fine-tuning the final model output characteristics. This parameter is vital for the final adjustment of the model's output, allowing for precise control over the output features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The merged model resulting from the integration of the two input models, embodying the combined features and capabilities of both. This output is a new, enhanced model that leverages the strengths of the input models to achieve improved performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelMergeSDXL(comfy_extras.nodes_model_merging.ModelMergeBlocks):
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
