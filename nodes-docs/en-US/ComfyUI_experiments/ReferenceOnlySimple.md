---
tags:
- Conditioning
---

# ReferenceOnlySimple
## Documentation
- Class name: `ReferenceOnlySimple`
- Category: `custom_node_experiments`
- Output node: `False`

This node is designed to manipulate and extend model references for batch processing. It clones a given model, applies a custom attention mechanism to blend reference samples with generated latent samples, and adjusts noise masks for the output. The node's functionality is crucial for scenarios requiring the integration of reference data into the model's processing pipeline, enhancing the model's ability to handle diverse batch inputs effectively.
## Input types
### Required
- **`model`**
    - The model to be cloned and modified. This parameter is essential as it serves as the base for the subsequent operations, including the application of a custom attention mechanism.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`reference`**
    - A dictionary containing reference samples. These samples are used alongside generated latent samples to create a blended output, playing a key role in the node's batch processing capabilities.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`batch_size`**
    - Specifies the number of samples to generate in the batch. This parameter directly influences the size of the generated latent samples and the overall batch processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The cloned and modified model with a custom attention mechanism applied.
    - Python dtype: `torch.nn.Module`
- **`latent`**
    - Comfy dtype: `LATENT`
    - A dictionary containing the blended output of reference and generated latent samples, along with adjusted noise masks.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - [LatentFromBatch](../../Comfy/Nodes/LatentFromBatch.md)



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
