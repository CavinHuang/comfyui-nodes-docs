---
tags:
- List
---

# FromListGet1Int
## Documentation
- Class name: `FromListGet1Int`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

This node is designed to retrieve a single integer value from a list based on a specified index. It allows for flexible access to list elements, including support for negative indexing to access elements from the end of the list.
## Input types
### Required
- **`list`**
    - The list from which an integer value is to be retrieved. It is essential for the operation as it provides the data source.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`index`**
    - The index at which the integer value is to be retrieved from the list. Supports negative values for reverse access, affecting the selection of the output integer.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The single integer value retrieved from the specified index of the list.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Int(metaclass=GetSingleFromListMeta): TYPE = "INT"

```
