
# Documentation
- Class name: MiDaS_DepthMap_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点为SEGS应用程序提供了一个专门设计的预处理功能，利用MiDaS模型来准备深度图。它根据输入参数调整深度图属性，以优化它们以供后续SEGS处理使用。

# Input types
## Required
- a
    - 定义深度图调整的比例因子，影响处理后图像的深度感知。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - 设置深度图中背景分离的阈值，有助于区分前景元素和背景。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- segs_preprocessor
    - 输出经过优化的深度图，专为SEGS应用定制，可用于进一步处理。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: tuple


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
