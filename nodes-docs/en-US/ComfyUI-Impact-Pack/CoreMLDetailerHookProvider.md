---
tags:
- ImageEnhancement
---

# CoreMLDetailerHookProvider
## Documentation
- Class name: `CoreMLDetailerHookProvider`
- Category: `ImpactPack/Detailer`
- Output node: `False`

This node provides a mechanism to create and manage CoreML detailer hooks, which are specialized hooks designed to adjust and refine the details of generated images based on the specified mode. It encapsulates the complexity of configuring and applying these hooks, offering a streamlined interface for enhancing image quality.
## Input types
### Required
- **`mode`**
    - Specifies the resolution mode for the CoreML detailer hook, determining the dimensions of the output image. This choice directly influences the detail level and aspect ratio of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Returns a CoreML detailer hook configured according to the specified mode, ready to be applied for image detail enhancement.
    - Python dtype: `DetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CoreMLDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"mode": (["512x512", "768x768", "512x768", "768x512"], )}, }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, mode):
        hook = hooks.CoreMLHook(mode)
        return (hook, )

```
