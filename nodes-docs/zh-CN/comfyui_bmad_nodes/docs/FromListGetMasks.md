
# Documentation
- Class name: FromListGetMasks
- Category: Bmad/Lists/GetAll
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

FromListGetMasks 节点旨在从给定的遮罩列表中检索特定遮罩。它支持列表元素的随机访问，允许正向和反向索引，从而实现对列表中遮罩的灵活操作和选择。

# Input types
## Required
- list
    - 这是要从中检索特定遮罩的遮罩列表。该参数对于指定源列表至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Output types
- mask
    - 从列表中指定索引处检索到的遮罩。这个输出对于进一步处理或操作所选遮罩至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetMasks(metaclass=UnMakeListMeta):  TYPE = "MASK"

```
