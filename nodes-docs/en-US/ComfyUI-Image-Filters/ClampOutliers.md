---
tags:
- DataClamp
---

# Clamp Outliers
## Documentation
- Class name: `ClampOutliers`
- Category: `latent/filters`
- Output node: `False`

The ClampOutliers node is designed to adjust the values of latent representations by clamping outliers based on a specified standard deviation threshold. This process aims to normalize the data, reducing the impact of extreme values on the overall distribution.
## Input types
### Required
- **`latents`**
    - The 'latents' parameter represents the latent representations to be adjusted. It is crucial for determining which data points are considered outliers and subsequently clamped.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`std_dev`**
    - The 'std_dev' parameter specifies the threshold for clamping based on standard deviations from the mean. It controls the extent to which outliers are adjusted, impacting the normalization of the data.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Returns the adjusted latent representations with outliers clamped according to the specified standard deviation threshold.
    - Python dtype: `Dict[str, torch.Tensor]`
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
