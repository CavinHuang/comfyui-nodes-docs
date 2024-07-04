
# Documentation
- Class name: ExtendLatentList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendLatentList节点旨在扩展潜在表示的列表。它能够将额外的潜在向量聚合到现有集合中，从而实现潜在数据集的扩展，以便进行进一步的处理或分析。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数代表要扩展的初始潜在向量集。它在确定新潜在向量将被添加到的基础集合方面起着至关重要的作用，影响着节点的执行过程和最终的扩展列表结果。
    - Comfy dtype: INT
    - Python dtype: List[torch.Tensor]

# Output types
- latent
    - 'latent'输出参数代表扩展后的潜在向量列表。它表示在添加新向量后得到的增强潜在表示集合。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendLatentList(metaclass=ExtendListMeta): TYPE = "LATENT"

```
