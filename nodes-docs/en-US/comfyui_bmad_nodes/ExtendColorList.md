---
tags:
- List
- ListExtension
---

# ExtendColorList
## Documentation
- Class name: `ExtendColorList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendColorList node is designed to augment an existing list of colors by adding more color values to it. This functionality is essential in scenarios where a dynamic expansion of color selections is required, such as in image processing, design applications, or data visualization tasks, where a broader palette may enhance the output's aesthetic or informational value.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of color values to be added to the existing color list. This parameter determines the size of the expansion of the color palette.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - The augmented list of colors, combining the original color list with the newly added color values. This output is significant for subsequent use in applications requiring a broader or modified color palette.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendColorList(metaclass=ExtendListMeta): TYPE = "COLOR"

```
