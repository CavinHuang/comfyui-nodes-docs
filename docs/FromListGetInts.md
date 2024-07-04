
# Documentation
- Class name: FromListGetInts
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetInts 节点旨在从整数列表中提取特定索引位置的单个整数值。它支持列表的随机访问，允许使用直接索引和负索引进行反向访问，从而实现从整数列表中灵活地检索数据。

# Input types
## Required
- list
    - 这是用于提取单个整数值的整数列表。该参数对于指定提取源列表至关重要。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- int
    - 从列表中指定索引位置提取的整数值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetInts(metaclass=UnMakeListMeta): TYPE = "INT"

```
