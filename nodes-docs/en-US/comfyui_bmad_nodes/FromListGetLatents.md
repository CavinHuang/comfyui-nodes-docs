---
tags:
- Latent
---

# FromListGetLatents
## Documentation
- Class name: `FromListGetLatents`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

The node 'FromListGetLatents' is designed to extract multiple latent representations from a provided list. It enables the selection and manipulation of latent data structures, facilitating operations such as retrieval, analysis, and transformation of latent vectors.
## Input types
### Required
- **`list`**
    - Specifies the list of latent representations from which to extract elements. This parameter is crucial for defining the source of latent data to be operated on.
    - Comfy dtype: `LATENT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The extracted latent representations from the specified list. This output is significant for further processing or analysis of the latent vectors.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetLatents(metaclass=UnMakeListMeta):  TYPE = "LATENT"

```
