---
tags:
- List
- ListExtension
---

# ExtendIntList
## Documentation
- Class name: `ExtendIntList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendIntList node is designed to concatenate multiple lists of integers into a single, extended list. This functionality is useful in scenarios where aggregation of integer data from various sources is required, enabling seamless data manipulation and analysis.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of integer lists to be concatenated. This parameter determines how many lists will be combined into the extended list.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The concatenated list of integers, resulting from the aggregation of all input lists.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendIntList(metaclass=ExtendListMeta): TYPE = "INT"

```
