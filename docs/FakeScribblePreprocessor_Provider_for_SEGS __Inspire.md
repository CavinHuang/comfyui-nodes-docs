
# Documentation
- Class name: FakeScribblePreprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点为SEGS (语义分割模型)提供了一个预处理步骤,通过应用伪涂鸦效果。它旨在为进一步处理准备图像,通过增强或修改图像特征以更好地满足SEGS模型的要求。

# Input types
## Required
- safe
    - 该参数决定是否以"安全"模式执行预处理。它会影响执行过程和结果,可能会改变处理的强度或使用的方法。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- segs_preprocessor
    - 输出一个经过预处理的对象,专门用于SEGS模型,具有伪涂鸦效果。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: HED_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FakeScribblePreprocessor_Provider_for_SEGS(HEDPreprocessor_Provider_for_SEGS):
    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, "FakeScribblePreprocessor")
        return (obj, )

```
