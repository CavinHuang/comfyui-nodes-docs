---
tags:
- Model
- ModelList
---

# FromListGet1Model
## Documentation
- Class name: `FromListGet1Model`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

The node 'FromListGet1Model' is designed to extract a single model from a list of models based on a specified index. It enables selective retrieval from a collection, facilitating focused operations on a particular model of interest.
## Input types
### Required
- **`list`**
    - The 'list' parameter represents the collection of models from which a single model is to be retrieved. It is crucial for specifying the dataset the node will operate on.
    - Comfy dtype: `MODEL`
    - Python dtype: `List[torch.nn.Module]`
- **`index`**
    - The 'index' parameter determines the position of the model to be retrieved from the list. It supports both positive and negative indexing, allowing for flexible access to the collection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - This output represents the single model retrieved from the specified list. It is the focal point of the node's operation, enabling further individualized processing or analysis.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Model(metaclass=GetSingleFromListMeta):  TYPE = "MODEL"

```
