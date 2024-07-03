
# Documentation
- Class name: ExtendIntList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendIntList节点旨在将多个整数列表串联成单个扩展列表。这一功能在需要汇总来自不同来源的整数数据的场景中特别有用，可以实现无缝的数据操作和分析。

# Input types
## Required
- inputs_len
    - 指定要连接的整数列表的数量。该参数决定了将有多少个列表被合并到扩展列表中。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 由所有输入列表汇总而成的连接整数列表。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendIntList(metaclass=ExtendListMeta): TYPE = "INT"

```
