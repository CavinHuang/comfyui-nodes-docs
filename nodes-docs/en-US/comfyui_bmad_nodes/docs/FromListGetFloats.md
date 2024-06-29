---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# FromListGetFloats
## Documentation
- Class name: `FromListGetFloats`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The `FromListGetFloats` node is designed to retrieve a specific float value from a list of floats based on the provided index. It enables random access within a list, including the ability to use negative indices for reverse access, thereby enhancing flexibility in data manipulation.
## Input types
### Required
- **`list`**
    - The list of floats from which a specific value is to be retrieved. It is essential for specifying the data set to be accessed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
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
class FromListGetFloats(metaclass=UnMakeListMeta): TYPE = "FLOAT"

```
