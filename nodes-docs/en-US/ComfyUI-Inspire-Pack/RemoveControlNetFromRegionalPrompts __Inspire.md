---
tags:
- RegionalPrompt
---

# Remove ControlNet [RegionalPrompts] (Inspire)
## Documentation
- Class name: `RemoveControlNetFromRegionalPrompts __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

This node is designed to process regional prompts by removing control net information from them. It iterates over each regional prompt, extracts positive and negative conditioning texts, applies a process to remove control net data from these texts, and then reassembles the prompts with the updated conditionings. The purpose is to cleanse the prompts of specific control instructions, making them suitable for further processing or generation tasks without the influence of the original control net settings.
## Input types
### Required
- **`regional_prompts`**
    - The collection of regional prompts to be processed. Each prompt includes positive and negative conditioning texts that may contain control net information to be removed. This input is essential for the node's operation as it defines the data set to be cleansed of control net specifics.
    - Comfy dtype: `REGIONAL_PROMPTS`
    - Python dtype: `List[RegionalPrompt]`
## Output types
- **`regional_prompts`**
    - Comfy dtype: `REGIONAL_PROMPTS`
    - A list of regional prompts with control net information removed from their conditioning texts. This output is ready for further processing or generation tasks, free from the original control net influences.
    - Python dtype: `List[RegionalPrompt]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveControlNetFromRegionalPrompts:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"regional_prompts": ("REGIONAL_PROMPTS", )}}
    RETURN_TYPES = ("REGIONAL_PROMPTS",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, regional_prompts):
        rcn = RemoveControlNet()
        res = []
        for rp in regional_prompts:
            _, _, _, _, positive, negative = rp.sampler.params
            positive, negative = rcn.doit(positive)[0], rcn.doit(negative)[0]
            sampler = rp.sampler.clone_with_conditionings(positive, negative)
            res.append(rp.clone_with_sampler(sampler))
        return (res, )

```
