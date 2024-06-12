---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# pipeIN (Legacy)
## Documentation
- Class name: `ttN pipeIN`
- Category: `ttN/legacy`
- Output node: `False`

The ttN pipeIN node serves as a foundational element in the ttN/legacy category, designed to initialize and configure pipelines for generative tasks. It encapsulates the process of setting up various components such as models, conditioning elements, and latent spaces, facilitating the creation of a structured pipeline ready for further processing or generation.
## Input types
### Required
- **`model`**
    - Specifies the generative model to be used in the pipeline, serving as the core component around which other elements are configured.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`pos`**
    - Defines positive conditioning information to guide the generative model towards desired outputs.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`neg`**
    - Specifies negative conditioning information, used to steer the generative model away from undesired outputs.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent`**
    - Represents the latent space configuration, providing a basis for the generative process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`vae`**
    - Specifies the VAE (Variational Autoencoder) component, used for encoding and decoding in the generative process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`clip`**
    - Defines the CLIP model used for semantic understanding and alignment between text and images.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`seed`**
    - Sets the random seed for reproducibility of the generative process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image`**
    - Optional parameter for specifying an initial image to be used in the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs a configured pipeline object, encapsulating the specified models, conditioning, and configurations for further processing.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_IN:
    version = '1.1.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "pos": ("CONDITIONING",),
                "neg": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },"optional": {
                "image": ("IMAGE",),
            },
            "hidden": {"ttNnodeVersion": ttN_pipe_IN.version},
        }

    RETURN_TYPES = ("PIPE_LINE", )
    RETURN_NAMES = ("pipe", )
    FUNCTION = "flush"

    CATEGORY = "ttN/legacy"

    def flush(self, model, pos=0, neg=0, latent=0, vae=0, clip=0, image=0, seed=0):
        pipe = {"model": model,
                "positive": pos,
                "negative": neg,
                "vae": vae,
                "clip": clip,

                "refiner_model": None,
                "refiner_positive": None,
                "refiner_negative": None,
                "refiner_vae": None,
                "refiner_clip": None,

                "samples": latent,
                "images": image,
                "seed": seed,

                "loader_settings": {}
        }
        return (pipe, )

```
