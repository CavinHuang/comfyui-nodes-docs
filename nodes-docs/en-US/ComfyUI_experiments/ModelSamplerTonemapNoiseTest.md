---
tags:
- ImageEnhancement
---

# ModelSamplerTonemapNoiseTest
## Documentation
- Class name: `ModelSamplerTonemapNoiseTest`
- Category: `custom_node_experiments`
- Output node: `False`

This node applies a tonemapping technique to modify the noise prediction in a model's sampling process, aiming to enhance image generation by adjusting the noise's intensity and distribution. It utilizes the Reinhard tonemapping method to scale the noise prediction vector magnitude, thereby influencing the final image output based on a specified multiplier.
## Input types
### Required
- **`model`**
    - The model to which the tonemapping noise adjustment will be applied. This parameter is crucial for defining the base model that will undergo the noise modification process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`multiplier`**
    - A scalar value that influences the intensity of the tonemapping effect on the noise prediction, directly affecting the visual characteristics of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with the tonemapping noise adjustment applied, ready for further image generation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelSamplerTonemapNoiseTest:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "custom_node_experiments"

    def patch(self, model, multiplier):
        
        def sampler_tonemap_reinhard(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]
            noise_pred = (cond - uncond)
            noise_pred_vector_magnitude = (torch.linalg.vector_norm(noise_pred, dim=(1)) + 0.0000000001)[:,None]
            noise_pred /= noise_pred_vector_magnitude

            mean = torch.mean(noise_pred_vector_magnitude, dim=(1,2,3), keepdim=True)
            std = torch.std(noise_pred_vector_magnitude, dim=(1,2,3), keepdim=True)

            top = (std * 3 + mean) * multiplier

            #reinhard
            noise_pred_vector_magnitude *= (1.0 / top)
            new_magnitude = noise_pred_vector_magnitude / (noise_pred_vector_magnitude + 1.0)
            new_magnitude *= top

            return uncond + noise_pred * new_magnitude * cond_scale

        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_tonemap_reinhard)
        return (m, )

```
