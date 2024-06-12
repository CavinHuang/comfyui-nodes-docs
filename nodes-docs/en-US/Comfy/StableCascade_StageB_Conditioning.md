---
tags:
- Conditioning
---

# StableCascade_StageB_Conditioning
## Documentation
- Class name: `StableCascade_StageB_Conditioning`
- Category: `conditioning/stable_cascade`
- Output node: `False`

This node is designed for conditioning in the context of a stable cascade process, specifically at stage B. It integrates prior information from a later stage (stage C) into the conditioning data, preparing it for subsequent processing steps.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to be modified, incorporating prior information from stage C for enhanced processing.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`stage_c`**
    - The prior information from stage C, used to enrich the conditioning data with relevant context.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data, now augmented with prior information from stage C.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StableCascade_StageB_Conditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "conditioning": ("CONDITIONING",),
                              "stage_c": ("LATENT",),
                             }}
    RETURN_TYPES = ("CONDITIONING",)

    FUNCTION = "set_prior"

    CATEGORY = "conditioning/stable_cascade"

    def set_prior(self, conditioning, stage_c):
        c = []
        for t in conditioning:
            d = t[1].copy()
            d['stable_cascade_prior'] = stage_c['samples']
            n = [t[0], d]
            c.append(n)
        return (c, )

```
