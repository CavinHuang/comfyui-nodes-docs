
# Documentation
- Class name: ClampOutliers
- Category: latent/filters
- Output node: False

ClampOutliers节点旨在通过基于指定的标准差阈值来限制异常值，从而调整潜在表示的值。这个过程的目标是对数据进行规范化，减少极端值对整体分布的影响。

# Input types
## Required
- latents
    - latents参数代表需要调整的潜在表示。它对于确定哪些数据点被视为异常值并随后被限制至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- std_dev
    - std_dev参数指定了基于与平均值的标准差的限制阈值。它控制了异常值被调整的程度，影响数据的规范化。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 返回根据指定的标准差阈值限制异常值后的调整后的潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ClampOutliers:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents": ("LATENT", ),
                "std_dev": ("FLOAT", {"default": 3.0, "min": 0.1, "max": 100.0, "step": 0.1,  "round": 0.1}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "clamp_outliers"

    CATEGORY = "latent/filters"

    def clamp_outliers(self, latents, std_dev):
        latents_copy = copy.deepcopy(latents)
        t = latents_copy["samples"]
        
        for i, latent in enumerate(t):
            for j, channel in enumerate(latent):
                sd, mean = torch.std_mean(channel, dim=None)
                t[i,j] = torch.clamp(channel, min = -sd * std_dev + mean, max = sd * std_dev + mean)
        
        latents_copy["samples"] = t
        return (latents_copy,)

```
