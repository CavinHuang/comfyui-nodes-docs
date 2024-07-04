
# Documentation
- Class name: ExtendMaskList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendMaskList节点旨在扩展掩码列表，允许将多个掩码元素聚合到一个综合列表中。这一功能对于需要同时操作或分析多个掩码的操作至关重要，为批量处理掩码数据提供了一种简化的方法。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数代表要扩展的掩码元素集合。它在节点操作中起着关键作用，作为主要的数据输入，节点随后会处理这些输入以生成扩展后的掩码列表。
    - Comfy dtype: INT
    - Python dtype: List[torch.Tensor]

# Output types
- mask
    - 输出是一个扩展后的掩码元素列表，整合成单一实体以便于进一步处理或分析。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendMaskList(metaclass=ExtendListMeta): TYPE = "MASK"

```
