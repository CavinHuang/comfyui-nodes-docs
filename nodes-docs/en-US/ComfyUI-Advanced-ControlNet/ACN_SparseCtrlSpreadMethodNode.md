---
tags:
- ControlNet
---

# SparseCtrl Spread Method 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_SparseCtrlSpreadMethodNode`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl`
- Output node: `False`

This node is designed to generate a SparseSpreadMethod instance based on a specified spread strategy. It abstracts the complexity of creating spread patterns for sparse control in advanced control networks, facilitating the customization of spread behaviors for enhanced control and manipulation of network outputs.
## Input types
### Required
- **`spread`**
    - Defines the spread strategy to be used for generating the SparseSpreadMethod. This parameter is crucial for determining the pattern and distribution of control points within the network, affecting the overall behavior and output of the control network.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sparse_method`**
    - Comfy dtype: `SPARSE_METHOD`
    - Returns an instance of SparseSpreadMethod configured according to the specified spread strategy. This output is essential for integrating custom spread behaviors into advanced control networks.
    - Python dtype: `SparseSpreadMethod`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ACN_SparseCtrlLoaderAdvanced](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_SparseCtrlLoaderAdvanced.md)



## Source code
```python
class SparseSpreadMethodNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "spread": (SparseSpreadMethod.LIST,),
            }
        }
    
    RETURN_TYPES = ("SPARSE_METHOD",)
    FUNCTION = "get_method"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl"

    def get_method(self, spread: str):
        return (SparseSpreadMethod(spread=spread),)

```
