---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Pipe Out
## Documentation
- Class name: `easy pipeOut`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `pipeOut` node is designed to process and output a modified pipeline configuration, focusing on integrating various components such as models, clips, and VAEs into a cohesive pipeline structure. It aims to facilitate the easy manipulation and output of pipeline configurations for further processing or use within a larger system.
## Input types
### Required
- **`pipe`**
    - The `pipe` parameter represents the pipeline configuration to be processed. It is essential for determining the structure and components of the pipeline that will be outputted.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline configuration after processing.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - The model component of the pipeline.
    - Python dtype: `object`
- **`pos`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning component of the pipeline.
    - Python dtype: `str`
- **`neg`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning component of the pipeline.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation component of the pipeline.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE component of the pipeline.
    - Python dtype: `object`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP component of the pipeline.
    - Python dtype: `object`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image component of the pipeline.
    - Python dtype: `object`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed used for random number generation in the pipeline.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class pipeOut:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
             "required": {
                "pipe": ("PIPE_LINE",),
            },
            "hidden": {"my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("pipe", "model", "pos", "neg", "latent", "vae", "clip", "image", "seed",)
    FUNCTION = "flush"

    CATEGORY = "EasyUse/Pipe"

    def flush(self, pipe, my_unique_id=None):
        model = pipe.get("model")
        pos = pipe.get("positive")
        neg = pipe.get("negative")
        latent = pipe.get("samples")
        vae = pipe.get("vae")
        clip = pipe.get("clip")
        image = pipe.get("images")
        seed = pipe.get("seed")

        return pipe, model, pos, neg, latent, vae, clip, image, seed

```
