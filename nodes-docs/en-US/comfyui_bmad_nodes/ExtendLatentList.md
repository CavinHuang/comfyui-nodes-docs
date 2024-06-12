---
tags:
- Latent
---

# ExtendLatentList
## Documentation
- Class name: `ExtendLatentList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendLatentList node is designed to extend a list of latent representations. It facilitates the aggregation of additional latent vectors into an existing collection, enabling the expansion of latent datasets for further processing or analysis.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter represents the initial set of latent vectors to be extended. It plays a crucial role in determining the base collection to which new latent vectors will be appended, affecting the node's execution and the resulting extended list.
    - Comfy dtype: `INT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The 'latent' output parameter represents the extended list of latent vectors. It signifies the augmented collection of latent representations after the addition of new vectors.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendLatentList(metaclass=ExtendListMeta): TYPE = "LATENT"

```
