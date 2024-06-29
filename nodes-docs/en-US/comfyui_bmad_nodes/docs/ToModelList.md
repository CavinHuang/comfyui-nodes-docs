---
tags:
- Model
- ModelList
---

# ToModelList
## Documentation
- Class name: `ToModelList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The `ToModelList` node is designed to aggregate multiple model-related inputs into a single list. This functionality is essential for operations that require handling a collection of models simultaneously, such as batch processing or model comparison tasks. It abstracts away the complexity of managing multiple inputs by providing a streamlined way to group them together.
## Input types
### Required
- **`inputs_len`**
    - Specifies the number of model inputs to be aggregated into the list. This parameter determines the size of the resulting list and plays a crucial role in the node's execution by dictating how many model inputs will be considered.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a list containing the aggregated model inputs. This list facilitates operations that need to process multiple models in a unified manner, enhancing flexibility and efficiency in handling model collections.
    - Python dtype: `List[torch.nn.Module]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToModelList(metaclass=MakeListMeta): TYPE = "MODEL"

```
