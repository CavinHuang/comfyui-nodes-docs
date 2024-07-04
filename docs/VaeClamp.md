
# Documentation
- Class name: VaeClamp
- Category: clamp
- Output node: False

VaeClamp节点旨在不做任何修改地传递变分自编码器(VAE)模型。它在处理管道中充当实用工具，确保兼容性或强制执行约束，而不改变VAE模型本身。

# Input types
## Required
- vae
    - 'vae'输入是一个变分自编码器(VAE)模型，该节点接收此模型作为输入并原样返回。它对于在处理管道中维护VAE模型的完整性至关重要。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Output types
- vae
    - 返回传入节点的未经修改的变分自编码器(VAE)模型。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VaeClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "vae": ("VAE",),
            }
        }

    RETURN_TYPES = ("VAE",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, vae):
        return (vae,)

```
