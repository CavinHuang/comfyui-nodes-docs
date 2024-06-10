---
tags:
- ImageEnhancement
---

# DetailerHookCombine
## Documentation
- Class name: `DetailerHookCombine`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The DetailerHookCombine node is designed to enhance the detail processing capabilities of image generation models by combining the functionalities of two distinct detailer hooks. This node sequentially applies the cycle_latent and post_detection methods of each hook to the input data, effectively integrating their individual effects to produce more refined and detailed outputs.
## Input types
### Required
- **`hook1`**
    - The first detailer hook to be combined. It contributes to the initial phase of detail enhancement by applying its cycle_latent and post_detection methods to the input data.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `DetailerHook`
- **`hook2`**
    - The second detailer hook to be combined. It further processes the data already enhanced by the first hook, applying its own cycle_latent and post_detection methods to achieve additional detail refinement.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `DetailerHook`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - The output of the DetailerHookCombine node, which represents the enhanced and refined data after the combined effects of the two detailer hooks have been applied.
    - Python dtype: `DetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DetailerHookCombine:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "hook1": ("DETAILER_HOOK",),
                     "hook2": ("DETAILER_HOOK",),
                    },
                }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, hook1, hook2):
        hook = hooks.DetailerHookCombine(hook1, hook2)
        return (hook, )

```
