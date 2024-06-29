---
tags:
- ControlNet
---

# ControlNet Switch (JPS)
## Documentation
- Class name: `ControlNet Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The ControlNet Switch node is designed to dynamically select between multiple control network configurations based on a given selection input. It facilitates the flexible manipulation of control networks within a processing pipeline, allowing for the conditional application of different control network settings.
## Input types
### Required
- **`select`**
    - Specifies the index of the control network to be selected for output. This input determines which control network configuration is applied, enabling dynamic switching between configurations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`ctrlnet_i`**
    - Represents a generic control network configuration option, where 'i' can range from 1 to 5, indicating the selectable control network configurations based on the 'select' input.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
## Output types
- **`ctrlnet_out`**
    - Comfy dtype: `CONTROL_NET`
    - Outputs the selected control network configuration, facilitating its application in subsequent processing steps.
    - Python dtype: `CONTROL_NET`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNet_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("CONTROL_NET",)
    RETURN_NAMES = ("ctrlnet_out",)
    FUNCTION = "get_ctrlnet"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "ctrlnet_1": ("CONTROL_NET",),
                "ctrlnet_2": ("CONTROL_NET",),
                "ctrlnet_3": ("CONTROL_NET",),
                "ctrlnet_4": ("CONTROL_NET",),
                "ctrlnet_5": ("CONTROL_NET",),
            }
        }

    def get_ctrlnet(self,select,ctrlnet_1=None,ctrlnet_2=None,ctrlnet_3=None,ctrlnet_4=None,ctrlnet_5=None,):
        
        ctrlnet_out = ctrlnet_1

        if (select == 2):
            ctrlnet_out = ctrlnet_2
        elif (select == 3):
            ctrlnet_out = ctrlnet_3
        elif (select == 4):
            ctrlnet_out = ctrlnet_4
        elif (select == 5):
            ctrlnet_out = ctrlnet_5

        return (ctrlnet_out,)

```
