
# Documentation
- Class name: ToFloatList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToFloatList节点设计用于将单个浮点值聚合成一个列表，便于需要对多个浮点条目进行集体处理或操作的场景。该节点作为一个实用工具，将离散的浮点输入转换为结构化的列表格式，从而在后续的计算任务中实现更高效的处理和应用。

# Input types
## Required
- inputs_len
    - 指定要聚合到列表中的浮点输入数量。该参数决定了生成的浮点列表的大小，允许基于输入数量动态创建列表。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 生成一个由聚合的浮点输入组成的列表。这个列表作为浮点值的结构化集合，可以在后续操作中进行进一步的处理或操作。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToFloatList(metaclass=MakeListMeta): TYPE = "FLOAT"

```
