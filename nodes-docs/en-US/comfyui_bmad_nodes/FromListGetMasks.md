---
tags:
- Mask
- MaskList
---

# FromListGetMasks
## Documentation
- Class name: `FromListGetMasks`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The `FromListGetMasks` node is designed to retrieve a specific mask from a list of masks based on a given index. It enables random access to the list elements, allowing for both forward and reverse indexing, thereby facilitating flexible manipulation and selection of masks within a list.
## Input types
### Required
- **`list`**
    - The list of masks from which a specific mask is to be retrieved. This parameter is crucial for specifying the source list.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask retrieved from the specified index in the list. This output is essential for further processing or manipulation of the selected mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetMasks(metaclass=UnMakeListMeta):  TYPE = "MASK"

```
