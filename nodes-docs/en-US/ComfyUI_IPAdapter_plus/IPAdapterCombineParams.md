---
tags:
- IPAdapter
---

# IPAdapter Combine Params
## Documentation
- Class name: `IPAdapterCombineParams`
- Category: `ipadapter/params`
- Output node: `False`

The IPAdapterCombineParams node is designed to merge multiple sets of parameters for image processing adapters, facilitating the combination of various image attributes and effects into a single, cohesive set. This node simplifies the process of integrating multiple image processing parameters, ensuring a harmonized approach to image adaptation and enhancement.
## Input types
### Required
- **`params_i`**
    - Represents a set of parameters to be combined. Each 'params_i' (where i ranges from 1 to 5) serves as an individual set of image processing attributes, contributing to the merge and enhancing the overall effect.
    - Comfy dtype: `IPADAPTER_PARAMS`
    - Python dtype: `Dict[str, Union[str, List[str], float, bool]]`
### Optional
## Output types
- **`ipadapter_params`**
    - Comfy dtype: `IPADAPTER_PARAMS`
    - The combined set of image processing parameters, resulting from the integration of up to five individual sets. This consolidated output facilitates enhanced and harmonized image adaptation.
    - Python dtype: `Dict[str, Union[str, List[str], float, bool]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterCombineParams:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "params_1": ("IPADAPTER_PARAMS",),
            "params_2": ("IPADAPTER_PARAMS",),
        }, "optional": {
            "params_3": ("IPADAPTER_PARAMS",),
            "params_4": ("IPADAPTER_PARAMS",),
            "params_5": ("IPADAPTER_PARAMS",),
        }}
    
    RETURN_TYPES = ("IPADAPTER_PARAMS",)
    FUNCTION = "combine"
    CATEGORY = "ipadapter/params"

    def combine(self, params_1, params_2, params_3=None, params_4=None, params_5=None):
        ipadapter_params = {
            "image": params_1["image"] + params_2["image"],
            "attn_mask": params_1["attn_mask"] + params_2["attn_mask"],
            "weight": params_1["weight"] + params_2["weight"],
            "weight_type": params_1["weight_type"] + params_2["weight_type"],
            "start_at": params_1["start_at"] + params_2["start_at"],
            "end_at": params_1["end_at"] + params_2["end_at"],
        }

        if params_3 is not None:
            ipadapter_params["image"] += params_3["image"]
            ipadapter_params["attn_mask"] += params_3["attn_mask"]
            ipadapter_params["weight"] += params_3["weight"]
            ipadapter_params["weight_type"] += params_3["weight_type"]
            ipadapter_params["start_at"] += params_3["start_at"]
            ipadapter_params["end_at"] += params_3["end_at"]
        if params_4 is not None:
            ipadapter_params["image"] += params_4["image"]
            ipadapter_params["attn_mask"] += params_4["attn_mask"]
            ipadapter_params["weight"] += params_4["weight"]
            ipadapter_params["weight_type"] += params_4["weight_type"]
            ipadapter_params["start_at"] += params_4["start_at"]
            ipadapter_params["end_at"] += params_4["end_at"]
        if params_5 is not None:
            ipadapter_params["image"] += params_5["image"]
            ipadapter_params["attn_mask"] += params_5["attn_mask"]
            ipadapter_params["weight"] += params_5["weight"]
            ipadapter_params["weight_type"] += params_5["weight_type"]
            ipadapter_params["start_at"] += params_5["start_at"]
            ipadapter_params["end_at"] += params_5["end_at"]

        return (ipadapter_params, )

```
