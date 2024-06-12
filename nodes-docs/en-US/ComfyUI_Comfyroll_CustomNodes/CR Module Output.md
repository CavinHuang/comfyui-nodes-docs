---
tags:
- Image
- Pipeline
---

# ✈️ CR Module Output
## Documentation
- Class name: `CR Module Output`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/✈️ Module`
- Output node: `False`

The CR Module Output node is designed to serve as the endpoint for a module within a pipeline, facilitating the organized output of data processed through the module. It abstracts the complexity of data handling at the end of a module, ensuring a streamlined and efficient data flow out of the module.
## Input types
### Required
- **`pipe`**
    - Accepts a pipeline object that encapsulates all the data processed within the module. This object is the primary input for the node, enabling the organized output of processed data.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
### Optional
- **`model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`pos`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`neg`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`latent`**
    - unknown
    - Comfy dtype: `LATENT`
    - Python dtype: `unknown`
- **`vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`controlnet`**
    - unknown
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `unknown`
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the same pipeline object that was input, potentially with modifications or additions made during the module's processing.
    - Python dtype: `tuple`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page related to this node, offering users guidance on its usage and functionalities.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ModuleOutput:
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"pipe": ("PIPE_LINE",)},
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
    FUNCTION = "pipe_output"
    CATEGORY = icons.get("Comfyroll/Pipe/Module")

    def pipe_output(self, pipe, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, controlnet=None, image=None, seed=None):
       
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-output"   
    
        new_model, new_pos, new_neg, new_latent, new_vae, new_clip, new_controlnet, new_image, new_seed = pipe

        if model is not None:
            new_model = model
        
        if pos is not None:
            new_pos = pos

        if neg is not None:
            new_neg = neg

        if latent is not None:
            new_latent = latent

        if vae is not None:
            new_vae = vae

        if clip is not None:
            new_clip = clip
            
        if controlnet is not None:
            new_controlnet = controlnet
            
        if image is not None:
            new_image = image
            
        if seed is not None:
            new_seed = seed
       
        pipe = new_model, new_pos, new_neg, new_latent, new_vae, new_clip, new_controlnet, new_image, new_seed
       
        return (pipe, show_help, )

```
