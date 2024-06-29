---
tags:
- Latent
---

# 🔢 CR Interpolate Latents
## Documentation
- Class name: `CR Interpolate Latents`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🔢 Interpolate`
- Output node: `False`

This node specializes in blending two latent representations based on a specified interpolation method, such as linear or spherical linear interpolation. It's designed to facilitate the creation of smooth transitions or animations between different states or frames within a generative model's latent space.
## Input types
### Required
- **`latent1`**
    - The first latent representation to be interpolated. It serves as the starting point for the interpolation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent2`**
    - The second latent representation to be interpolated. It acts as the endpoint for the interpolation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`weight`**
    - A scalar value that determines the interpolation ratio between the two latent representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`method`**
    - Specifies the interpolation method to be used, such as 'lerp' for linear interpolation or 'slerp' for spherical linear interpolation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The resulting latent representation after applying the specified interpolation method.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on the interpolation methods available and their usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class CR_InterpolateLatents:

    @classmethod
    def INPUT_TYPES(cls):
    
        #interpolation_methods = ["lerp", "slerp"]
        interpolation_methods = ["lerp"]
        
        return {
            "required": {
                "latent1": ("LATENT",),
                "latent2": ("LATENT",),
                "weight": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "method": (interpolation_methods,),
            }
        }

    RETURN_TYPES = ("LATENT", "STRING", )
    RETURN_NAMES = ("LATENT", "show_help", )
    FUNCTION = "interpolate"
    CATEGORY = icons.get("Comfyroll/Animation/Interpolate")

    def interpolate(self, latent1, latent2, weight, method):
        a = latent1.copy()
        b = latent2.copy()
        c = {}
        
        if method == "lerp":
        
            torch.lerp(a["samples"], b["samples"], weight, out=a["samples"])
            
        elif method == "slerp":
            
            dot_products = torch.sum(latent1["samples"] * latent2["samples"], dim=(2, 3))
            dot_products = torch.clamp(dot_products, -1, 1)  # Ensure dot products are within valid range

            angles = torch.acos(dot_products)
            sin_angles = torch.sin(angles)

            weight1 = torch.sin((1 - weight) * angles) / sin_angles
            weight2 = torch.sin(weight * angles) / sin_angles

            # Broadcast weights to match latent samples dimensions
            weight1 = weight1.unsqueeze(-1).unsqueeze(-1)
            weight2 = weight2.unsqueeze(-1).unsqueeze(-1)

            interpolated_samples = weight1 * latent1["samples"] + weight2 * latent2["samples"]
            a["samples"] = interpolated_samples
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-interpolate-latents"

        return (a, show_help, )

```
