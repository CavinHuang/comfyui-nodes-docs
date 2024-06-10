---
tags:
- ImageEnhancement
---

# TonemapNoiseWithRescaleCFG
## Documentation
- Class name: `TonemapNoiseWithRescaleCFG`
- Category: `custom_node_experiments`
- Output node: `False`

This node applies a tonemapping and noise rescaling technique to a given model's configuration, enhancing its ability to generate images by adjusting the contrast and scale of generated features. It utilizes a combination of tonemapping and rescaling operations to modify the model's output, aiming to improve visual quality and detail in the generated images.
## Input types
### Required
- **`model`**
    - The model to which the tonemapping and noise rescaling configuration will be applied. This parameter is crucial as it defines the base model that will be enhanced with the specified techniques.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`tonemap_multiplier`**
    - A multiplier that adjusts the intensity of the tonemapping effect. This parameter allows for fine-tuning of the contrast enhancement applied to the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rescale_multiplier`**
    - A multiplier that adjusts the intensity of the rescaling effect. This parameter allows for fine-tuning of the scale adjustment applied to the generated images, affecting their overall visual quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model with applied tonemapping and noise rescaling configuration. This output represents the model after the adjustments have been made, ready for generating improved images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Pack SDXL Tuple](../../efficiency-nodes-comfyui/Nodes/Pack SDXL Tuple.md)



## Source code
```python
class TonemapNoiseWithRescaleCFG:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "tonemap_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                             "rescale_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                             }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "custom_node_experiments"

    def patch(self, model, tonemap_multiplier, rescale_multiplier):

        def tonemap_noise_rescale_cfg(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]

            # Tonemap
            noise_pred = (cond - uncond)
            noise_pred_vector_magnitude = (torch.linalg.vector_norm(noise_pred, dim=(1)) + 0.0000000001)[:, None]
            noise_pred /= noise_pred_vector_magnitude

            mean = torch.mean(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)
            std = torch.std(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)

            top = (std * 3 + mean) * tonemap_multiplier

            # Reinhard
            noise_pred_vector_magnitude *= (1.0 / top)
            new_magnitude = noise_pred_vector_magnitude / (noise_pred_vector_magnitude + 1.0)
            new_magnitude *= top

            # Rescale CFG
            x_cfg = uncond + (noise_pred * new_magnitude * cond_scale)
            ro_pos = torch.std(cond, dim=(1, 2, 3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1, 2, 3), keepdim=True)

            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = rescale_multiplier * x_rescaled + (1.0 - rescale_multiplier) * x_cfg

            return x_final

        m = model.clone()
        m.set_model_sampler_cfg_function(tonemap_noise_rescale_cfg)
        return (m, )

```
