
# Documentation
- Class name: ToMaskList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ToMaskList节点旨在将一系列输入转换为掩码列表。该节点在组织和准备掩码数据以供进一步处理或操作方面发挥着关键作用，确保数据格式正确，可供后续需要掩码输入的节点使用。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数代表将要转换为掩码列表的输入集合。这个参数对节点的操作至关重要，因为它直接影响输出掩码列表的组成，决定了可供进一步处理的数据。
    - Comfy dtype: INT
    - Python dtype: List[torch.Tensor]

# Output types
- mask
    - 输出是一个掩码列表，其结构旨在便于在管道中进行涉及掩码数据的进一步操作。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToMaskList(metaclass=MakeListMeta): TYPE = "MASK"

```
