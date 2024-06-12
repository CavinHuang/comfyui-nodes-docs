---
tags:
- Image
- Pipeline
---

# pipeEDIT
## Documentation
- Class name: `ttN pipeEDIT`
- Category: `ttN/pipe`
- Output node: `False`

The node is designed to edit and refine the outputs of a pipeline, allowing for adjustments and enhancements to be made to the data processed through the pipeline. It focuses on modifying existing pipeline data to meet specific requirements or to improve the quality of the output.
## Input types
### Required
### Optional
- **`pipe`**
    - Represents the pipeline data to be edited or refined. This parameter is crucial for determining the scope and nature of the edits to be applied.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`model`**
    - Specifies the model component of the pipeline to be edited or refined.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`pos`**
    - Specifies the positive conditioning component of the pipeline to be edited or refined.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`neg`**
    - Specifies the negative conditioning component of the pipeline to be edited or refined.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent`**
    - Specifies the latent component of the pipeline to be edited or refined.
    - Comfy dtype: `LATENT`
    - Python dtype: `int`
- **`vae`**
    - Specifies the VAE component of the pipeline to be edited or refined.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`clip`**
    - Specifies the CLIP component of the pipeline to be edited or refined.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`image`**
    - Specifies the image component of the pipeline to be edited or refined.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`seed`**
    - Specifies the seed component of the pipeline to be edited or refined.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The edited pipeline data, reflecting the applied modifications.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - The edited model component of the pipeline.
    - Python dtype: `str`
- **`pos`**
    - Comfy dtype: `CONDITIONING`
    - The edited positive conditioning component of the pipeline.
    - Python dtype: `str`
- **`neg`**
    - Comfy dtype: `CONDITIONING`
    - The edited negative conditioning component of the pipeline.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The edited latent component of the pipeline.
    - Python dtype: `int`
- **`vae`**
    - Comfy dtype: `VAE`
    - The edited VAE component of the pipeline.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The edited CLIP component of the pipeline.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The edited image component of the pipeline.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - The edited seed component of the pipeline.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_EDIT:
    version = '1.1.1'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {},
                "optional": {
                    "pipe": ("PIPE_LINE",),
                    "model": ("MODEL",),
                    "pos": ("CONDITIONING",),
                    "neg": ("CONDITIONING",),
                    "latent": ("LATENT",),
                    "vae": ("VAE",),
                    "clip": ("CLIP",),
                    "image": ("IMAGE",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "forceInput": True}),
                },
                "hidden": {"ttNnodeVersion": ttN_pipe_EDIT.version, "my_unique_id": "UNIQUE_ID"},
            }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT")
    RETURN_NAMES = ("pipe", "model", "pos", "neg", "latent", "vae", "clip", "image", "seed")
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"

    def flush(self, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, seed=None, my_unique_id=None):

        model = model or pipe.get("model")
        if model is None:
            ttNl("Model missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        pos = pos or pipe.get("positive")
        if pos is None:
            ttNl("Positive conditioning missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        neg = neg or pipe.get("negative")
        if neg is None:
            ttNl("Negative conditioning missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        samples = latent or pipe.get("samples")
        if samples is None:
            ttNl("Latent missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        vae = vae or pipe.get("vae")
        if vae is None:
            ttNl("VAE missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        clip = clip or pipe.get("clip")
        if clip is None:
            ttNl("Clip missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        image = image or pipe.get("images")
        if image is None:
            ttNl("Image missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        seed = seed or pipe.get("seed")
        if seed is None:
            ttNl("Seed missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()

        new_pipe = {
            "model": model,
            "positive": pos,
            "negative": neg,
            "vae": vae,
            "clip": clip,

            "samples": samples,
            "images": image,
            "seed": seed,

            "loader_settings": pipe["loader_settings"],
        }
        del pipe

        return (new_pipe, )

```
