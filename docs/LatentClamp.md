
# Documentation
- Class name: LatentClamp
- Category: clamp
- Output node: False

LatentClamp节点旨在不做任何修改地传递潜在表示。它在管道中充当占位符或检查点的角色，确保潜在数据结构得以保留，以供后续处理步骤使用。

# Input types
## Required
- latent
    - latent参数代表需要传递的潜在数据结构。在操作或分析潜在表示的过程中，保持其完整性对于维护数据流的一致性至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent
    - 返回未经改动的潜在数据结构，确保在潜在表示至关重要的处理管道中保持连续性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": ("LATENT",),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, latent):
        return (latent,)

```
