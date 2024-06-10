---
tags:
- SEGSPrep
- Segmentation
---

# Inpaint Preprocessor Provider (SEGS)
## Documentation
- Class name: `InpaintPreprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides inpainting preprocessing capabilities for SEGS, utilizing a specialized wrapper to apply inpainting techniques to images, potentially with masks, to prepare them for further processing or enhancement.
## Input types
### Required
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - The image after inpainting preprocessing has been applied, ready for further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InpaintPreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = InpaintPreprocessor_wrapper()
        return (obj, )

```
