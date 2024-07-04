
# Documentation
- Class name: FromListGet1Cond
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Cond节点旨在从给定列表中根据指定索引提取单个条件元素。它实现了对列表中条件数据的选择性访问，便于需要单独操作或检查条件元素的操作。

# Input types
## Required
- list
    - 需要提取条件元素的源列表。这个参数对于指定源列表至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[CONDITIONING]
- index
    - 指定从列表中提取条件元素的索引。支持负索引以实现反向访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 从列表指定索引处提取的条件元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Cond(metaclass=GetSingleFromListMeta):  TYPE = "CONDITIONING"

```
