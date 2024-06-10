---
tags:
- Conditioning
---

# Inference_Core_ReferenceOnlySimple
## Documentation
- Class name: `Inference_Core_ReferenceOnlySimple`
- Category: `custom_node_experiments`
- Output node: `False`

This node is designed to serve as a reference implementation within the ComfyUI Inference Core framework. It provides a simplified example of how to structure and implement inference nodes, focusing on demonstrating core concepts and practices without the complexity of full-featured nodes.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for inference, serving as the primary input for the node's processing.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`reference`**
    - Provides a reference or context for the inference process, aiding in the generation or transformation of outputs.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`batch_size`**
    - Determines the number of items to be processed in a single batch, affecting the throughput and performance of the inference.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Represents the processed model data after inference, encapsulating the results in a structured format.
    - Python dtype: `torch.nn.Module`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Contains latent representations derived from the inference process, offering insights or modifications based on the model's output.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ReferenceOnlySimple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "reference": ("LATENT",),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})
                              }}

    RETURN_TYPES = ("MODEL", "LATENT")
    FUNCTION = "reference_only"

    CATEGORY = "custom_node_experiments"

    def reference_only(self, model, reference, batch_size):
        model_reference = model.clone()
        size_latent = list(reference["samples"].shape)
        size_latent[0] = batch_size
        latent = {}
        latent["samples"] = torch.zeros(size_latent)

        batch = latent["samples"].shape[0] + reference["samples"].shape[0]
        def reference_apply(q, k, v, extra_options):
            k = k.clone().repeat(1, 2, 1)
            offset = 0
            if q.shape[0] > batch:
                offset = batch

            for o in range(0, q.shape[0], batch):
                for x in range(1, batch):
                    k[x + o, q.shape[1]:] = q[o,:]

            return q, k, k

        model_reference.set_model_attn1_patch(reference_apply)
        out_latent = torch.cat((reference["samples"], latent["samples"]))
        if "noise_mask" in latent:
            mask = latent["noise_mask"]
        else:
            mask = torch.ones((64,64), dtype=torch.float32, device="cpu")

        if len(mask.shape) < 3:
            mask = mask.unsqueeze(0)
        if mask.shape[0] < latent["samples"].shape[0]:
            print(latent["samples"].shape, mask.shape)
            mask = mask.repeat(latent["samples"].shape[0], 1, 1)

        out_mask = torch.zeros((1,mask.shape[1],mask.shape[2]), dtype=torch.float32, device="cpu")
        return (model_reference, {"samples": out_latent, "noise_mask": torch.cat((out_mask, mask))})

```
