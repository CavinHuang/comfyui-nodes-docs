---
tags:
- ConditionalSelection
---

# Switch (latent/legacy)
## Documentation
- Class name: `LatentSwitch`
- Category: `ImpactPack/Util`
- Output node: `False`

The LatentSwitch node is designed to dynamically select between multiple latent representations based on a given index. It facilitates the manipulation of latent spaces by allowing the selection of specific latent inputs for further processing or output.
## Input types
### Required
- **`select`**
    - Specifies the index of the latent representation to be selected. This index determines which latent input ('latent1', etc.) is used for the node's operation. The range of this index starts from 1, allowing for dynamic selection among potentially numerous latent inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sel_mode`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
### Optional
- **`input1`**
    - The primary latent representation input. This input is crucial for the node's operation as it represents the default or initial latent space to be considered in the absence of additional specified latent inputs.
    - Comfy dtype: `*`
    - Python dtype: `torch.Tensor`
## Output types
- **`selected_value`**
    - Comfy dtype: `*`
    - The selected latent representation based on the 'select' index. If the index is invalid, 'input1' is returned as the default.
    - Python dtype: `torch.Tensor`
- **`selected_label`**
    - Comfy dtype: `STRING`
    - The label of the selected latent representation, indicating which latent input was chosen based on the 'select' index.
    - Python dtype: `str`
- **`selected_index`**
    - Comfy dtype: `INT`
    - The index of the selected latent representation, reflecting the 'select' input value.
    - Python dtype: `int`
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
