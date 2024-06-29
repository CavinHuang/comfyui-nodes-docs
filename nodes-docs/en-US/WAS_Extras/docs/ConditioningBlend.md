---
tags:
- Conditioning
---

# Conditioning (Blend)
## Documentation
- Class name: `ConditioningBlend`
- Category: `conditioning`
- Output node: `False`

The ConditioningBlend node specializes in blending two conditioning inputs using specified blending modes and strengths. It allows for the dynamic combination of conditioning contexts, enabling more nuanced control over the generation process.
## Input types
### Required
- **`conditioning_a`**
    - The first conditioning input to be blended. It plays a crucial role in determining the base of the blend.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`conditioning_b`**
    - The second conditioning input to be blended. It contributes to the blend by providing an additional layer of context.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`blending_mode`**
    - Specifies the method used for blending the two conditioning inputs. The choice of mode affects the blending behavior and outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`blending_strength`**
    - Controls the strength of the blend between the two conditioning inputs, allowing for fine-tuning of the blend's intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed for random number generation, ensuring reproducibility of the blend when desired.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The result of blending the two conditioning inputs, ready for use in further processing or generation tasks.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_ConditioningBlend:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning_a": ("CONDITIONING", ),
                "conditioning_b": ("CONDITIONING", ),
                "blending_mode": (list(blending_modes.keys()), ),
                "blending_strength": ("FLOAT", {"default": 0.5, "min": -10.0, "max": 10.0, "step": 0.001}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)
    FUNCTION = "combine"

    CATEGORY = "conditioning"

    def combine(self, conditioning_a, conditioning_b, blending_mode, blending_strength, seed):
    
        if seed > 0:
            torch.manual_seed(seed)
    
        a = conditioning_a[0][0].clone()
        b = conditioning_b[0][0].clone()
        
        pa = conditioning_a[0][1]["pooled_output"].clone()
        pb = conditioning_b[0][1]["pooled_output"].clone()

        cond = normalize(blending_modes[blending_mode](a, b, 1 - blending_strength))
        pooled = normalize(blending_modes[blending_mode](pa, pb, 1 - blending_strength))
        
        conditioning = [[cond, {"pooled_output": pooled}]]

        return (conditioning, )

```
