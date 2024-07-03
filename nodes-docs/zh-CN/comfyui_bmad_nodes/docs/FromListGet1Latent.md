
# Documentation
- Class name: FromListGet1Latent
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Latent节点用于从潜在表示列表中提取单个潜在表示。它简化了从潜在表示集合中选择特定潜在项的过程，使得对潜在表示集合的操作和分析更加便捷。

# Input types
## Required
- list
    - 用于提取单个潜在表示的潜在表示列表。该参数对于指定要选择的潜在表示的来源至关重要。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]
- index
    - 要从列表中提取的潜在表示的索引。该参数决定了从列表中选择哪一项。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 从提供的列表中提取的单个潜在表示。这个输出对于需要特定潜在项的下游任务至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Latent(metaclass=GetSingleFromListMeta):  TYPE = "LATENT"

```
