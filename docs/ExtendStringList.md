
# Documentation
- Class name: ExtendStringList
- Category: Bmad/Lists/Extend
- Output node: False
- Repo Ref: https://github.com/bmad4ever/Bmad-Comfy-Nodes

ExtendStringList节点的设计目的是将多个字符串列表连接成一个单一的、扩展的列表。这个节点在需要聚合来自不同来源的字符串数据的场景中特别有用，它可以促进涉及集体字符串数据集操作或分析的任务。

# Input types
## Required
- inputs_len
    - 指定要连接的字符串列表的数量。这个参数决定了将有多少个字符串列表被合并到扩展列表中。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 连接所有提供的字符串列表后的结果列表。这个列表按照各自的顺序包含了所有输入列表中的字符串。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendStringList(metaclass=ExtendListMeta): TYPE = "STRING"

```
