
# Documentation
- Class name: FromListGetLatents
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetLatents节点旨在从提供的列表中提取多个潜在表示。它支持选择和操作潜在数据结构，便于进行潜在向量的检索、分析和转换等操作。

# Input types
## Required
- list
    - 指定要从中提取元素的潜在表示列表。此参数对于定义要操作的潜在数据源至关重要。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]

# Output types
- latent
    - 从指定列表中提取的潜在表示。这个输出对于潜在向量的进一步处理或分析非常重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetLatents(metaclass=UnMakeListMeta):  TYPE = "LATENT"

```
