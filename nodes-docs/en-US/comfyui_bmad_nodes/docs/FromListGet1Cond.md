---
tags:
- Conditioning
---

# FromListGet1Cond
## Documentation
- Class name: `FromListGet1Cond`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

This node is designed to extract a single conditioning element from a list based on a specified index. It enables selective access to conditioning data within a list, facilitating operations that require individual manipulation or inspection of conditioning elements.
## Input types
### Required
- **`list`**
    - The list from which a conditioning element is to be extracted. This parameter is crucial for specifying the source list.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[CONDITIONING]`
- **`index`**
    - The index at which the conditioning element is to be extracted from the list. Supports negative indexing for reverse access.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The extracted conditioning element from the specified index in the list.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Cond(metaclass=GetSingleFromListMeta):  TYPE = "CONDITIONING"

```
