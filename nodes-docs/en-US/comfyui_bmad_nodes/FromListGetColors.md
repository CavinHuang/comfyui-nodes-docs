---
tags:
- Color
---

# FromListGetColors
## Documentation
- Class name: `FromListGetColors`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

This node is designed to extract color information from a list, facilitating the retrieval of color data for further processing or analysis.
## Input types
### Required
- **`list`**
    - The list from which color information is to be extracted. This parameter is crucial for specifying the source of color data the node will process.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[str]`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - A list of extracted color data from the input list. This output is significant for downstream tasks that require color information.
    - Python dtype: `List[Tuple[int, int, int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetColors(metaclass=UnMakeListMeta):  TYPE = "COLOR"

```
