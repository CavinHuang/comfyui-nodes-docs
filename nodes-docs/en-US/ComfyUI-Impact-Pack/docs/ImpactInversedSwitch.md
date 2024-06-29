# Inversed Switch (Any)
## Documentation
- Class name: `ImpactInversedSwitch`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to selectively invert the input signal based on a specified condition. It operates by examining the 'select' input and, depending on its value and type, either directly uses the input value or retrieves and uses a specific value from another node. This functionality allows for dynamic control flow and decision-making within a node network, enabling the inversion of signals based on runtime conditions.
## Input types
### Required
- **`select`**
    - The 'select' input determines the condition under which the input signal is inverted. It can be a direct value or a reference to another node's output, allowing for dynamic and conditional inversion based on the network's state.
    - Comfy dtype: `INT`
    - Python dtype: `Union[int, list]`
- **`input`**
    - The 'input' parameter represents the signal to be potentially inverted. The inversion is conditional, based on the evaluation of the 'select' parameter.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GeneralInversedSwitch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "select": ("INT", {"default": 1, "min": 1, "max": 999999, "step": 1}),
                    "input": (any_typ,),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ByPassTypeTuple((any_typ, ))
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, select, input, unique_id):
        res = []

        for i in range(0, select):
            if select == i+1:
                res.append(input)
            else:
                res.append(None)

        return res

```
