
# Documentation
- Class name: MaskClamp
- Category: clamp
- Output node: False

MaskClamp节点旨在不做任何修改地传递掩码数据，在数据处理管道中充当一个占位符或检查点的角色。

# Input types
## Required
- mask
    - mask输入代表将通过节点不变地传递的掩码数据。它对于在整个处理流程中保持掩码信息的完整性至关重要。
    - Comfy dtype: MASK
    - Python dtype: Tuple[str]

# Output types
- mask
    - 输出未经改变的掩码数据，确保工作流程中掩码信息的连续性。
    - Comfy dtype: MASK
    - Python dtype: Tuple[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, mask):
        return (mask,)

```
