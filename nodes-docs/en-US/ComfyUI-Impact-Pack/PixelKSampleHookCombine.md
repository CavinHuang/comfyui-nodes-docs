---
tags:
- ImageEnhancement
---

# PixelKSampleHookCombine
## Documentation
- Class name: `PixelKSampleHookCombine`
- Category: `ImpactPack/Upscale`
- Output node: `False`

This node is designed to combine two PixelKSampleHook instances into a single hook, enabling the sequential application of their functionalities in image processing tasks. It serves as a mechanism to extend or modify the behavior of image processing pipelines by chaining multiple hooks together.
## Input types
### Required
- **`hook1`**
    - The first PixelKSampleHook instance to be combined. It acts as the initial step in the combined hook's processing sequence.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `PixelKSampleHook`
- **`hook2`**
    - The second PixelKSampleHook instance to be combined. It follows the first hook in the processing sequence, allowing for layered modifications or enhancements to the image processing task.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `PixelKSampleHook`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - The combined PixelKSampleHook instance, capable of executing the functionalities of both input hooks in sequence during image processing tasks.
    - Python dtype: `PixelKSampleHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PixelKSampleHookCombine:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "hook1": ("PK_HOOK",),
                     "hook2": ("PK_HOOK",),
                    },
                }

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, hook1, hook2):
        hook = hooks.PixelKSampleHookCombine(hook1, hook2)
        return (hook, )

```
