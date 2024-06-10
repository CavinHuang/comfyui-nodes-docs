---
tags:
- Latent
---

# Empty Latent Image (Big Batch) 🎭🅐🅓
## Documentation
- Class name: `ADE_EmptyLatentImageLarge`
- Category: `Animate Diff 🎭🅐🅓/extras`
- Output node: `False`

The ADE_EmptyLatentImageLarge node is designed to initialize a large latent image tensor with zeros. This tensor serves as a blank canvas for further generative processes, allowing for the creation and manipulation of images at a latent level.
## Input types
### Required
- **`width`**
    - Specifies the width of the latent image to be generated. It determines the horizontal dimension of the resulting tensor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the latent image. It affects the vertical dimension of the resulting tensor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Controls the number of latent images to generate in a single batch. It influences the first dimension of the resulting tensor, allowing for batch processing of multiple images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a tensor representing a batch of blank latent images. Each image is initialized with zeros, ready for subsequent generative modifications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [BatchPromptScheduleLatentInput](../../ComfyUI_FizzNodes/Nodes/BatchPromptScheduleLatentInput.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class EmptyLatentImageLarge:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 64, "max": comfy_nodes.MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 512, "min": 64, "max": comfy_nodes.MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 262144})}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "generate"

    CATEGORY = "Animate Diff 🎭🅐🅓/extras"

    def generate(self, width, height, batch_size=1):
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({"samples":latent}, )

```
