---
tags:
- ModelGuidance
- ModelPatch
---

# TomePatchModel
## Documentation
- Class name: `TomePatchModel`
- Category: `_for_testing`
- Output node: `False`

The TomePatchModel node is designed to modify a given model by applying a specific patching technique to its attention mechanism. This technique involves adjusting the model's attention calculations based on a provided ratio, aiming to enhance the model's performance or adapt it to specific tasks.
## Input types
### Required
- **`model`**
    - The model to be patched. This parameter is crucial as it determines the base model that will undergo the patching process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`ratio`**
    - A float value representing the ratio at which the model's attention mechanism is adjusted. This parameter influences the extent of the modification applied to the model, affecting its overall performance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The patched model, which has undergone modifications to its attention mechanism. This output is significant as it represents the enhanced or adapted version of the original model.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TomePatchModel:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "ratio": ("FLOAT", {"default": 0.3, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "_for_testing"

    def patch(self, model, ratio):
        self.u = None
        def tomesd_m(q, k, v, extra_options):
            #NOTE: In the reference code get_functions takes x (input of the transformer block) as the argument instead of q
            #however from my basic testing it seems that using q instead gives better results
            m, self.u = get_functions(q, ratio, extra_options["original_shape"])
            return m(q), k, v
        def tomesd_u(n, extra_options):
            return self.u(n)

        m = model.clone()
        m.set_model_attn1_patch(tomesd_m)
        m.set_model_attn1_output_patch(tomesd_u)
        return (m, )

```
