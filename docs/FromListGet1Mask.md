
# Documentation
- Class name: FromListGet1Mask
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Mask节点旨在根据给定索引从掩码列表中检索特定项。它支持随机访问，包括使用负索引从列表末尾访问项目。

# Input types
## Required
- list
    - 将从中检索项目的掩码列表。它对于指定应在哪个列表上执行操作至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
- index
    - 要从列表中检索的项目的索引。支持负值以进行反向访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 从列表中指定索引检索到的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Mask(metaclass=GetSingleFromListMeta):  TYPE = "MASK"

```
