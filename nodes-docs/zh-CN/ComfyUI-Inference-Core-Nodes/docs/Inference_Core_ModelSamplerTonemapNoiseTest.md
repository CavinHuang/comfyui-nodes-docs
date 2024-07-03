
# Documentation
- Class name: Inference_Core_ModelSamplerTonemapNoiseTest
- Category: custom_node_experiments
- Output node: False

Inference_Core_ModelSamplerTonemapNoiseTest节点应用色调映射技术来修改模型采样器中的噪声预测向量幅度，旨在通过基于Reinhard色调映射算法调整对比度和亮度来提高图像生成质量。它允许通过乘数动态调整效果，便于实验不同强度的色调映射。

# Input types
## Required
- model
    - 将应用色调映射技术的模型。这对于修改模型的内部采样器配置以达到所需的图像生成增强效果至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- multiplier
    - 用于调整应用于噪声预测向量幅度的色调映射效果强度的标量值，允许对图像的对比度和亮度进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 修改后的模型，其采样器配置已更新，包含了色调映射技术，旨在提高图像生成质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


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
