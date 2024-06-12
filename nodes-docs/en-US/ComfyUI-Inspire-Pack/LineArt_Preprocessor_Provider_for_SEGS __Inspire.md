---
tags:
- SEGSPrep
- Segmentation
---

# LineArt Preprocessor Provider (SEGS)
## Documentation
- Class name: `LineArt_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor for generating line art from images, tailored for use with SEGS (Semantic Edge Guided Synthesis) models. It allows for the adjustment of the coarseness of the line art, enabling a range of artistic effects from fine to bold lines.
## Input types
### Required
- **`coarse`**
    - Determines whether the line art generated should be coarse or fine. Enabling this option results in bolder, more pronounced lines, while disabling it produces finer, more detailed line art.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Returns an object that can preprocess images into line art suitable for SEGS models, facilitating the creation of stylized images or animations.
    - Python dtype: `LineArt_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "coarse": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
        }}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, coarse):
        obj = LineArt_Preprocessor_wrapper(coarse)
        return (obj, )

```
