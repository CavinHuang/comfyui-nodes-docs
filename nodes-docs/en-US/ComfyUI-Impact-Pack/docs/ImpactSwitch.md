---
tags:
- ConditionalSelection
---

# Switch (Any)
## Documentation
- Class name: `ImpactSwitch`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSwitch node is designed to dynamically select between multiple inputs based on a specified condition or index. It serves as a control mechanism within a workflow, allowing for the conditional routing of data streams based on runtime decisions.
## Input types
### Required
- **`select`**
    - Specifies the index of the input to be selected for output. This parameter determines which input path the node will follow, affecting the flow of data through the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sel_mode`**
    - Determines the mode of selection, either based on prompt input or execution context. This parameter influences how the selection index is interpreted and applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`input1`**
    - The first input option for the switch. This parameter represents one of the potential data paths that can be selected based on the 'select' index.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
- **`selected_value`**
    - Comfy dtype: `*`
    - The data from the selected input path. This output changes based on the 'select' parameter, allowing for dynamic data routing.
    - Python dtype: `object`
- **`selected_label`**
    - Comfy dtype: `STRING`
    - The label associated with the selected input, providing context or identification for the chosen path.
    - Python dtype: `str`
- **`selected_index`**
    - Comfy dtype: `INT`
    - The index of the selected input, indicating which path was chosen based on the 'select' parameter.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)



## Source code
```python
class GeneralSwitch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "select": ("INT", {"default": 1, "min": 1, "max": 999999, "step": 1}),
                    "sel_mode": ("BOOLEAN", {"default": True, "label_on": "select_on_prompt", "label_off": "select_on_execution", "forceInput": False}),
                    },
                "optional": {
                    "input1": (any_typ,),
                    },
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO"}
                }

    RETURN_TYPES = (any_typ, "STRING", "INT")
    RETURN_NAMES = ("selected_value", "selected_label", "selected_index")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, *args, **kwargs):
        selected_index = int(kwargs['select'])
        input_name = f"input{selected_index}"

        selected_label = input_name
        node_id = kwargs['unique_id']

        if 'extra_pnginfo' in kwargs and kwargs['extra_pnginfo'] is not None:
            nodelist = kwargs['extra_pnginfo']['workflow']['nodes']
            for node in nodelist:
                if str(node['id']) == node_id:
                    inputs = node['inputs']

                    for slot in inputs:
                        if slot['name'] == input_name and 'label' in slot:
                            selected_label = slot['label']

                    break
        else:
            print(f"[Impact-Pack] The switch node does not guarantee proper functioning in API mode.")

        if input_name in kwargs:
            return (kwargs[input_name], selected_label, selected_index)
        else:
            print(f"ImpactSwitch: invalid select index (ignored)")
            return (None, "", selected_index)

```
