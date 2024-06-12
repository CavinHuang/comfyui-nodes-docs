---
tags:
- Latent
---

# FromListGet1Latent
## Documentation
- Class name: `FromListGet1Latent`
- Category: `Bmad/Lists/Get1`
- Output node: `False`

This node is designed to extract a single latent representation from a list of latents. It simplifies the process of selecting a specific latent item for further operations or analysis, making it easier to work with collections of latent representations.
## Input types
### Required
- **`list`**
    - The list of latent representations from which a single latent is to be extracted. This parameter is crucial for specifying the source of the latent to be selected.
    - Comfy dtype: `LATENT`
    - Python dtype: `List[torch.Tensor]`
- **`index`**
    - The index of the latent representation to be extracted from the list. This parameter determines which item in the list is selected.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The single latent representation extracted from the provided list. This output is essential for downstream tasks that require a specific latent item.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Latent(metaclass=GetSingleFromListMeta):  TYPE = "LATENT"

```
