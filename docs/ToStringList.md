
# Documentation
- Class name: ToStringList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToStringList节点旨在将多个字符串输入聚合为单个列表，从而便于进行需要集体处理字符串的操作。它抽象了处理单个字符串的复杂性，实现了高效的批处理和操作。

# Input types
## Required
- inputs_len
    - 指定要聚合到列表中的字符串输入数量。此参数允许根据提供的输入数量动态调整列表大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 输出由聚合的字符串输入组成的列表。该列表可以作为一个整体进行进一步的处理或操作。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToStringList(metaclass=MakeListMeta): TYPE = "STRING"

```
