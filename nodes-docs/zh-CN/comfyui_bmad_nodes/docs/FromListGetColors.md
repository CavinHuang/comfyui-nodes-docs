
# Documentation
- Class name: FromListGetColors
- Category: Bmad/Lists/GetAll
- Output node: False

该节点旨在从列表中提取颜色信息，便于进一步处理或分析颜色数据。

# Input types
## Required
- list
    - 需要提取颜色信息的列表。这个参数对于指定节点将处理的颜色数据源至关重要。
    - Comfy dtype: COLOR
    - Python dtype: List[str]

# Output types
- color
    - 从输入列表中提取的颜色数据列表。这个输出对于需要颜色信息的下游任务非常重要。
    - Comfy dtype: COLOR
    - Python dtype: List[Tuple[int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetColors(metaclass=UnMakeListMeta):  TYPE = "COLOR"

```
