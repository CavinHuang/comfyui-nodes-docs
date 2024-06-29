---
tags:
- List
---

# FromListGet1String
## Documentation
- Class name: `FromListGet1String`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

This node is designed to retrieve a single string element from a list based on a specified index. It allows for flexible access to list elements, including support for negative indexing to access elements from the end of the list.
## Input types
### Required
- **`list`**
    - The list from which a string element is to be retrieved. It is essential for specifying the source list.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`index`**
    - The index at which the string element is to be retrieved from the list. Supports negative indexing for reverse access.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string element retrieved from the specified index of the list.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1String(metaclass=GetSingleFromListMeta): TYPE = "STRING"

```
