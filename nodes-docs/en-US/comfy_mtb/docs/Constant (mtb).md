---
tags:
- Constant
---

# Constant (mtb)
## Documentation
- Class name: `Constant (mtb)`
- Category: `mtb/utils`
- Output node: `False`

The MTB_Constant node is designed to output a constant value. It serves as a utility within a graph to provide a fixed value that can be used as input to other nodes, facilitating the creation of static or dynamic flows based on predefined constants.
## Input types
### Required
- **`Value`**
    - Represents the constant value to be output by the node. This parameter is essential for defining the static data that will be passed through the graph, affecting subsequent operations.
    - Comfy dtype: `*`
    - Python dtype: `str | int | float | dict | list | bool | None`
## Output types
- **`output`**
    - Comfy dtype: `*`
    - The output of the MTB_Constant node, which is the constant value defined by the input parameter. This value is passed through the graph for use in subsequent nodes.
    - Python dtype: `str | int | float | dict | list | bool | None`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_Constant:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"Value": ("*",)},
        }

    RETURN_TYPES = ("*",)
    RETURN_NAMES = ("output",)
    CATEGORY = "mtb/utils"
    FUNCTION = "execute"

    def execute(
        self,
        **kwargs,
    ):
        log.debug("Received kwargs")
        log.debug(json.dumps(kwargs, check_circular=True))
        return (kwargs.get("Value"),)

```
