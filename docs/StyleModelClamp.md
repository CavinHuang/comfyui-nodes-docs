
# Documentation
- Class name: StyleModelClamp
- Category: clamp
- Output node: False

StyleModelClamp节点的设计目的是在不进行修改的情况下传递样式模型数据，在数据处理流程中充当占位符或检查点的角色。它确保了样式模型信息在流经不同处理阶段时的完整性和连续性。

# Input types
## Required
- style_model
    - 'style_model'输入代表需要被限制的样式模型数据。这个参数对于保持样式模型信息在节点中不被改变地流动至关重要。
    - Comfy dtype: STYLE_MODEL
    - Python dtype: comfy.sd.StyleModel

# Output types
- style_model
    - 输出是未经修改的样式模型数据，确保样式模型信息在通过节点时保持完整性。
    - Comfy dtype: STYLE_MODEL
    - Python dtype: comfy.sd.StyleModel


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StyleModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "style_model": ("STYLE_MODEL",),
            },
        }

    RETURN_TYPES = ("STYLE_MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, style_model):
        return (style_model,)

```
