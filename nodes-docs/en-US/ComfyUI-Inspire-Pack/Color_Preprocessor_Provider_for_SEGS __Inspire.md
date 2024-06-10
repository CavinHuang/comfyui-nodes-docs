---
tags:
- SEGSPrep
- Segmentation
---

# Color Preprocessor Provider (SEGS)
## Documentation
- Class name: `Color_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

The Color Preprocessor Provider for SEGS in the Inspire Pack is designed to preprocess images for segmentation tasks by applying color processing techniques. This node is part of the SEGS (Segmentation) category within the Inspire Pack and aims to enhance image data for better segmentation performance.
## Input types
### Required
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Outputs a preprocessed image object tailored for segmentation tasks, encapsulating the necessary adjustments made during the color processing stage.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Color_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = Color_Preprocessor_wrapper()
        return (obj, )

```
