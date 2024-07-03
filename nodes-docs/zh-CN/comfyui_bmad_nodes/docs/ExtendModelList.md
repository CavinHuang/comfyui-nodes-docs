
# Documentation
- Class name: ExtendModelList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendModelList节点旨在将多个模型列表聚合成一个单一的扩展列表。这一功能对于需要合并模型列表以形成全面的模型集合以供进一步处理或分析的场景至关重要。

# Input types
## Required
- inputs_len
    - 指定要合并的模型列表数量。它决定了有多少个列表将被聚合到扩展列表中。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 合并后的模型列表，将所有输入的模型列表聚合成一个单一的扩展集合。
    - Comfy dtype: MODEL
    - Python dtype: List[torch.nn.Module]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendModelList(metaclass=ExtendListMeta): TYPE = "MODEL"

```
