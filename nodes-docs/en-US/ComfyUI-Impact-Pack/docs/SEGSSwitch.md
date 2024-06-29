---
tags:
- ConditionalSelection
---

# Switch (SEGS/legacy)
## Documentation
- Class name: `SEGSSwitch`
- Category: `ImpactPack/Util`
- Output node: `False`

The SEGSSwitch node dynamically selects between multiple segmentation (SEGS) inputs based on a specified index. It facilitates conditional processing paths within a pipeline, allowing for the flexible use of different segmentation data.
## Input types
### Required
- **`select`**
    - Specifies the index of the segmentation input to select. This index determines which segmentation data is used for processing, enabling dynamic choice based on conditions or preferences.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sel_mode`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
### Optional
- **`input1`**
    - unknown
    - Comfy dtype: `*`
    - Python dtype: `unknown`
## Output types
- **`selected_value`**
    - Comfy dtype: `*`
    - unknown
    - Python dtype: `unknown`
- **`selected_label`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`selected_index`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


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
