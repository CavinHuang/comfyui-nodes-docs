---
tags:
- Latent
---

# Preview Latent XL
## Documentation
- Class name: `PreviewLatentXL`
- Category: `latent`
- Output node: `True`

The PreviewLatentXL node specializes in generating previews of latent representations using the SDXL base model. It enhances the visualization of latent spaces by automatically determining the optimal preview method and incorporating additional information such as prompts and unique identifiers.
## Input types
### Required
- **`latent`**
    - The latent representation to be visualized. This is the core input for generating previews.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representation, potentially adjusted during the preview generation process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PreviewLatentXL(PreviewLatentAdvanced):
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"latent": ("LATENT",),
                     },
                "hidden": {"prompt": "PROMPT",
                           "extra_pnginfo": "EXTRA_PNGINFO",
                           "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    OUTPUT_NODE = True
    FUNCTION = "lpreview_xl"
    CATEGORY = "latent"

    def lpreview_xl(self, latent, prompt=None, extra_pnginfo=None, my_unique_id=None):
        return PreviewLatentAdvanced().lpreview(latent=latent, base_model="SDXL", preview_method="auto", prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id)

```
