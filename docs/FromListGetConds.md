
# Documentation
- Class name: FromListGetConds
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetConds 节点用于从指定列表中获取单个条件元素。它可以根据给定的索引随机访问列表元素，支持使用负索引进行反向访问，从而增强了处理条件数据的灵活性。

# Input types
## Required
- list
    - 用于检索条件元素的列表。它是指定数据源的关键输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[CONDITIONING]

# Output types
- conditioning
    - 在指定索引处检索到的条件元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetConds(metaclass=UnMakeListMeta):  TYPE = "CONDITIONING"

```
