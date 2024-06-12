---
tags:
- Conditioning
---

# FromListGetConds
## Documentation
- Class name: `FromListGetConds`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

This node is designed to retrieve a single conditioning element from a list based on a specified index. It enables random access to the list elements, including the ability to use negative indices for reverse access, thereby enhancing flexibility in handling conditioning data.
## Input types
### Required
- **`list`**
    - The list from which a conditioning element is to be retrieved. It is essential for specifying the source of data.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[CONDITIONING]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The retrieved conditioning element at the specified index.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetConds(metaclass=UnMakeListMeta):  TYPE = "CONDITIONING"

```
