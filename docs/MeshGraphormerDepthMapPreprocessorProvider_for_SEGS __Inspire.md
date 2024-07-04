
# Documentation
- Class name: MeshGraphormerDepthMapPreprocessorProvider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

此节点为SEGS应用提供了一个专门的深度图生成预处理器，它使用MeshGraphormer框架。该节点封装了深度图预处理的复杂性，确保了与SEGS项目的兼容性和最优预处理。

# Input types
## Required
本节点没有必需的输入参数。

# Output types
- segs_preprocessor
    - 此输出是经过处理的、适用于SEGS应用的结果。它确保深度图经过优化，可以在SEGS框架内进行进一步处理或分析。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MeshGraphormerDepthMapPreprocessorProvider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = MeshGraphormerDepthMapPreprocessorProvider_wrapper()
        return (obj, )

```
