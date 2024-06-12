---
tags:
- ModelGuidance
---

# VideoTriangleCFGGuidance
## Documentation
- Class name: `VideoTriangleCFGGuidance`
- Category: `sampling/video_models`
- Output node: `False`

This node applies a triangular configuration guidance patch to a video model, dynamically adjusting the conditioning scale over time to modulate the influence of conditional inputs. It's designed to enhance the generation of video content by applying a specific pattern of guidance that varies linearly within a defined period, aiming to achieve a balance between conditioned and unconditioned content.
## Input types
### Required
- **`model`**
    - The video model to which the triangular CFG guidance patch will be applied. This model is cloned and modified with a new sampler CFG function.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`min_cfg`**
    - The minimum conditioning scale factor to be used in the triangular CFG guidance. It defines the lowest point of scale adjustment, influencing the balance between conditioned and unconditioned content generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified video model with the triangular CFG guidance patch applied, capable of generating video content with dynamically adjusted conditioning.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VideoTriangleCFGGuidance:
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
            period = 1.0
            values = torch.linspace(0, 1, cond.shape[0], device=cond.device)
            values = 2 * (values / period - torch.floor(values / period + 0.5)).abs()
            scale = (values * (cond_scale - min_cfg) + min_cfg).reshape((cond.shape[0], 1, 1, 1))

            return uncond + scale * (cond - uncond)

        m = model.clone()
        m.set_model_sampler_cfg_function(linear_cfg)
        return (m, )

```
