---
tags:
- ControlNet
---

# SparseCtrl Index Method 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_SparseCtrlIndexMethodNode`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl`
- Output node: `False`

This node is designed to generate a sparse control method based on unique integer indexes. It processes a string of comma-separated indexes, ensuring they are unique and valid, to create a method that selectively applies control based on these specified indexes.
## Input types
### Required
- **`indexes`**
    - Specifies the unique integer indexes as a comma-separated string. These indexes determine the specific elements to which the sparse control method will be applied, ensuring targeted and efficient control.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`sparse_method`**
    - Comfy dtype: `SPARSE_METHOD`
    - The output is a sparse method configured with the specified unique indexes. This method is used to apply control selectively to the elements identified by the indexes.
    - Python dtype: `SparseIndexMethod`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SparseIndexMethodNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "indexes": ("STRING", {"default": "0"}),
            }
        }
    
    RETURN_TYPES = ("SPARSE_METHOD",)
    FUNCTION = "get_method"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl"

    def get_method(self, indexes: str):
        idxs = []
        unique_idxs = set()
        # get indeces from string
        str_idxs = [x.strip() for x in indexes.strip().split(",")]
        for str_idx in str_idxs:
            try:
                idx = int(str_idx)
                if idx in unique_idxs:
                    raise ValueError(f"'{idx}' is duplicated; indexes must be unique.")
                idxs.append(idx)
                unique_idxs.add(idx)
            except ValueError:
                raise ValueError(f"'{str_idx}' is not a valid integer index.")
        if len(idxs) == 0:
            raise ValueError(f"No indexes were listed in Sparse Index Method.")
        return (SparseIndexMethod(idxs),)

```
