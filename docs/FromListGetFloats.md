
# Documentation
- Class name: FromListGetFloats
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetFloats节点用于从浮点数列表中检索特定索引位置的浮点值。它支持随机访问列表元素，包括使用负索引进行反向访问，从而增强了数据操作的灵活性。

# Input types
## Required
- list
    - 这是一个浮点数列表，用于检索特定的值。它是指定要访问的数据集的关键输入。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Output types
- float
    - 从列表中指定索引位置检索到的浮点值。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetFloats(metaclass=UnMakeListMeta): TYPE = "FLOAT"

```
