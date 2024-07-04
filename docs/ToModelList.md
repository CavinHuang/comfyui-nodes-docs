
# Documentation
- Class name: ToModelList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False

ToModelList节点旨在将多个与模型相关的输入聚合成一个单一列表。这一功能对于需要同时处理多个模型的操作至关重要，如批处理或模型比较任务。它通过提供一种简化的方式来将多个输入分组，从而抽象掉管理多个输入的复杂性。

# Input types
## Required
- inputs_len
    - 指定要聚合到列表中的模型输入数量。该参数决定了结果列表的大小，并在节点的执行中起着至关重要的作用，因为它规定了将考虑多少个模型输入。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出是一个包含聚合模型输入的列表。这个列表便于需要以统一方式处理多个模型的操作，提高了处理模型集合的灵活性和效率。
    - Comfy dtype: MODEL
    - Python dtype: List[torch.nn.Module]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToModelList(metaclass=MakeListMeta): TYPE = "MODEL"

```
