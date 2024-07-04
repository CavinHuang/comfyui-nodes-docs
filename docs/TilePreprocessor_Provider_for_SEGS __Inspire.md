
# Documentation
- Class name: TilePreprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点为SEGS（语义边缘引导合成）提供预处理服务，应用了一种平铺预处理技术。它旨在通过金字塔上采样调整分辨率来增强输入数据，以提高SEGS应用中的性能表现。

# Input types
## Required
- pyrUp_iters
    - 指定金字塔上采样的迭代次数，影响处理后图像的最终分辨率。较高的迭代次数会产生更精细的分辨率，从而可能提高SEGS输出的质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- segs_preprocessor
    - 返回一个经过预处理的对象，准备用于SEGS处理，封装了在平铺预处理阶段所做的调整。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: TilePreprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TilePreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {'pyrUp_iters': ("INT", {"default": 3, "min": 1, "max": 10, "step": 1})}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, pyrUp_iters):
        obj = TilePreprocessor_wrapper(pyrUp_iters)
        return (obj, )

```
