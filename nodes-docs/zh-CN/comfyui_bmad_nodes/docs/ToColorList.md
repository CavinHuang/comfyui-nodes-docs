
# Documentation
- Class name: ToColorList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToColorList节点旨在将一组颜色相关数据转换成结构化的列表格式，专门用于处理颜色信息。该节点有助于组织和操作颜色数据，使其在各种计算机颜色分析和处理任务中更易于处理和使用。

# Input types
## Required
- inputs_len
    - 代表要转换为列表的颜色数据集合。这个参数对节点的操作至关重要，因为它决定了生成的颜色列表的内容，进而影响后续的处理和分析。
    - Comfy dtype: INT
    - Python dtype: List[Union[str, Tuple[int, int, int]]]

# Output types
- color
    - 结构化的颜色数据列表，经过组织以便于在后续的颜色相关计算任务中进行高效处理和操作。
    - Comfy dtype: COLOR
    - Python dtype: List[Union[str, Tuple[int, int, int]]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToColorList(metaclass=MakeListMeta): TYPE = "COLOR"

```
