
# Documentation
- Class name: ToCondList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToCondList节点旨在从单独的条件输入创建条件数据列表。它简化了将多个条件元素聚合到单个有组织列表中的过程，从而便于在后续处理中更轻松地操作和应用。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数指定要聚合到列表中的单个条件元素的数量。这个参数对于确定结果列表的大小至关重要，从而影响节点的执行和输出的特征。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 输出是一个条件数据列表，由提供给节点的单个条件输入聚合而成。这个列表可以直接用于需要集合格式条件数据的处理过程中。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[CONDITIONING]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToCondList(metaclass=MakeListMeta): TYPE = "CONDITIONING"

```
