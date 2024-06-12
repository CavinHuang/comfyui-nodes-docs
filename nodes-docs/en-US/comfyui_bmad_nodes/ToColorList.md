---
tags:
- Color
---

# ToColorList
## Documentation
- Class name: `ToColorList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The `ToColorList` node is designed to transform a collection of color-related data into a structured list format, specifically tailored for handling color information. This node facilitates the organization and manipulation of color data, making it easier to process and utilize in various computational color analysis and manipulation tasks.
## Input types
### Required
- **`inputs_len`**
    - Represents the collection of color data to be transformed into a list. This parameter is crucial for the node's operation as it determines the content of the resulting color list, affecting subsequent processing and analysis.
    - Comfy dtype: `INT`
    - Python dtype: `List[Union[str, Tuple[int, int, int]]]`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - The structured list of color data, organized for efficient processing and manipulation in further color-related computational tasks.
    - Python dtype: `List[Union[str, Tuple[int, int, int]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToColorList(metaclass=MakeListMeta): TYPE = "COLOR"

```
