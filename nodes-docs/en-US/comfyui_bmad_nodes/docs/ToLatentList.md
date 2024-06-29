---
tags:
- Latent
---

# ToLatentList
## Documentation
- Class name: `ToLatentList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The `ToLatentList` node is designed to aggregate individual latent representations into a structured list format. This node facilitates the organization and manipulation of latent data by converting disparate latent samples into a cohesive list, making it easier to handle and process multiple latent samples collectively.
## Input types
### Required
- **`inputs_len`**
    - The `inputs_len` parameter represents the individual latent samples to be aggregated into a list. This parameter is crucial for collecting and structuring latent data into a format that is more manageable for further processing or analysis.
    - Comfy dtype: `INT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The `latent` output represents the aggregated list of latent samples. This structured format allows for easier manipulation and analysis of multiple latent samples as a collective unit.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToLatentList(metaclass=MakeListMeta): TYPE = "LATENT"

```
