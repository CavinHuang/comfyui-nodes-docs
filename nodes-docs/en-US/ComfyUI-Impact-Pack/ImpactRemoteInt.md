---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# Remote Int (on prompt)
## Documentation
- Class name: `ImpactRemoteInt`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

The ImpactRemoteInt node is designed to remotely set integer values for specified widgets within a user interface. It facilitates dynamic interaction with UI components by allowing integer values to be programmatically assigned based on logic or user input.
## Input types
### Required
- **`node_id`**
    - Identifies the target node whose widget is to be updated. It ensures that the correct widget in the correct node receives the intended value, directly influencing which part of the UI is affected by the operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`widget_name`**
    - Specifies the name of the widget within the target node that is to be updated. This allows for precise targeting of UI components for value updates, affecting the specific aspect of the user interface that will display the new value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`value`**
    - The integer value to be set for the specified widget. This value dictates the new state or display of the widget, enabling dynamic UI updates. The chosen value directly impacts the visual feedback or functionality provided by the widget, making it a crucial aspect of UI interaction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactRemoteInt:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "node_id": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "widget_name": ("STRING", {"multiline": False}),
                    "value": ("INT", {"default": 0, "min": -0xffffffffffffffff, "max": 0xffffffffffffffff}),
                    }}

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
