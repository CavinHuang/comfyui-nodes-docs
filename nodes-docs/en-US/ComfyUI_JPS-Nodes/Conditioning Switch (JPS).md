---
tags:
- ConditionalSelection
---

# Conditioning Switch (JPS)
## Documentation
- Class name: `Conditioning Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Conditioning Switch node is designed to select and output one of several conditioning inputs based on a specified selection index. It facilitates dynamic control over which conditioning data is passed forward in a processing pipeline, allowing for flexible manipulation of conditioning contexts within generative models or other computational frameworks.
## Input types
### Required
- **`select`**
    - The 'select' parameter determines which conditioning input to output, based on its numerical index. It is essential for controlling the flow of different conditioning contexts through the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`con_i`**
    - Represents a series of optional conditioning inputs (con_1 to con_5), where 'i' can range from 1 to 5. These inputs allow for dynamic selection of conditioning data based on the 'select' parameter, enabling varied contextual inputs for processing.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
## Output types
- **`con_out`**
    - Comfy dtype: `CONDITIONING`
    - The output conditioning data selected based on the 'select' parameter. It enables dynamic switching between different conditioning contexts.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Conditioning_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("con_out",)
    FUNCTION = "get_con"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "con_1": ("CONDITIONING",),
                "con_2": ("CONDITIONING",),
                "con_3": ("CONDITIONING",),
                "con_4": ("CONDITIONING",),
                "con_5": ("CONDITIONING",),
            }
        }

    def get_con(self,select,con_1,con_2=None,con_3=None,con_4=None,con_5=None,):
        
        con_out = con_1

        if (select == 2):
            con_out = con_2
        elif (select == 3):
            con_out  = con_3
        elif (select == 4):
            con_out = con_4
        elif (select == 5):
            con_out = con_5

        return (con_out,)

```
