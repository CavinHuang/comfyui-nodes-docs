---
tags:
- Image
- Pipeline
---

# ✈️ CR Module Input
## Documentation
- Class name: `CR Module Input`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/✈️ Module`
- Output node: `False`

The CR_ModuleInput node is designed to facilitate the flow of data through a pipeline by accepting a variety of inputs and flushing them through the system. It serves as a critical junction point in the pipeline, ensuring that data is correctly routed and transformed for subsequent processing stages.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter is the primary conduit for data flowing through the node. It encapsulates a variety of data types and structures, acting as a central hub for the input data that will be processed and routed within the pipeline.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Tuple[torch.Tensor, torch.nn.Module, str, str, torch.Tensor, torch.nn.Module, torch.nn.Module, PIL.Image.Image, int]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Represents the aggregated and processed data, ready to be forwarded to the next stage in the pipeline.
    - Python dtype: `Tuple[torch.Tensor, torch.nn.Module, str, str, torch.Tensor, torch.nn.Module, torch.nn.Module, PIL.Image.Image, int, str]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The model data extracted from the input pipe.
    - Python dtype: `torch.nn.Module`
- **`pos`**
    - Comfy dtype: `CONDITIONING`
    - Positive conditioning data extracted from the input pipe.
    - Python dtype: `str`
- **`neg`**
    - Comfy dtype: `CONDITIONING`
    - Negative conditioning data extracted from the input pipe.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Latent representation data extracted from the input pipe.
    - Python dtype: `torch.Tensor`
- **`vae`**
    - Comfy dtype: `VAE`
    - VAE model data extracted from the input pipe.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - CLIP model data extracted from the input pipe.
    - Python dtype: `torch.nn.Module`
- **`controlnet`**
    - Comfy dtype: `CONTROL_NET`
    - ControlNet data extracted from the input pipe.
    - Python dtype: `torch.nn.Module`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Image data extracted from the input pipe.
    - Python dtype: `PIL.Image.Image`
- **`seed`**
    - Comfy dtype: `INT`
    - Seed value extracted from the input pipe.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ModuleInput:
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"pipe": ("PIPE_LINE",)},
            }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "CONTROL_NET", "IMAGE", "INT", "STRING", )
    RETURN_NAMES = ("pipe", "model", "pos", "neg", "latent", "vae", "clip", "controlnet", "image", "seed", "show_help", )
    FUNCTION = "flush"
    CATEGORY = icons.get("Comfyroll/Pipe/Module")
    
    def flush(self, pipe):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-input"

        model, pos, neg, latent, vae, clip, controlnet, image, seed = pipe
        
        return (pipe, model, pos, neg, latent, vae, clip, controlnet, image, seed, show_help, )

```
