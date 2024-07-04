
# Documentation
- Class name: BatchNormalizeLatent
- Category: latent/filters
- Output node: False

BatchNormalizeLatent节点对潜在表示应用批量归一化，将每个潜在样本的分布调整为标准分布，从而稳定并可能改善生成过程。

# Input types
## Required
- latents
    - 需要进行归一化的潜在表示。这个输入对归一化过程至关重要，因为它直接修改了这些潜在表示的分布。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- factor
    - 一个缩放因子，用于在原始潜在表示和归一化后的潜在表示之间进行插值，允许对归一化效果进行可控调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 经过归一化处理的潜在表示，根据指定的factor进行调整，以潜在地提高生成模型的性能。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchNormalizeLatent:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "batch_normalize"

    CATEGORY = "latent/filters"

    def batch_normalize(self, latents, factor):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"] # [B x C x H x W]
        
        t = t.movedim(0,1) # [C x B x H x W]
        for c in range(t.size(0)):
            c_sd, c_mean = torch.std_mean(t[c], dim=None)
            
            for i in range(t.size(1)):
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = (t[c, i] - i_mean) / i_sd
            
            t[c] = t[c] * c_sd + c_mean
        
        latents_copy["samples"] = torch.lerp(latents["samples"], t.movedim(1,0), factor) # [B x C x H x W]
        return (latents_copy,)

```
