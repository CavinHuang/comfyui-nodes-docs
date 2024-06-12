---
tags:
- List
---

# FromListGetInts
## Documentation
- Class name: `FromListGetInts`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The `FromListGetInts` node is designed to extract a single integer value from a list of integers based on a specified index. It enables random access within a list, allowing for both direct indexing and reverse access through negative indices, thereby facilitating flexible data retrieval from integer lists.
## Input types
### Required
- **`list`**
    - The list of integers from which a single integer value is to be retrieved. This parameter is essential for specifying the source list for extraction.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The extracted integer value from the specified index within the list.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetInts(metaclass=UnMakeListMeta): TYPE = "INT"

```
