
# Documentation
- Class name: AdainLatent
- Category: latent/filters
- Output node: False

AdainLatent节点旨在对潜在表征进行自适应实例归一化。它通过将目标潜在空间的均值和标准差与参考潜在空间的均值和标准差对齐来实现这一目标，同时由指定的因子进行调节。这个过程有助于将参考潜在空间的风格特征转移到目标潜在空间，从而在生成模型中实现风格操控和一致性。

# Input types
## Required
- latents
    - 待归一化的目标潜在表征。这个输入对于确定基础内容或结构至关重要，参考潜在空间的风格特征将被施加于此。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- reference
    - 提供待转移风格特征的参考潜在表征。这个输入对于定义将应用于目标潜在表征的风格属性至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- factor
    - 一个调节因子，用于控制参考潜在空间的风格特征应用到目标潜在表征的程度。它允许微调原始内容保留和新风格应用之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 应用自适应实例归一化后的修改后的潜在表征，反映了参考潜在空间的风格特征与目标潜在表征原始内容的融合。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AdainLatent:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "reference": ("LATENT", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch_normalize"

    CATEGORY = "latent/filters"

    def batch_normalize(self, latents, reference, factor):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"] # [B x C x H x W]
        
        t = t.movedim(0,1) # [C x B x H x W]
        for c in range(t.size(0)):
            for i in range(t.size(1)):
                r_sd, r_mean = torch.std_mean(reference["samples"][i, c], dim=None) # index by original dim order
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = ((t[c, i] - i_mean) / i_sd) * r_sd + r_mean
        
        latents_copy["samples"] = torch.lerp(latents["samples"], t.movedim(1,0), factor) # [B x C x H x W]
        return (latents_copy,)

```
