---
tags:
- Latent
---

# Empty Latent Ratio Select SDXL (Mikey)
## Documentation
- Class name: `Empty Latent Ratio Select SDXL`
- Category: `Mikey/Latent`
- Output node: `False`

This node is designed to generate a tensor representing an empty latent space based on a selected ratio from predefined options. It facilitates the creation of a latent space with specific dimensions that adhere to a user-selected aspect ratio, enabling the generation of content with desired proportions.
## Input types
### Required
- **`ratio_selected`**
    - Specifies the aspect ratio for the latent space to be generated. It determines the dimensions of the resulting latent space, ensuring that the generated content aligns with the selected proportions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`batch_size`**
    - Determines the number of latent spaces to generate in a single batch. It allows for the efficient creation of multiple latent spaces with the same dimensions in one operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The generated tensor representing the empty latent space. It is structured to match the dimensions dictated by the selected aspect ratio and batch size.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [LatentUpscaleBy](../../Comfy/Nodes/LatentUpscaleBy.md)



## Source code
```python
class EmptyLatentRatioSelector:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        return {'required': {'ratio_selected': (s.ratio_sizes,),
                             "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})}}

    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Latent'

    def generate(self, ratio_selected, batch_size=1):
        width = self.ratio_dict[ratio_selected]["width"]
        height = self.ratio_dict[ratio_selected]["height"]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({"samples":latent}, )

```
