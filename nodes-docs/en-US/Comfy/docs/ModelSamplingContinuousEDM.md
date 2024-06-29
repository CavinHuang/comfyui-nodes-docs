---
tags:
- Sampling
---

# ModelSamplingContinuousEDM
## Documentation
- Class name: `ModelSamplingContinuousEDM`
- Category: `advanced/model`
- Output node: `False`

The ModelSamplingContinuousEDM node is designed to configure and apply continuous, evenly distributed model sampling techniques within a deep learning model's architecture. It focuses on adjusting the model's sampling parameters based on provided configurations, enabling precise control over the diffusion process for generating or processing data.
## Input types
### Required
- **`model`**
    - The model input represents the deep learning model to which the sampling techniques will be applied, serving as the foundation for configuring and adjusting sampling parameters.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`sampling`**
    - Specifies the type of sampling technique to be applied, influencing the model's behavior and the characteristics of the generated or processed data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sigma_max`**
    - Defines the maximum value of sigma for the sampling process, setting an upper limit on the diffusion scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_min`**
    - Defines the minimum value of sigma for the sampling process, setting a lower limit on the diffusion scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with updated sampling parameters, reflecting the applied continuous, evenly distributed model sampling techniques.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)



## Source code
```python
class ModelSamplingContinuousEDM:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "sampling": (["v_prediction", "edm_playground_v2.5", "eps"],),
                              "sigma_max": ("FLOAT", {"default": 120.0, "min": 0.0, "max": 1000.0, "step":0.001, "round": False}),
                              "sigma_min": ("FLOAT", {"default": 0.002, "min": 0.0, "max": 1000.0, "step":0.001, "round": False}),
                              }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "advanced/model"

    def patch(self, model, sampling, sigma_max, sigma_min):
        m = model.clone()

        latent_format = None
        sigma_data = 1.0
        if sampling == "eps":
            sampling_type = comfy.model_sampling.EPS
        elif sampling == "v_prediction":
            sampling_type = comfy.model_sampling.V_PREDICTION
        elif sampling == "edm_playground_v2.5":
            sampling_type = comfy.model_sampling.EDM
            sigma_data = 0.5
            latent_format = comfy.latent_formats.SDXL_Playground_2_5()

        class ModelSamplingAdvanced(comfy.model_sampling.ModelSamplingContinuousEDM, sampling_type):
            pass

        model_sampling = ModelSamplingAdvanced(model.model.model_config)
        model_sampling.set_parameters(sigma_min, sigma_max, sigma_data)
        m.add_object_patch("model_sampling", model_sampling)
        if latent_format is not None:
            m.add_object_patch("latent_format", latent_format)
        return (m, )

```
