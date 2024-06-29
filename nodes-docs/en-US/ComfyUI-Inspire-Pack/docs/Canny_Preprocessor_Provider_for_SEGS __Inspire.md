---
tags:
- SEGSPrep
- Segmentation
---

# Canny Preprocessor Provider (SEGS)
## Documentation
- Class name: `Canny_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a Canny edge detection preprocessor for SEGS (Semantic Edge Guided Synthesis), aimed at enhancing image edges for better segmentation and synthesis outcomes.
## Input types
### Required
- **`low_threshold`**
    - Specifies the lower bound for the hysteresis thresholding step in the Canny edge detection algorithm, influencing the detection of weaker edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`high_threshold`**
    - Defines the upper bound for the hysteresis thresholding step, determining the detection of the most pronounced edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Outputs a preprocessor object configured for Canny edge detection, ready to be used in SEGS workflows.
    - Python dtype: `Canny_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Canny_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "low_threshold": ("FLOAT", {"default": 0.4, "min": 0.01, "max": 0.99, "step": 0.01}),
                "high_threshold": ("FLOAT", {"default": 0.8, "min": 0.01, "max": 0.99, "step": 0.01})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, low_threshold, high_threshold):
        obj = Canny_Preprocessor_wrapper(low_threshold, high_threshold)
        return (obj, )

```
