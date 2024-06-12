---
tags:
- Latent
---

# Get latent size
## Documentation
- Class name: `DF_Get_latent_size`
- Category: `Derfuu_Nodes/Functions`
- Output node: `False`

The node `DF_Get_latent_size` is designed to calculate and return the dimensions of a latent representation, either in its original size or scaled. It abstracts the complexity of handling latent data structures to provide straightforward access to their size attributes.
## Input types
### Required
- **`latent`**
    - The latent input represents the data structure for which the size is being calculated. It is crucial for determining the dimensions based on the latent's current state.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict`
- **`original`**
    - This boolean parameter dictates whether the original size of the latent is returned or if it is scaled. It affects the calculation by potentially altering the dimensions returned.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
## Output types
- **`WIDTH`**
    - Comfy dtype: `INT`
    - Represents the width dimension of the latent's size.
    - Python dtype: `int`
- **`HEIGHT`**
    - Comfy dtype: `INT`
    - Represents the height dimension of the latent's size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetLatentSize:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": Field.latent(),
                "original": Field.field([False, True]),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("WIDTH", "HEIGHT")
    CATEGORY = TREE_FUNCTIONS

    FUNCTION = 'get_size'

    def get_size(self, latent, original):
        size = sizes.get_latent_size(latent, original)
        return (size[0], size[1],)

```
