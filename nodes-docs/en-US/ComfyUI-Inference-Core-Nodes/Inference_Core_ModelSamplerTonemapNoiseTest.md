---
tags:
- ImageEnhancement
---

# Inference_Core_ModelSamplerTonemapNoiseTest
## Documentation
- Class name: `Inference_Core_ModelSamplerTonemapNoiseTest`
- Category: `custom_node_experiments`
- Output node: `False`

This node applies a tonemapping technique to modify the noise prediction vector magnitude in a model's sampler, aiming to enhance image generation quality by adjusting the contrast and brightness based on the Reinhard tonemapping algorithm. It allows for dynamic adjustment of the effect through a multiplier, facilitating experimentation with different levels of tonemapping intensity.
## Input types
### Required
- **`model`**
    - The model to which the tonemapping technique will be applied. This is crucial for modifying the model's internal sampler configuration to achieve the desired image generation enhancements.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`multiplier`**
    - A scalar value used to adjust the intensity of the tonemapping effect applied to the noise prediction vector magnitude, allowing for fine-tuning of the image's contrast and brightness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with an updated sampler configuration that incorporates the tonemapping technique, aimed at improving image generation quality.
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
