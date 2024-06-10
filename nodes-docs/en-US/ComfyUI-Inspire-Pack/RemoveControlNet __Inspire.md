---
tags:
- RegionalPrompt
---

# Remove ControlNet (Inspire)
## Documentation
- Class name: `RemoveControlNet __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

This node is designed to remove control networks from regional prompts within a given dataset. It iterates over each regional prompt, extracts positive and negative conditioning texts, applies a process to remove control networks from these texts, and then reassembles the prompts with the updated conditionings. The purpose is to cleanse the dataset of specific control network influences, making it suitable for further processing or analysis.
## Input types
### Required
- **`conditioning`**
    - The conditioning data from which control network influences are to be removed. This process aims to purify the conditioning for subsequent use, ensuring it is free from specific control network attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Conditioning data with control networks removed. This output is purified and ready for further processing, devoid of the previously specified control network influences.
    - Python dtype: `List[Tuple[str, Dict]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveControlNet:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", )}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, conditioning):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]

            if 'control' in n[1]:
                del n[1]['control']
            if 'control_apply_to_uncond' in n[1]:
                del n[1]['control_apply_to_uncond']
            c.append(n)

        return (c, )

```
