---
tags:
- ModelGuidance
---

# VideoLinearCFGGuidance
## Documentation
- Class name: `VideoLinearCFGGuidance`
- Category: `sampling/video_models`
- Output node: `False`

The VideoLinearCFGGuidance node applies a linear conditioning guidance scale to a video model, adjusting the influence of conditioned and unconditioned components over a specified range. This enables dynamic control over the generation process, allowing for fine-tuning of the model's output based on the desired level of conditioning.
## Input types
### Required
- **`model`**
    - The model parameter represents the video model to which the linear CFG guidance will be applied. It is crucial for defining the base model that will be modified with the guidance scale.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`min_cfg`**
    - The min_cfg parameter specifies the minimum conditioning guidance scale to be applied, serving as the starting point for the linear scale adjustment. It plays a key role in determining the lower bound of the guidance scale, influencing the model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a modified version of the input model, with the linear CFG guidance scale applied. This adjusted model is capable of generating outputs with varying degrees of conditioning, based on the specified guidance scale.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class VideoLinearCFGGuidance:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "min_cfg": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "sampling/video_models"

    def patch(self, model, min_cfg):
        def linear_cfg(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]

            scale = torch.linspace(min_cfg, cond_scale, cond.shape[0], device=cond.device).reshape((cond.shape[0], 1, 1, 1))
            return uncond + scale * (cond - uncond)

        m = model.clone()
        m.set_model_sampler_cfg_function(linear_cfg)
        return (m, )

```
