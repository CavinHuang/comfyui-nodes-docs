
# Documentation
- Class name: FromListGet1Model
- Category: Bmad/Lists/Get1
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FromListGet1Model节点旨在从模型列表中提取单个模型。它通过指定索引来选择性地检索模型，从而实现对特定兴趣模型的聚焦操作。这种功能对于在大型模型集合中进行精准操作和分析特别有用。

# Input types
## Required
- list
    - list参数代表了一个模型集合，是节点操作的数据源。它对于确定节点的工作范围至关重要，直接影响了可供选择的模型范围。
    - Comfy dtype: MODEL
    - Python dtype: List[torch.nn.Module]
- index
    - index参数决定了要从列表中检索的模型位置。它支持正向和反向索引，为用户提供了灵活的访问方式，无论是想要获取列表开头、结尾还是中间的模型。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出的model是从指定列表中检索出的单个模型。它是节点操作的核心结果，为后续的个性化处理或分析奠定了基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Model(metaclass=GetSingleFromListMeta):  TYPE = "MODEL"

```
