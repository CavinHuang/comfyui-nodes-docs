
# Documentation
- Class name: Inference_Core_RescaleClassifierFreeGuidanceTest
- Category: custom_node_experiments
- Output node: False

该节点将自定义补丁应用于给定模型，通过重新调整无分类器引导过程来增强其推理能力。它通过指定的乘数调整有条件生成和无条件生成之间的平衡，旨在提高模型的输出质量。

# Input types
## Required
- model
    - 要进行修补的模型，其无分类器引导过程将被重新调整以提高推理性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- multiplier
    - 一个标量值，用于调整有条件生成和无条件生成之间的平衡，影响模型的最终输出质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 经过修补的模型，其无分类器引导过程已调整，以增强推理性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RescaleClassifierFreeGuidance:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "multiplier": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "custom_node_experiments"

    def patch(self, model, multiplier):
        
        def rescale_cfg(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]

            x_cfg = uncond + cond_scale * (cond - uncond)
            ro_pos = torch.std(cond, dim=(1,2,3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1,2,3), keepdim=True)

            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = multiplier * x_rescaled + (1.0 - multiplier) * x_cfg

            return x_final

        m = model.clone()
        m.set_model_sampler_cfg_function(rescale_cfg)
        return (m, )

```
