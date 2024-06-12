---
tags:
- SEGSPrep
- Segmentation
---

# HED Preprocessor Provider (SEGS)
## Documentation
- Class name: `HEDPreprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a preprocessor for SEGS (semantic edge guided synthesis) using the HED (Holistically-Nested Edge Detection) algorithm. It is designed to preprocess images by detecting edges in a holistic manner, enhancing the input for SEGS applications.
## Input types
### Required
- **`safe`**
    - Determines whether the preprocessing should be performed in a safe mode, which may affect the edge detection results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - The output is a preprocessed object ready for SEGS applications, specifically tailored for edge detection enhancements.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class HEDPreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "safe": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, "HEDPreprocessor")
        return (obj, )

```
