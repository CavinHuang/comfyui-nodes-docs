---
tags:
- IPAdapter
---

# IPAdapter Combine Embeds
## Documentation
- Class name: `IPAdapterCombineEmbeds`
- Category: `ipadapter/embeds`
- Output node: `False`

The IPAdapterCombineEmbeds node is designed to merge multiple embedding vectors into a single, unified representation. This process enhances the ability to manipulate and generate images by combining various aspects of input embeddings, thereby enabling more complex and nuanced image synthesis.
## Input types
### Required
- **`embed1`**
    - The 'embed1' parameter represents the primary embedding vector to be combined with others. It serves as the foundational vector for the combination process, influencing the final, unified embedding output.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`method`**
    - The 'method' parameter specifies the technique used to combine the embedding vectors, such as 'concat', 'add', 'subtract', 'average', 'norm average', 'max', or 'min'. This choice determines how the embeddings are merged, affecting the characteristics of the resulting vector.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`embed2`**
    - The 'embed2' parameter represents an optional additional embedding vector to be combined with 'embed1'. It contributes to the diversity and richness of the final embedding output.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `Optional[torch.Tensor]`
- **`embed3`**
    - The 'embed3' parameter is another optional embedding vector that can be combined with 'embed1' and potentially 'embed2', further enriching the final embedding output.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `Optional[torch.Tensor]`
- **`embed4`**
    - The 'embed4' parameter provides an option to include yet another embedding vector in the combination process, adding to the complexity and detail of the resulting unified embedding.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `Optional[torch.Tensor]`
- **`embed5`**
    - The 'embed5' parameter allows for the inclusion of a fifth embedding vector, maximizing the potential for creating a highly nuanced and detailed final embedding output.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`embeds`**
    - Comfy dtype: `EMBEDS`
    - The output 'embeds' represents the unified embedding vector resulting from the combination of input embeddings according to the specified method. This combined embedding can be used for advanced image manipulation and generation tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterCombineEmbeds:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "embed1": ("EMBEDS",),
            "method": (["concat", "add", "subtract", "average", "norm average", "max", "min"], ),
        },
        "optional": {
            "embed2": ("EMBEDS",),
            "embed3": ("EMBEDS",),
            "embed4": ("EMBEDS",),
            "embed5": ("EMBEDS",),
        }}

    RETURN_TYPES = ("EMBEDS",)
    FUNCTION = "batch"
    CATEGORY = "ipadapter/embeds"

    def batch(self, embed1, method, embed2=None, embed3=None, embed4=None, embed5=None):
        if method=='concat' and embed2 is None and embed3 is None and embed4 is None and embed5 is None:
            return (embed1, )

        embeds = [embed1, embed2, embed3, embed4, embed5]
        embeds = [embed for embed in embeds if embed is not None]
        embeds = torch.cat(embeds, dim=0)

        if method == "add":
            embeds = torch.sum(embeds, dim=0).unsqueeze(0)
        elif method == "subtract":
            embeds = embeds[0] - torch.mean(embeds[1:], dim=0)
            embeds = embeds.unsqueeze(0)
        elif method == "average":
            embeds = torch.mean(embeds, dim=0).unsqueeze(0)
        elif method == "norm average":
            embeds = torch.mean(embeds / torch.norm(embeds, dim=0, keepdim=True), dim=0).unsqueeze(0)
        elif method == "max":
            embeds = torch.max(embeds, dim=0).values.unsqueeze(0)
        elif method == "min":
            embeds = torch.min(embeds, dim=0).values.unsqueeze(0)

        return (embeds, )

```
