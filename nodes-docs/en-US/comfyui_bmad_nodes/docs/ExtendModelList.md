---
tags:
- Model
- ModelList
---

# ExtendModelList
## Documentation
- Class name: `ExtendModelList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendModelList node is designed to aggregate multiple lists of models into a single, extended list. This functionality is crucial for scenarios where combining model lists is necessary to form a comprehensive collection of models for further processing or analysis.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of model lists to be combined. It determines how many lists will be aggregated into the extended list.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The combined list of models, aggregating all input model lists into a single, extended collection.
    - Python dtype: `List[torch.nn.Module]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendModelList(metaclass=ExtendListMeta): TYPE = "MODEL"

```
