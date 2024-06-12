---
tags:
- Color
---

# FromListGet1Color
## Documentation
- Class name: `FromListGet1Color`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

The node is designed to retrieve a single color value from a list of colors based on a specified index. It abstracts the process of accessing list elements, allowing for direct retrieval of color information in a user-friendly manner.
## Input types
### Required
- **`list`**
    - This parameter represents the list of colors from which a single color will be retrieved. The list must contain color values, and the node will access one of these based on the provided index.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[str]`
- **`index`**
    - The index parameter specifies the position in the color list from which to retrieve the color. It supports both positive and negative indexing, enabling access to list elements from the beginning or end.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - The output is a single color value retrieved from the specified position in the input list of colors.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Color(metaclass=GetSingleFromListMeta):  TYPE = "COLOR"

```
