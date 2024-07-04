
# Documentation
- Class name: FromListGetModels
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetModels节点旨在从模型列表中提取单个模型，基于指定的索引。它实现了从集合中选择性地检索模型的功能，有助于需要对单个模型进行处理的操作。

# Input types
## Required
- list
    - 这是需要从中检索单个模型的模型列表。该参数对于指定模型的源集合至关重要。
    - Comfy dtype: MODEL
    - Python dtype: List[torch.nn.Module]

# Output types
- model
    - 从输入列表的指定索引处提取的模型。这个输出对于后续需要特定模型的操作非常重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetModels(metaclass=UnMakeListMeta):  TYPE = "MODEL"

```
