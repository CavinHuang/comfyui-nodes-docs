
# Documentation
- Class name: Color_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

Color Preprocessor Provider for SEGS 节点是 Inspire Pack 中专为分割任务设计的图像预处理工具。它通过应用颜色处理技术来增强图像数据，从而提高分割性能。该节点属于 Inspire Pack 中的 SEGS（分割）类别，旨在为后续的分割任务提供经过优化的图像输入。

# Input types
## Required
此节点没有必需的输入参数。

# Output types
- segs_preprocessor
    - 输出一个为分割任务定制的预处理图像对象，该对象封装了在颜色处理阶段所做的必要调整。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: object


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
