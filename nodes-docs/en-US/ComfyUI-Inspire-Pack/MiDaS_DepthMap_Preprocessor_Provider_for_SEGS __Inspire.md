---
tags:
- Segmentation
---

# MiDaS Depth Map Preprocessor Provider (SEGS)
## Documentation
- Class name: `MiDaS_DepthMap_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides a pre-processing capability specifically designed for SEGS applications, utilizing the MiDaS model to prepare depth maps. It adjusts depth map properties based on input parameters to optimize them for subsequent SEGS processing.
## Input types
### Required
- **`a`**
    - Defines the scale factor for depth map adjustment, influencing the depth perception of the processed image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bg_threshold`**
    - Sets the threshold for background separation in the depth map, aiding in distinguishing foreground elements from the background.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Outputs a pre-processed depth map optimized for SEGS applications, ready for further processing.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MiDaS_DepthMap_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "a": ("FLOAT", {"default": np.pi * 2.0, "min": 0.0, "max": np.pi * 5.0, "step": 0.05}),
                "bg_threshold": ("FLOAT", {"default": 0.1, "min": 0, "max": 1, "step": 0.05})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, a, bg_threshold):
        obj = MiDaS_DepthMap_Preprocessor_wrapper(a, bg_threshold)
        return (obj, )

```
