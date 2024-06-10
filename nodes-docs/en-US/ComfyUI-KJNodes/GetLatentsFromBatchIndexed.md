---
tags:
- Latent
- LatentBatch
---

# GetLatentsFromBatchIndexed
## Documentation
- Class name: `GetLatentsFromBatchIndexed`
- Category: `KJNodes`
- Output node: `False`

This node is designed to select and return specific latents from a given batch based on provided indices. It facilitates the extraction of a subset of latents for further processing or analysis, making it a crucial component for operations requiring targeted manipulation or inspection of latent spaces.
## Input types
### Required
- **`latents`**
    - The 'latents' parameter represents the batch of latents from which specific items will be selected. It is crucial for determining the scope of latents available for selection.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`indexes`**
    - The 'indexes' parameter specifies the indices of the latents to be selected from the batch. It plays a key role in identifying which latents are to be extracted and processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified version of the input latent batch, containing only the latents at the specified indices.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetLatentsFromBatchIndexed:
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "indexedlatentsfrombatch"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Selects and returns the latents at the specified indices as an latent batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "latents": ("LATENT",),
                 "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
        },
    } 
    
    def indexedlatentsfrombatch(self, latents, indexes):
        
        samples = latents.copy()
        latent_samples = samples["samples"] 

        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Select the latents at the specified indices
        chosen_latents = latent_samples[indices_tensor]

        samples["samples"] = chosen_latents
        return (samples,)

```
