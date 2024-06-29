---
tags:
- List
- ListExtension
---

# ExtendStringList
## Documentation
- Class name: `ExtendStringList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendStringList node is designed to concatenate multiple lists of strings into a single, extended list. This node is particularly useful in scenarios where aggregation of string data from various sources is required, facilitating operations that involve the manipulation or analysis of collective string datasets.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of string lists to be concatenated. This parameter determines how many string lists will be combined into the extended list.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting list after concatenating all provided string lists. This list contains all strings from the input lists in their respective order.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendStringList(metaclass=ExtendListMeta): TYPE = "STRING"

```
