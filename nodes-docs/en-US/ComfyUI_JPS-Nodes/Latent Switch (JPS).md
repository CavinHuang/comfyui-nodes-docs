---
tags:
- ConditionalSelection
---

# Latent Switch (JPS)
## Documentation
- Class name: `Latent Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Latent Switch node is designed to select and output one of several provided latent representations based on a given selection index. It facilitates dynamic switching between different latent inputs, enabling flexible manipulation of latent spaces in generative models.
## Input types
### Required
- **`select`**
    - Determines which latent representation to output, based on its numerical index. This selection drives the node's core functionality by choosing among the available latent inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`latent_i`**
    - One of the latent representation options that can be selected for output. The specific latent input to be used is determined by the 'select' parameter.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
## Output types
- **`latent_out`**
    - Comfy dtype: `LATENT`
    - The selected latent representation based on the input selection index.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Latent_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent_out",)
    FUNCTION = "get_latent"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "latent_1": ("LATENT",),
                "latent_2": ("LATENT",),
                "latent_3": ("LATENT",),
                "latent_4": ("LATENT",),
                "latent_5": ("LATENT",),
            }
        }

    def get_latent(self,select,latent_1=None,latent_2=None,latent_3=None,latent_4=None,latent_5=None,):
        
        latent_out = latent_1

        if (select == 2):
            latent_out = latent_2
        elif (select == 3):
            latent_out = latent_3
        elif (select == 4):
            latent_out = latent_4
        elif (select == 5):
            latent_out = latent_5

        return (latent_out,)

```
