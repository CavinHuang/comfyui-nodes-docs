
# Documentation
- Class name: ToIntList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToIntList 节点旨在将多个整数输入汇总成一个单一的列表。这一功能在需要将多个整数作为一个整体进行处理或操作的场景中至关重要，它简化了涉及多个整数值的操作流程。

# Input types
## Required
- inputs_len
    - 指定要聚合到列表中的整数输入的数量。这个参数决定了结果列表的大小，通过规定要考虑的整数值的数量，在节点的操作中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出是由提供给节点的整数输入组成的列表。这个列表作为单个整数的综合集合，有助于需要将多个整数作为统一结构处理的操作。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToIntList(metaclass=MakeListMeta): TYPE = "INT"

```
