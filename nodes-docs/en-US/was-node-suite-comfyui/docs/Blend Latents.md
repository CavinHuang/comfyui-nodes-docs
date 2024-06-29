---
tags:
- Latent
- LatentBlend
---

# Blend Latents
## Documentation
- Class name: `Blend Latents`
- Category: `WAS Suite/Latent`
- Output node: `False`

The Blend Latents node is designed to blend two sets of latent representations using a variety of blending modes such as add, multiply, divide, subtract, overlay, screen, difference, exclusion, hard light, linear dodge, soft light, and random noise. This blending process allows for the creation of new, hybrid latent representations by combining features from both input sets in a controlled manner, leveraging different mathematical operations to achieve diverse visual effects.
## Input types
### Required
- **`latent_a`**
    - The first set of latent representations to be blended. It plays a crucial role in determining the base characteristics of the blended output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_b`**
    - The second set of latent representations to be blended with the first. It contributes additional characteristics to the blended output, influencing the final visual effect.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`operation`**
    - Specifies the blending mode to be used, such as add, multiply, divide, etc. This choice significantly affects the visual outcome of the blending process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`blend`**
    - A float value representing the blending factor, which determines the proportion of influence each set of latents has on the final blended output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The resulting set of blended latent representations, which combines features from both input sets according to the specified blending mode and factor.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Blend_Latents:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent_a": ("LATENT",),
                "latent_b": ("LATENT",),
                "operation": (["add", "multiply", "divide", "subtract", "overlay", "hard_light", "soft_light", "screen", "linear_dodge", "difference", "exclusion", "random"],),
                "blend": ("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "latent_blend"

    CATEGORY = "WAS Suite/Latent"

    def latent_blend(self, latent_a, latent_b, operation, blend):
        return ( {"samples": self.blend_latents(latent_a['samples'], latent_b['samples'], operation, blend)}, )

    def blend_latents(self, latent1, latent2, mode='add', blend_percentage=0.5):

        def overlay_blend(latent1, latent2, blend_factor):
            low = 2 * latent1 * latent2
            high = 1 - 2 * (1 - latent1) * (1 - latent2)
            blended_latent = (latent1 * blend_factor) * low + (latent2 * blend_factor) * high
            return blended_latent

        def screen_blend(latent1, latent2, blend_factor):
            inverted_latent1 = 1 - latent1
            inverted_latent2 = 1 - latent2
            blended_latent = 1 - (inverted_latent1 * inverted_latent2 * (1 - blend_factor))
            return blended_latent

        def difference_blend(latent1, latent2, blend_factor):
            blended_latent = abs(latent1 - latent2) * blend_factor
            return blended_latent

        def exclusion_blend(latent1, latent2, blend_factor):
            blended_latent = (latent1 + latent2 - 2 * latent1 * latent2) * blend_factor
            return blended_latent

        def hard_light_blend(latent1, latent2, blend_factor):
            blended_latent = torch.where(latent2 < 0.5, 2 * latent1 * latent2, 1 - 2 * (1 - latent1) * (1 - latent2)) * blend_factor
            return blended_latent

        def linear_dodge_blend(latent1, latent2, blend_factor):
            blended_latent = torch.clamp(latent1 + latent2, 0, 1) * blend_factor
            return blended_latent

        def soft_light_blend(latent1, latent2, blend_factor):
            low = 2 * latent1 * latent2 + latent1 ** 2 - 2 * latent1 * latent2 * latent1
            high = 2 * latent1 * (1 - latent2) + torch.sqrt(latent1) * (2 * latent2 - 1)
            blended_latent = (latent1 * blend_factor) * low + (latent2 * blend_factor) * high
            return blended_latent

        def random_noise(latent1, latent2, blend_factor):
            noise1 = torch.randn_like(latent1)
            noise2 = torch.randn_like(latent2)
            noise1 = (noise1 - noise1.min()) / (noise1.max() - noise1.min())
            noise2 = (noise2 - noise2.min()) / (noise2.max() - noise2.min())
            blended_noise = (latent1 * blend_factor) * noise1 + (latent2 * blend_factor) * noise2
            blended_noise = torch.clamp(blended_noise, 0, 1)
            return blended_noise

        blend_factor1 = blend_percentage
        blend_factor2 = 1 - blend_percentage

        if mode == 'add':
            blended_latent = (latent1 * blend_factor1) + (latent2 * blend_factor2)
        elif mode == 'multiply':
            blended_latent = (latent1 * blend_factor1) * (latent2 * blend_factor2)
        elif mode == 'divide':
            blended_latent = (latent1 * blend_factor1) / (latent2 * blend_factor2)
        elif mode == 'subtract':
            blended_latent = (latent1 * blend_factor1) - (latent2 * blend_factor2)
        elif mode == 'overlay':
            blended_latent = overlay_blend(latent1, latent2, blend_factor1)
        elif mode == 'screen':
            blended_latent = screen_blend(latent1, latent2, blend_factor1)
        elif mode == 'difference':
            blended_latent = difference_blend(latent1, latent2, blend_factor1)
        elif mode == 'exclusion':
            blended_latent = exclusion_blend(latent1, latent2, blend_factor1)
        elif mode == 'hard_light':
            blended_latent = hard_light_blend(latent1, latent2, blend_factor1)
        elif mode == 'linear_dodge':
            blended_latent = linear_dodge_blend(latent1, latent2, blend_factor1)
        elif mode == 'soft_light':
            blended_latent = soft_light_blend(latent1, latent2, blend_factor1)
        elif mode == 'random':
            blended_latent = random_noise(latent1, latent2, blend_factor1)
        else:
            raise ValueError("Unsupported blending mode. Please choose from 'add', 'multiply', 'divide', 'subtract', 'overlay', 'screen', 'difference', 'exclusion', 'hard_light', 'linear_dodge', 'soft_light', 'custom_noise'.")

        blended_latent = self.normalize(blended_latent)
        return blended_latent

    def normalize(self, latent):
        return (latent - latent.min()) / (latent.max() - latent.min())

```
