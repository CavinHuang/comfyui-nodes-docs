---
tags:
- List
- ListExtension
---

# ExtendFloatList
## Documentation
- Class name: `ExtendFloatList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendFloatList node is designed to concatenate multiple lists of floating-point numbers into a single, extended list. This functionality is particularly useful in scenarios where aggregation of data from various sources is required, allowing for a streamlined and efficient handling of numerical data collections.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of float lists to be concatenated. This parameter determines how many lists will be merged into the extended list, affecting the node's execution and the size of the resulting list.
    - Comfy dtype: `INT`
    - Python dtype: `Tuple[int]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The concatenated list of floating-point numbers, resulting from the aggregation of all input lists.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendFloatList(metaclass=ExtendListMeta): TYPE = "FLOAT"

```
