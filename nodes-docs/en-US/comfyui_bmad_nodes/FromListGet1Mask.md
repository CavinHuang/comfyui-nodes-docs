---
tags:
- Mask
- MaskList
---

# FromListGet1Mask
## Documentation
- Class name: `FromListGet1Mask`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

The node is designed to retrieve a specific item from a list of masks based on the provided index. It supports random access, including the use of negative indices to access items from the end of the list.
## Input types
### Required
- **`list`**
    - The list of masks from which an item will be retrieved. It is essential for specifying which list the operation should be performed on.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`index`**
    - The index of the item to retrieve from the list. Supports negative values for reverse access.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask retrieved from the specified index in the list.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Mask(metaclass=GetSingleFromListMeta):  TYPE = "MASK"

```
