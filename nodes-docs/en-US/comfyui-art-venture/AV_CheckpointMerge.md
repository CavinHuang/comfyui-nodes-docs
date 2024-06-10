---
tags:
- ModelMerge
---

# Checkpoint Merge
## Documentation
- Class name: `AV_CheckpointMerge`
- Category: `Art Venture/Model Merging`
- Output node: `False`

The AV_CheckpointMerge node is designed for merging model checkpoints within the Art Venture framework. It abstracts the complexities of combining different model states into a unified checkpoint, facilitating the integration or experimentation with various model configurations in a streamlined manner.
## Input types
### Required
- **`model1`**
    - The first model to be merged, contributing to the creation of a new, unified model checkpoint.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model2`**
    - The second model to be merged, which combines with the first model to form a new, unified model checkpoint.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`model1_weight`**
    - A weight factor for the first model, influencing the degree to which it impacts the merged model checkpoint.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`model2_weight`**
    - A weight factor for the second model, influencing the degree to which it impacts the merged model checkpoint.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting merged model checkpoint, incorporating elements from both input models.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointMerge:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model1": ("MODEL",),
                "model2": ("MODEL",),
                "model1_weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 1.0, "step": 0.01}),
                "model2_weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "merge"

    CATEGORY = "Art Venture/Model Merging"

    def merge(self, model1, model2, model1_weight, model2_weight):
        m = model1.clone()
        k1 = model1.get_key_patches("diffusion_model.")
        k2 = model2.get_key_patches("diffusion_model.")
        for k in k1:
            if k in k2:
                a = k1[k][0]
                b = k2[k][0]

                if a.shape != b.shape and a.shape[0:1] + a.shape[2:] == b.shape[0:1] + b.shape[2:]:
                    if a.shape[1] == 4 and b.shape[1] == 9:
                        raise RuntimeError(
                            "When merging inpainting model with a normal one, model1 must be the inpainting model."
                        )
                    if a.shape[1] == 4 and b.shape[1] == 8:
                        raise RuntimeError(
                            "When merging instruct-pix2pix model with a normal one, model1 must be the instruct-pix2pix model."
                        )

                    c = torch.zeros_like(a)
                    c[:, 0:4, :, :] = b
                    b = c

                m.add_patches({k: (b,)}, model2_weight, model1_weight)
            else:
                logger.warn(f"Key {k} not found in model2")
                m.add_patches({k: k1[k]}, -1.0, 1.0)  # zero out

        return (m,)

```
