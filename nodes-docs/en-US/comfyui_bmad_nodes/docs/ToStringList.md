---
tags:
- List
---

# ToStringList
## Documentation
- Class name: `ToStringList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The ToStringList node is designed to aggregate multiple string inputs into a single list, facilitating operations that require collective handling of strings. It abstracts the complexity of handling individual strings, enabling efficient batch processing and manipulation.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of string inputs to be aggregated into the list. This parameter allows for dynamic adjustment of the list size based on the number of inputs provided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs a list composed of the aggregated string inputs. This list enables further processing or manipulation as a collective entity.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToStringList(metaclass=MakeListMeta): TYPE = "STRING"

```
