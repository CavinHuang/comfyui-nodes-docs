
# Documentation
- Class name: FromListGetStrings
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetStrings节点设计用于从字符串列表中检索特定索引的字符串。它抽象了访问列表元素的过程，支持正向和反向索引，从而提高了在工作流中操作字符串列表的灵活性和便捷性。

# Input types
## Required
- list
    - 用于检索特定字符串的字符串列表。作为数据源，它对节点的操作至关重要。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Output types
- string
    - 从列表中指定索引位置检索出的字符串。这个输出对于工作流中的进一步处理或使用至关重要。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetStrings(metaclass=UnMakeListMeta): TYPE = "STRING"

```
