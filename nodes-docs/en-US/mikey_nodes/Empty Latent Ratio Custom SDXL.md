---
tags:
- Latent
---

# Empty Latent Ratio Custom SDXL (Mikey)
## Documentation
- Class name: `Empty Latent Ratio Custom SDXL`
- Category: `Mikey/Latent`
- Output node: `False`

This node is designed to generate a custom-sized latent representation based on specified width and height dimensions, tailored for the SDXL latent format. It utilizes predefined ratios to adjust the dimensions if they match known ratios, or calculates the appropriate size otherwise, ensuring the generated latent space is optimized for subsequent image generation tasks.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the latent representation. This dimension is used to determine the final size of the latent space, potentially adjusted based on predefined ratios or calculated to fit the SDXL format.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the desired height of the latent representation. Similar to width, this dimension influences the final size of the latent space, adjusted according to predefined ratios or calculated for optimal compatibility with the SDXL format.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Determines the number of latent representations to generate in a single batch. This allows for the generation of multiple latents simultaneously, enhancing efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The generated latent representation, optimized for the SDXL format. It is a tensor structured to facilitate subsequent image synthesis processes.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class EmptyLatentRatioCustom:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        return {"required": { "width": ("INT", {"default": 1024, "min": 1, "max": 8192, "step": 1}),
                              "height": ("INT", {"default": 1024, "min": 1, "max": 8192, "step": 1}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})}}

    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'generate'
    CATEGORY = 'Mikey/Latent'

    def generate(self, width, height, batch_size=1):
        # solver
        if width == 1 and height == 1 or width == height:
            w, h = 1024, 1024
        if f'{width}:{height}' in self.ratio_dict:
            w, h = self.ratio_dict[f'{width}:{height}']
        else:
            w, h = find_latent_size(width, height)
        latent = torch.zeros([batch_size, 4, h // 8, w // 8])
        return ({"samples":latent}, )

```
