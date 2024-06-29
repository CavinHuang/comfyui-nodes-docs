---
tags:
- DataClamp
---

# ControlNetClamp
## Documentation
- Class name: `ControlNetClamp`
- Category: `clamp`
- Output node: `False`

The ControlNetClamp node is designed to pass through control network data without modification, acting as a 'clamp' that ensures the integrity and unaltered state of control network information within a data processing pipeline.
## Input types
### Required
- **`control_net_clamp`**
    - Represents the control network data to be passed through unmodified, emphasizing the node's role in preserving the original state of control network information.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `tuple`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Outputs the unmodified control network data, maintaining the integrity of the original input.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNetClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "control_net_clamp": ("CONTROL_NET",),
            },
        }

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, control_net_clamp):
        return (control_net_clamp,)

```
