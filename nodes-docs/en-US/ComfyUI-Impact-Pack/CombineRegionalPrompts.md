---
tags:
- Concatenate
- PromptComposer
---

# CombineRegionalPrompts
## Documentation
- Class name: `CombineRegionalPrompts`
- Category: `ImpactPack/Regional`
- Output node: `False`

The CombineRegionalPrompts node is designed to aggregate multiple regional prompts into a single collection. This functionality is crucial for scenarios where inputs from various regional prompts need to be consolidated for further processing or analysis.
## Input types
### Required
- **`regional_prompts1`**
    - This parameter represents the collection of regional prompts to be combined. It is essential for the node's operation as it aggregates these prompts into a single output, enabling further processing of the combined data.
    - Comfy dtype: `REGIONAL_PROMPTS`
    - Python dtype: `List[REGIONAL_PROMPTS]`
## Output types
- **`regional_prompts`**
    - Comfy dtype: `REGIONAL_PROMPTS`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CombineRegionalPrompts:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "regional_prompts1": ("REGIONAL_PROMPTS", ),
                     },
                }

    RETURN_TYPES = ("REGIONAL_PROMPTS", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Regional"

    def doit(self, **kwargs):
        res = []
        for k, v in kwargs.items():
            res += v

        return (res, )

```
