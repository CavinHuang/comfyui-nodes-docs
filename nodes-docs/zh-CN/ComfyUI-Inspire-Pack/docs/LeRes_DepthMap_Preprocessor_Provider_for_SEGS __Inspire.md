
# Documentation
- Class name: LeRes_DepthMap_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点为SEGS框架提供了使用LeReS算法预处理深度图的功能。它主要用于从深度图中移除最近和背景元素，并可选择性地增强剩余特征，以提升后续处理阶段的深度感知效果。

# Input types
## Required
- rm_nearest
    - 指定应从深度图中移除最近元素的程度，影响深度图的清晰度和焦点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rm_background
    - 决定从深度图中移除背景元素的程度，通过聚焦于相关特征来提高深度图的整体质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- boost
    - 一个布尔标志，启用时会在移除最近和背景元素后增强深度图的特征，从而提升深度感知效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- segs_preprocessor
    - 返回一个预处理后的深度图对象，可用于SEGS框架中的进一步处理。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: LeReS_DepthMap_Preprocessor_wrapper


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
