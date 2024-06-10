---
tags:
- ConditionalSelection
---

# Latent Input Switch
## Documentation
- Class name: `Latent Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The WAS_Latent_Input_Switch node is designed to toggle between two latent inputs based on a boolean condition, effectively allowing for conditional selection of latent representations.
## Input types
### Required
- **`latent_a`**
    - The first latent input to consider for selection. It plays a crucial role in determining the output based on the boolean condition.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`latent_b`**
    - The second latent input to consider for selection. This input provides an alternative choice for the output, contingent on the boolean condition.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`boolean`**
    - A boolean flag that determines which latent input (latent_a or latent_b) is selected for output. This parameter is essential for controlling the flow of data based on conditional logic.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The selected latent input based on the boolean condition. This output facilitates conditional logic in processing latent representations.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Latent_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent_a": ("LATENT",),
                "latent_b": ("LATENT",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "latent_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def latent_input_switch(self, latent_a, latent_b, boolean=True):

        if boolean:
            return (latent_a, )
        else:
            return (latent_b, )

```
