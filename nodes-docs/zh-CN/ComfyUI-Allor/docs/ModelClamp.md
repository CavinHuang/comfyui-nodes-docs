
# Documentation
- Class name: ModelClamp
- Category: clamp
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelClamp节点的设计目的是在不进行任何修改的情况下传递模型数据，在数据处理流程中充当一个占位符或检查点的角色。这个节点可以用来维持模型数据的完整性，或者在复杂的处理流程中作为一个中间步骤。

# Input types
## Required
- model
    - 'model'参数代表需要通过该节点传递的模型数据。它对于在整个处理流程中保持模型的结构和信息的完整性至关重要。这个输入确保了模型数据能够无损地传递到管道的下一个阶段。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Output types
- model
    - 输出的'model'是未经改变的模型数据，它直接通过节点传递。这确保了模型的结构和信息保持完整无损。这个输出可以被用于后续的处理步骤或作为最终结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, model):
        return (model,)

```
