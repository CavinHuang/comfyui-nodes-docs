---
tags:
- Latent
---

# 🔧 SDXL Empty Latent Size Picker
## Documentation
- Class name: `SDXLEmptyLatentSizePicker+`
- Category: `essentials`
- Output node: `False`

This node is designed to generate a tensor representing an empty latent space of a specified size, tailored for use in generative models. It allows for the dynamic creation of latent spaces based on resolution and batch size inputs, facilitating the generation of content at varying dimensions.
## Input types
### Required
- **`resolution`**
    - Specifies the resolution of the generated latent space, influencing the dimensions of the output tensor. The choice of resolution directly impacts the size and aspect ratio of the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_size`**
    - Determines the number of latent spaces to generate in a single batch, allowing for efficient bulk generation of content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The generated empty latent space tensor, ready for further processing or generation tasks.
    - Python dtype: `torch.Tensor`
- **`width`**
    - Comfy dtype: `INT`
    - The width dimension of the generated latent space, derived from the specified resolution.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height dimension of the generated latent space, derived from the specified resolution.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SDXLEmptyLatentSizePicker:
    def __init__(self):
        self.device = comfy.model_management.intermediate_device()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "resolution": (["704x1408 (0.5)","704x1344 (0.52)","768x1344 (0.57)","768x1280 (0.6)","832x1216 (0.68)","832x1152 (0.72)","896x1152 (0.78)","896x1088 (0.82)","960x1088 (0.88)","960x1024 (0.94)","1024x1024 (1.0)","1024x960 (1.07)","1088x960 (1.13)","1088x896 (1.21)","1152x896 (1.29)","1152x832 (1.38)","1216x832 (1.46)","1280x768 (1.67)","1344x768 (1.75)","1344x704 (1.91)","1408x704 (2.0)","1472x704 (2.09)","1536x640 (2.4)","1600x640 (2.5)","1664x576 (2.89)","1728x576 (3.0)",], {"default": "1024x1024 (1.0)"}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
            }}

    RETURN_TYPES = ("LATENT","INT","INT",)
    RETURN_NAMES = ("LATENT","width", "height",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, resolution, batch_size):
        width, height = resolution.split(" ")[0].split("x")
        width = int(width)
        height = int(height)

        latent = torch.zeros([batch_size, 4, height // 8, width // 8], device=self.device)

        return ({"samples":latent}, width, height,)

```
