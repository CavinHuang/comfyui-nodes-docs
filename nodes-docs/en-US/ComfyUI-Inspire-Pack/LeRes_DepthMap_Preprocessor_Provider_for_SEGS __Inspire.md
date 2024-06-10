---
tags:
- Segmentation
---

# LeReS Depth Map Preprocessor Provider (SEGS)
## Documentation
- Class name: `LeRes_DepthMap_Preprocessor_Provider_for_SEGS __Inspire`
- Category: `InspirePack/SEGS/ControlNet`
- Output node: `False`

This node provides preprocessing capabilities for depth map images using the LeReS algorithm, tailored for the SEGS framework. It focuses on removing nearest and background elements from the depth map and optionally boosting the remaining features to enhance the depth perception for subsequent processing stages.
## Input types
### Required
- **`rm_nearest`**
    - Specifies the extent to which the nearest elements in the depth map should be removed, affecting the clarity and focus of the depth map.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rm_background`**
    - Determines the degree to which background elements are removed from the depth map, enhancing the depth map's overall quality by focusing on relevant features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`boost`**
    - A boolean flag that, when enabled, boosts the features of the depth map after removing nearest and background elements, enhancing depth perception.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs_preprocessor`**
    - Comfy dtype: `SEGS_PREPROCESSOR`
    - Returns a preprocessed depth map object ready for further processing within the SEGS framework.
    - Python dtype: `LeReS_DepthMap_Preprocessor_wrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LeReS_DepthMap_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rm_nearest": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1}),
                "rm_background": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1})
            },
            "optional": {
                "boost": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, rm_nearest, rm_background, boost=False):
        obj = LeReS_DepthMap_Preprocessor_wrapper(rm_nearest, rm_background, boost)
        return (obj, )

```
