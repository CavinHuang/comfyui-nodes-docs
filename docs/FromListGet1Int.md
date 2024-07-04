
# Documentation
- Class name: FromListGet1Int
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Int 节点用于从一个整数列表中检索单个整数值。它根据指定的索引获取列表元素，支持负数索引以便从列表末尾访问元素，提供了灵活的列表元素访问方式。

# Input types
## Required
- list
    - 用于检索整数值的列表。这是操作的核心输入，提供了数据源。
    - Comfy dtype: INT
    - Python dtype: List[int]
- index
    - 指定从列表中检索整数值的索引。支持负值以实现反向访问，直接影响输出整数的选择。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 从列表指定索引处检索到的单个整数值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Int(metaclass=GetSingleFromListMeta): TYPE = "INT"

```
