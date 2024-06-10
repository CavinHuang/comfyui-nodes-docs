---
tags:
- Conditioning
---

# ConditioningZeroOut
## Documentation
- Class name: `ConditioningZeroOut`
- Category: `advanced/conditioning`
- Output node: `False`

This node zeroes out specific elements within the conditioning data structure, effectively neutralizing their influence in subsequent processing steps. It's designed for advanced conditioning operations where direct manipulation of the conditioning's internal representation is required.
## Input types
### Required
- **`conditioning`**
    - The conditioning data structure to be modified. This node zeroes out the 'pooled_output' elements within each conditioning entry, if present.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data structure, with 'pooled_output' elements set to zero where applicable.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)



## Source code
```python
class ConditioningZeroOut:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", )}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "zero_out"

    CATEGORY = "advanced/conditioning"

    def zero_out(self, conditioning):
        c = []
        for t in conditioning:
            d = t[1].copy()
            if "pooled_output" in d:
                d["pooled_output"] = torch.zeros_like(d["pooled_output"])
            n = [torch.zeros_like(t[0]), d]
            c.append(n)
        return (c, )

```
