---
tags:
- ControlNet
---

# Control Net Model Input Switch
## Documentation
- Class name: `Control Net Model Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node is designed to switch between two control net inputs based on a boolean condition. It facilitates dynamic control net selection within workflows, enabling conditional logic to dictate the control net used for further processing.
## Input types
### Required
- **`control_net_a`**
    - The first control net option for selection.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`control_net_b`**
    - The second control net option for selection.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`boolean`**
    - A boolean value determining which control net is selected. If true, `control_net_a` is selected; otherwise, `control_net_b` is chosen.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - The selected control net based on the boolean condition.
    - Python dtype: `ControlNet`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Control_Net_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "control_net_a": ("CONTROL_NET",),
                "control_net_b": ("CONTROL_NET",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "control_net_switch"

    CATEGORY = "WAS Suite/Logic"

    def control_net_switch(self, control_net_a, control_net_b, boolean=True):

        if boolean:
            return (control_net_a, )
        else:
            return (control_net_b, )

```
