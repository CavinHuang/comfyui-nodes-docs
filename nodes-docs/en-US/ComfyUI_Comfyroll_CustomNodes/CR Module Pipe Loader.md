---
tags:
- Image
- Pipeline
---

# ✈️ CR Module Pipe Loader
## Documentation
- Class name: `CR Module Pipe Loader`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/✈️ Module`
- Output node: `False`

The CR Module Pipe Loader node is designed to aggregate various types of inputs, such as models, conditioning data, latent vectors, and images, into a unified pipeline format. It facilitates the modular assembly of components for generative AI applications, allowing for flexible and dynamic construction of processing pipelines.
## Input types
### Required
### Optional
- **`model`**
    - Represents a model component to be included in the pipeline. It's crucial for defining the generative model that will be used in the pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `tuple`
- **`pos`**
    - Specifies positive conditioning data to guide the generative process. It affects the direction and characteristics of the generation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`neg`**
    - Specifies negative conditioning data to counterbalance or steer away from certain aspects during generation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`latent`**
    - Provides a latent vector to seed or influence the generative process, offering a way to introduce variability or specific directions.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`vae`**
    - Represents a VAE (Variational Autoencoder) component, which can be used for encoding or decoding in the pipeline.
    - Comfy dtype: `VAE`
    - Python dtype: `tuple`
- **`clip`**
    - Incorporates a CLIP model for semantic understanding or alignment, enhancing the generative process with textual or visual guidance.
    - Comfy dtype: `CLIP`
    - Python dtype: `tuple`
- **`controlnet`**
    - Includes a ControlNet component for additional control over the generation process, allowing for more precise manipulations.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `tuple`
- **`image`**
    - Includes an image to be processed or used as part of the generative process, adding visual data to the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `tuple`
- **`seed`**
    - Provides a seed value for random number generation, ensuring reproducibility or variability in the generative process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The assembled pipeline, encapsulating all the provided components in a unified format for further processing.
    - Python dtype: `tuple`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the documentation or help page for the node, offering guidance on its usage and capabilities.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Module Input](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Input.md)
    - [CR Pipe Switch](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Pipe Switch.md)



## Source code
```python
class CR_ModulePipeLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "model": ("MODEL",),
                "pos": ("CONDITIONING",),
                "neg": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),
                "controlnet": ("CONTROL_NET",),
                "image": ("IMAGE",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})            
            },
        }

    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("pipe", "show_help", )
    FUNCTION = "pipe_input"
    CATEGORY = icons.get("Comfyroll/Pipe/Module")

    def pipe_input(self, model=0, pos=0, neg=0, latent=0, vae=0, clip=0, controlnet=0, image=0, seed=0):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-pipe-loader"   
        
        pipe_line = (model, pos, neg, latent, vae, clip, controlnet, image, seed)

        return (pipe_line, show_help, )

```
