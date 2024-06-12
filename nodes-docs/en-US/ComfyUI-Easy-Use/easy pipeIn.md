---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# Pipe In
## Documentation
- Class name: `easy pipeIn`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `pipeIn` node is designed to initialize or update a pipeline configuration for image generation processes. It focuses on setting up or modifying the pipeline's parameters such as model, positive and negative conditioning, VAE, CLIP, image samples, and seed, ensuring that the pipeline is correctly configured for generating images based on specified conditions.
## Input types
### Required
### Optional
- **`pipe`**
    - Represents the current state of the pipeline, including its configuration and any previously set parameters. It is essential for determining what needs to be initialized or updated within the pipeline.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Specifies the model to be used in the pipeline, crucial for defining the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`pos`**
    - Positive conditioning text to guide the image generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`neg`**
    - Negative conditioning text to steer the image generation away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent`**
    - Represents the latent space vectors for the image generation, crucial for initializing or updating the pipeline's state.
    - Comfy dtype: `LATENT`
    - Python dtype: `List[torch.Tensor]`
- **`vae`**
    - Specifies the Variational Autoencoder used in the pipeline, essential for encoding and decoding images.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Specifies the CLIP model used for semantic understanding of images and texts, guiding the generation process.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The initial image or images to be processed or modified by the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`xyPlot`**
    - Optional parameter for specifying plot settings in the pipeline, used for visualizing attributes or results.
    - Comfy dtype: `XYPLOT`
    - Python dtype: `Optional[Dict[str, Any]]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated or newly created pipeline configuration, including settings for model, positive and negative conditioning, VAE, CLIP, image samples, and seed.
    - Python dtype: `Dict[str, Any]`
- **`ui`**
    - An optional UI parameter that may be included to provide visual feedback or interfaces as part of the node's output.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class pipeIn:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
             "required": {},
             "optional": {
                "pipe": ("PIPE_LINE",),
                "model": ("MODEL",),
                "pos": ("CONDITIONING",),
                "neg": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),
                "image": ("IMAGE",),
                "xyPlot": ("XYPLOT",),
            },
            "hidden": {"my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    FUNCTION = "flush"

    CATEGORY = "EasyUse/Pipe"

    def flush(self, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, xyplot=None, my_unique_id=None):

        model = model if model is not None else pipe.get("model")
        if model is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Model missing from pipeLine")
        pos = pos if pos is not None else pipe.get("positive")
        if pos is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Pos Conditioning missing from pipeLine")
        neg = neg if neg is not None else pipe.get("negative")
        if neg is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Neg Conditioning missing from pipeLine")
        vae = vae if vae is not None else pipe.get("vae")
        if vae is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "VAE missing from pipeLine")
        clip = clip if clip is not None else pipe.get("clip")
        if clip is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Clip missing from pipeLine")
        if latent is not None:
            samples = latent
        elif image is None:
            samples = pipe.get("samples") if pipe is not None else None
            image = pipe.get("images") if pipe is not None else None
        elif image is not None:
            if pipe is None:
                batch_size = 1
            else:
                batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
            samples = {"samples": vae.encode(image[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]

        if pipe is None:
            pipe = {"loader_settings": {"positive": "", "negative": "", "xyplot": None}}

        xyplot = xyplot if xyplot is not None else pipe['loader_settings']['xyplot'] if xyplot in pipe['loader_settings'] else None

        new_pipe = {
            **pipe,
            "model": model,
            "positive": pos,
            "negative": neg,
            "vae": vae,
            "clip": clip,

            "samples": samples,
            "images": image,
            "seed": pipe.get('seed') if pipe is not None and "seed" in pipe else None,

            "loader_settings": {
                **pipe["loader_settings"],
                "xyplot": xyplot
            }
        }
        del pipe

        return (new_pipe,)

```
