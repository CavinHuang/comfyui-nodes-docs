---
tags:
- List
---

# ToIntList
## Documentation
- Class name: `ToIntList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The `ToIntList` node is designed to aggregate multiple integer inputs into a single list. This functionality is essential for scenarios where a collection of integers needs to be processed or manipulated as a single entity, streamlining operations that involve multiple integer values.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of integer inputs to be aggregated into the list. This parameter determines the size of the resulting list and plays a crucial role in the node's operation by dictating how many integer values will be considered.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is a list composed of the integer inputs provided to the node. This list serves as a consolidated collection of the individual integers, facilitating operations that require handling multiple integers as a unified structure.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToIntList(metaclass=MakeListMeta): TYPE = "INT"

```
