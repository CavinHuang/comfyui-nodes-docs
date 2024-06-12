---
tags:
- ConditionalSelection
- ImageSwitching
---

# Mask Switch (JPS)
## Documentation
- Class name: `Mask Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Mask Switch node is designed to select and output one of several input masks based on a given selection index. It facilitates dynamic mask switching within a pipeline, allowing for flexible mask manipulation and application.
## Input types
### Required
- **`select`**
    - Specifies the index of the mask to be selected and outputted. This selection determines which mask input (among potentially multiple provided) is passed through as the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask_i`**
    - Represents any of the optional mask inputs (mask_1 to mask_5) that can be selected for output. The specific mask chosen is determined by the 'select' index.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask_out`**
    - Comfy dtype: `MASK`
    - The selected mask output based on the input selection index.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Mask_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask_out",)
    FUNCTION = "get_mask"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "mask_1": ("MASK",),
                "mask_2": ("MASK",),
                "mask_3": ("MASK",),
                "mask_4": ("MASK",),
                "mask_5": ("MASK",),
            }
        }

    def get_mask(self,select,mask_1=None,mask_2=None,mask_3=None,mask_4=None,mask_5=None,):
        
        mask_out = None

        if (select == 1):
            mask_out = mask_1
        if (select == 2):
            mask_out = mask_2
        elif (select == 3):
            mask_out = mask_3
        elif (select == 4):
            mask_out = mask_4
        elif (select == 5):
            mask_out = mask_5

        return (mask_out,)

```
