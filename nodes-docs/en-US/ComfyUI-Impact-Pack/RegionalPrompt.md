---
tags:
- RegionalPrompt
---

# RegionalPrompt
## Documentation
- Class name: `RegionalPrompt`
- Category: `ImpactPack/Regional`
- Output node: `False`

The RegionalPrompt node is designed to generate regional prompts based on a given mask and an advanced sampler. It focuses on creating specific prompts that are tailored to particular regions of an image, enhancing the customization and precision of image generation tasks.
## Input types
### Required
- **`mask`**
    - The mask parameter specifies the area of interest within an image for which the regional prompt will be generated. It plays a crucial role in defining the scope and focus of the prompt generation process.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`advanced_sampler`**
    - The advanced_sampler parameter is utilized to apply sophisticated sampling techniques for generating the regional prompt. It significantly influences the quality and characteristics of the generated prompt.
    - Comfy dtype: `KSAMPLER_ADVANCED`
    - Python dtype: `KSAMPLER_ADVANCED`
## Output types
- **`regional_prompts`**
    - Comfy dtype: `REGIONAL_PROMPTS`
    - This output consists of regional prompts generated based on the specified mask and advanced sampler. It's essential for subsequent image generation or manipulation tasks.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RegionalPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "mask": ("MASK", ),
                     "advanced_sampler": ("KSAMPLER_ADVANCED", ),
                     },
                }

    RETURN_TYPES = ("REGIONAL_PROMPTS", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Regional"

    def doit(self, mask, advanced_sampler):
        regional_prompt = core.REGIONAL_PROMPT(mask, advanced_sampler)
        return ([regional_prompt], )

```
