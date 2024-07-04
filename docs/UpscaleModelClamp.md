
# Documentation
- Class name: UpscaleModelClamp
- Category: clamp
- Output node: False

UpscaleModelClamp节点的设计目的是在不做任何修改的情况下传递上采样模型，它在涉及模型操作的处理流程中充当一个占位符或检查点。

# Input types
## Required
- upscale_model
    - 要通过该节点传递的上采样模型。它作为一个直接输入，可用于潜在的进一步处理或在pipeline中的利用。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module

# Output types
- upscale_model
    - 输入到节点中的未经改变的上采样模型，便于无缝集成到pipeline的后续阶段。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UpscaleModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "upscale_model": ("UPSCALE_MODEL",),
            },
        }

    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, upscale_model):
        return (upscale_model,)

```
