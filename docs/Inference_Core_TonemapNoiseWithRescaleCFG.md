
# Documentation
- Class name: Inference_Core_TonemapNoiseWithRescaleCFG
- Category: custom_node_experiments
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点为给定模型应用色调映射和噪声重缩放配置，通过调整条件输入和非条件输入的尺度和对比度，增强模型处理这些输入的能力。它结合了色调映射技术和重缩放因子来修改模型的采样行为，旨在提高生成输出的质量和一致性。

# Input types
## Required
- model
    - 将应用色调映射和噪声重缩放配置的模型。该配置调整模型处理输入的方式，以提高输出质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tonemap_multiplier
    - 调整色调映射效果强度的乘数，影响模型输出中噪声的对比度和亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rescale_multiplier
    - 调整条件生成尺度的乘数，影响最终输出中原始噪声预测和修改后噪声预测之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 具有更新后采样行为的修改模型，融入了指定的色调映射和噪声重缩放配置。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
