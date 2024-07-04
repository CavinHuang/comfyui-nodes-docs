
# Documentation
- Class name: FromListGet1Float
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Float节点旨在从给定列表中根据指定索引提取单个浮点值。它支持列表的随机访问，包括使用负索引来逆序访问元素，从而增强了数据操作的灵活性。

# Input types
## Required
- list
    - 用于提取浮点值的源列表。这个参数对于指定数据来源至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- index
    - 指定从列表中提取浮点值的索引位置。支持负索引以实现逆序访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 从列表指定索引位置提取的浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Float(metaclass=GetSingleFromListMeta): TYPE = "FLOAT"

```
