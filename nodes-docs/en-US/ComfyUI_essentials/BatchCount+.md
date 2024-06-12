---
tags:
- Counting
---

# 🔧 Batch Count
## Documentation
- Class name: `BatchCount+`
- Category: `essentials`
- Output node: `False`

The BatchCount+ node is designed to count the number of elements in a batch. It can handle various data structures, including tensors, dictionaries, and lists, making it versatile for different types of batched data.
## Input types
### Required
- **`batch`**
    - The 'batch' parameter represents the batch of data whose size is to be counted. It can be a tensor, a dictionary containing 'samples', or a list, accommodating a wide range of data structures.
    - Comfy dtype: `*`
    - Python dtype: `Union[torch.Tensor, Dict[str, Any], List[Any]]`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - This output represents the count of elements in the input batch, providing a straightforward way to determine the batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchCount:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch": (any, {}),
            },
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, batch):
        count = 0
        if hasattr(batch, 'shape'):
            count = batch.shape[0]
        elif isinstance(batch, dict) and 'samples' in batch:
            count = batch['samples'].shape[0]
        elif isinstance(batch, list) or isinstance(batch, dict):
            count = len(batch)

        return (count, )

```
