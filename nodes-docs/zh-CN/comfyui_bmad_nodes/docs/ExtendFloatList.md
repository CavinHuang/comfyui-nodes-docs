
# Documentation
- Class name: ExtendFloatList
- Category: Bmad/Lists/Extend
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

ExtendFloatList节点旨在将多个浮点数列表连接成一个单一的扩展列表。这一功能在需要聚合来自不同来源的数据的场景中特别有用，能够实现对数值数据集合的高效、流畅处理。

# Input types
## Required
- inputs_len
    - 指定要连接的浮点数列表的数量。这个参数决定了有多少个列表将被合并到扩展列表中，从而影响节点的执行过程和最终生成的列表大小。
    - Comfy dtype: INT
    - Python dtype: Tuple[int]

# Output types
- float
    - 由所有输入列表聚合而成的连接浮点数列表。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendFloatList(metaclass=ExtendListMeta): TYPE = "FLOAT"

```
