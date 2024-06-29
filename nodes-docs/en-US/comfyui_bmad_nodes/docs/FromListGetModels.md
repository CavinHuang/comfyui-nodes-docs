---
tags:
- Model
- ModelList
---

# FromListGetModels
## Documentation
- Class name: `FromListGetModels`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The node is designed to extract a single model from a list of models based on a specified index. It enables selective retrieval of models from a collection, facilitating operations that require individual model processing.
## Input types
### Required
- **`list`**
    - The list of models from which a single model is to be retrieved. This parameter is crucial for specifying the source collection of models.
    - Comfy dtype: `MODEL`
    - Python dtype: `List[torch.nn.Module]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model extracted from the specified index of the input list. This output is significant for subsequent operations that require a specific model.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetModels(metaclass=UnMakeListMeta):  TYPE = "MODEL"

```
