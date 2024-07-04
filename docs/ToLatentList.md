
# Documentation
- Class name: ToLatentList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToLatentList节点旨在将单独的潜在表示聚合成一个结构化的列表格式。该节点通过将分散的潜在样本转换为一个连贯的列表，便于处理和操作多个潜在样本，从而促进了潜在数据的组织和处理。

# Input types
## Required
- inputs_len
    - inputs_len参数代表了需要被聚合成列表的单独潜在样本。这个参数对于收集和构建潜在数据到一个更易管理的格式中至关重要，便于进一步的处理或分析。
    - Comfy dtype: INT
    - Python dtype: List[torch.Tensor]

# Output types
- latent
    - 输出的latent参数代表了聚合后的潜在样本列表。这种结构化的格式允许更容易地将多个潜在样本作为一个整体进行操作和分析。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToLatentList(metaclass=MakeListMeta): TYPE = "LATENT"

```
