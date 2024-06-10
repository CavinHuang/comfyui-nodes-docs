---
tags:
- SamplerScheduler
- Sampling
---

# EasyKSampler (Tiled Decode)
## Documentation
- Class name: `easy kSamplerTiled`
- Category: `EasyUse/Sampler`
- Output node: `True`

The `easy kSamplerTiled` node is designed to facilitate the sampling process in a tiled manner, leveraging various samplers and schedulers to generate or modify images based on provided conditions. It abstracts the complexity of selecting and configuring samplers and schedulers, making it easier for users to apply advanced sampling techniques to their image generation tasks.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration for the sampling process, including model and sampling settings.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`tile_size`**
    - Specifies the size of the tiles used in the sampling process, affecting the granularity of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_output`**
    - Determines the output format of the image, influencing how the generated image is saved or displayed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - Provides a unique identifier for the link associated with the image output, used for tracking and referencing.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`save_prefix`**
    - Sets the prefix for saving the generated images, allowing for organized storage and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - Selects the specific model to be used for the sampling process, influencing the style and characteristics of the generated image.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the updated pipeline configuration after the sampling process, encapsulating the sequence of operations and modifications.
    - Python dtype: `dict`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the generated or modified image as a result of the sampling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSimpleTiled:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),
                 "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64}),
                 "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
                 "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                 "save_prefix": ("STRING", {"default": "ComfyUI"})
                 },
                "optional": {
                    "model": ("MODEL",),
                },
                "hidden": {
                    "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                  }
                }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE",)
    RETURN_NAMES = ("pipe", "image",)
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, tile_size=512, image_output='preview', link_id=0, save_prefix='ComfyUI', model=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        return samplerFull().run(pipe, None, None,None,None,None, image_output, link_id, save_prefix,
                               None, model, None, None, None, None, None, None,
                               tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)

```
