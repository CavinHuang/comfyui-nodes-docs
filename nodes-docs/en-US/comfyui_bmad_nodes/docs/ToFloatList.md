---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# ToFloatList
## Documentation
- Class name: `ToFloatList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The `ToFloatList` node is designed to aggregate individual float values into a list, facilitating operations that require collective processing or manipulation of multiple float entries. This node serves as a utility for converting discrete float inputs into a structured list format, enabling more efficient handling and application in subsequent computational tasks.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of float inputs to be aggregated into the list. This parameter determines the size of the resulting float list, allowing for dynamic list creation based on the input count.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Produces a list composed of the aggregated float inputs. This list serves as a structured collection of float values, ready for further processing or manipulation in subsequent operations.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToFloatList(metaclass=MakeListMeta): TYPE = "FLOAT"

```
