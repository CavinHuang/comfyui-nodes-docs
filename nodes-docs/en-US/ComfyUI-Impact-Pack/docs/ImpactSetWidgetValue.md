# Set Widget Value
## Documentation
- Class name: `ImpactSetWidgetValue`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

This node is designed to set the value of a widget within a node in a workflow, based on various types of input values such as boolean, integer, float, or string. It dynamically adjusts the widget's value and type according to the provided input, facilitating flexible and interactive adjustments within the workflow.
## Input types
### Required
- **`signal`**
    - A signal input that triggers the execution of the node, ensuring the node operates within the workflow's execution flow.
    - Comfy dtype: `*`
    - Python dtype: `any`
- **`node_id`**
    - The unique identifier of the node whose widget value is to be set, enabling targeted updates within the workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`widget_name`**
    - The name of the widget within the node to be updated, specifying which widget's value is to be changed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`boolean_value`**
    - An optional boolean value to set for the widget, allowing for true/false adjustments.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`int_value`**
    - An optional integer value to set for the widget, enabling numerical adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`float_value`**
    - An optional float value to set for the widget, allowing for decimal adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`string_value`**
    - An optional string value to set for the widget, enabling text adjustments.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - Returns the input signal, indicating the completion of the widget value update.
    - Python dtype: `any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactSetWidgetValue:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "signal": (any_typ,),
                    "node_id": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "widget_name": ("STRING", {"multiline": False}),
                    },
                "optional": {
                    "boolean_value": ("BOOLEAN", {"forceInput": True}),
                    "int_value": ("INT", {"forceInput": True}),
                    "float_value": ("FLOAT", {"forceInput": True}),
                    "string_value": ("STRING", {"forceInput": True}),
                    }
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("signal_opt",)
    OUTPUT_NODE = True

    def doit(self, signal, node_id, widget_name, boolean_value=None, int_value=None, float_value=None, string_value=None, ):
        kind = None
        if boolean_value is not None:
            value = boolean_value
            kind = "BOOLEAN"
        elif int_value is not None:
            value = int_value
            kind = "INT"
        elif float_value is not None:
            value = float_value
            kind = "FLOAT"
        elif string_value is not None:
            value = string_value
            kind = "STRING"
        else:
            value = None

        if value is not None:
            PromptServer.instance.send_sync("impact-node-feedback",
                                            {"node_id": node_id, "widget_name": widget_name, "type": kind, "value": value})

        return (signal,)

```
