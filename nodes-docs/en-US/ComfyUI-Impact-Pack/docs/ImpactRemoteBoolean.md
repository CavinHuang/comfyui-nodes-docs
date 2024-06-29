---
tags:
- BooleanLogic
- ConditionalSelection
---

# Remote Boolean (on prompt)
## Documentation
- Class name: `ImpactRemoteBoolean`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

The ImpactRemoteBoolean node is designed to interact with boolean widgets in a remote interface, allowing for the dynamic control of boolean values based on external inputs.
## Input types
### Required
- **`node_id`**
    - Specifies the unique identifier of the node whose widget is being controlled, playing a crucial role in targeting the correct widget for value updates.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`widget_name`**
    - Identifies the specific widget within the node to be controlled, enabling precise manipulation of its boolean value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`value`**
    - The boolean value to be set for the specified widget, dictating the widget's state as either true or false.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactRemoteBoolean:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "node_id": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "widget_name": ("STRING", {"multiline": False}),
                    "value": ("BOOLEAN", {"default": True, "label_on": "True", "label_off": "False"}),
                    }}

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
