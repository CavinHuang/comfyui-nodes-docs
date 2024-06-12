---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# FromListGet1Float
## Documentation
- Class name: `FromListGet1Float`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

The `FromListGet1Float` node is designed to retrieve a single float value from a list based on a specified index. It allows for random access within the list, including the use of negative indices to access elements in reverse order, thereby enhancing flexibility in data manipulation.
## Input types
### Required
- **`list`**
    - The list from which a float value is to be retrieved. This parameter is essential for specifying the source list.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
- **`index`**
    - The index at which the float value is to be retrieved from the list. Supports negative indexing for reverse access.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The float value retrieved from the specified index in the list.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Float(metaclass=GetSingleFromListMeta): TYPE = "FLOAT"

```
