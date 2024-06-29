---
tags:
- Sampling
---

# ModelSamplingStableCascade
## Documentation
- Class name: `ModelSamplingStableCascade`
- Category: `advanced/model`
- Output node: `False`

This node is designed to enhance the sampling process of models by applying a stable cascade patch. It clones the input model and integrates advanced sampling techniques, thereby potentially improving the model's performance or altering its behavior in a specified manner.
## Input types
### Required
- **`model`**
    - The model to which the stable cascade sampling patch will be applied. This parameter is crucial as it determines the base model that will undergo modification.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.BaseModel`
- **`shift`**
    - A floating-point value that specifies the degree of shift to be applied during the sampling process. This parameter influences how the model's behavior is altered by the patch.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with the stable cascade sampling patch applied. This output reflects the enhanced or altered version of the input model.
    - Python dtype: `comfy.model_base.BaseModel`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelSamplingStableCascade:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "shift": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 100.0, "step":0.01}),
                              }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "advanced/model"

    def patch(self, model, shift):
        m = model.clone()

        sampling_base = comfy.model_sampling.StableCascadeSampling
        sampling_type = comfy.model_sampling.EPS

        class ModelSamplingAdvanced(sampling_base, sampling_type):
            pass

        model_sampling = ModelSamplingAdvanced(model.model.model_config)
        model_sampling.set_parameters(shift)
        m.add_object_patch("model_sampling", model_sampling)
        return (m, )

```
