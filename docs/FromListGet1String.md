
# Documentation
- Class name: FromListGet1String
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1String 节点旨在从给定列表中根据指定索引检索单个字符串元素。它支持灵活的列表元素访问方式，包括使用负索引从列表末尾访问元素。

# Input types
## Required
- list
    - 待检索字符串元素的源列表。这是指定源列表的关键输入。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- index
    - 用于从列表中检索字符串元素的索引。支持使用负索引进行反向访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 从列表指定索引位置检索到的字符串元素。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1String(metaclass=GetSingleFromListMeta): TYPE = "STRING"

```
