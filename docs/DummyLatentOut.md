
# Documentation
- Class name: DummyLatentOut
- Category: KJNodes/misc
- Output node: True

DummyLatentOut节点提供了一个简单的潜在数据传递功能，它可以在用户界面中可视化工作流输出，而无需持久化数据存储。这个节点主要用于在不需要保存数据的情况下，实现工作流程中的输出展示。

# Input types
## Required
- latent
    - 该参数直接传递潜在数据，使得可以在不保存数据的情况下实现输出可视化。它是节点的核心输入，决定了最终显示的内容。
    - Comfy dtype: LATENT
    - Python dtype: tuple

# Output types
- latent
    - 输出与输入的潜在数据相同，允许无缝集成到需要可视化但不需要数据存储的工作流中。这种设计使得节点可以在不影响数据流的情况下，提供必要的可视化功能。
    - Comfy dtype: LATENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DummyLatentOut:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "latent": ("LATENT",),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "dummy"
    CATEGORY = "KJNodes/misc"
    OUTPUT_NODE = True
    DESCRIPTION = """
Does nothing, used to trigger generic workflow output.    
A way to get previews in the UI without saving anything to disk.
"""

    def dummy(self, latent):
        return (latent,)

```
