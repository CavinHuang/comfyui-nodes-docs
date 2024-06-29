---
tags:
- ImageEnhancement
---

# PreviewDetailerHookProvider
## Documentation
- Class name: `PreviewDetailerHookProvider`
- Category: `ImpactPack/Util`
- Output node: `False`

This node provides a mechanism to enhance and detail previews by applying a specific quality setting to images. It utilizes a unique identifier to manage and track the processing of images, ensuring that each image is enhanced according to the specified quality level.
## Input types
### Required
- **`quality`**
    - Specifies the quality level for image processing, affecting the clarity and detail of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Represents a hook that enhances image previews by applying a specified quality setting.
    - Python dtype: `PreviewDetailerHook`
- **`upscaler_hook`**
    - Comfy dtype: `UPSCALER_HOOK`
    - Represents a hook that can be used for upscaling images, although in this context it returns the same hook as for detailing.
    - Python dtype: `PreviewDetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PreviewDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"quality": ("INT", {"default": 95, "min": 20, "max": 100})},
            "hidden": {"unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("DETAILER_HOOK", "UPSCALER_HOOK")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, quality, unique_id):
        hook = hooks.PreviewDetailerHook(unique_id, quality)
        return (hook, hook)

```
