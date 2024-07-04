
# Documentation
- Class name: CondPassThrough
- Category: KJNodes/misc
- Output node: False

CondPassThrough节点旨在实现正面和负面条件数据的直接传递。它作为一种变通方法，在Set节点的限制可能阻碍这种操作的情况下，使输入的绕过成为可能。

# Input types
## Required
- positive
    - 表示要传递的正面条件数据。它在维持数据流完整性方面起着关键作用，尤其是在绕过场景中。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- negative
    - 表示要传递的负面条件数据。它确保负面条件数据也能无缝集成到工作流程中，而不会发生改变。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple

# Output types
- positive
    - 输出未经修改的正面条件数据，确保其可用于后续处理步骤。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- negative
    - 输出未经修改的负面条件数据，保持其原始形式以供进一步使用。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CondPassThrough:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING", ),
                "negative": ("CONDITIONING", ),
            }, 
    }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "passthrough"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
    Simply passes through the positive and negative conditioning,
    workaround for Set node not allowing bypassed inputs.
"""

    def passthrough(self, positive, negative):
        return (positive, negative,)

```
