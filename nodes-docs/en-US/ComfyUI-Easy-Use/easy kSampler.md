---
tags:
- SamplerScheduler
- Sampling
---

# EasyKSampler
## Documentation
- Class name: `easy kSampler`
- Category: `EasyUse/Sampler`
- Output node: `True`

The easy kSampler node is designed to facilitate complex sampling processes by abstracting the intricacies of various sampling and scheduling algorithms. It integrates a range of samplers and schedulers, allowing for flexible and advanced image generation and manipulation through conditioning, denoising, and latent space exploration.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration for the sampling process, central to orchestrating the flow and execution of tasks.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `str`
- **`image_output`**
    - Determines the output format and characteristics of the generated image, influencing the visual quality and aspects of the final product.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier used to link the sampling process with other processes or outputs, facilitating integration and traceability.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`save_prefix`**
    - Defines a prefix for saving the generated images, aiding in the organization and retrieval of output files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - Specifies the model to be used for sampling, central to determining the behavior and output of the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The output pipeline configuration after the sampling process, reflecting any changes or adjustments made during execution.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image resulting from the sampling process, ready for further use or analysis.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSimple:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),
                 "image_output": (["Hide", "Preview", "Preview&Choose", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
                 "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                 "save_prefix": ("STRING", {"default": "ComfyUI"}),
                 },
                "optional": {
                    "model": ("MODEL",),
                },
                "hidden":
                  {"tile_size": "INT", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                  }
                }


    RETURN_TYPES = ("PIPE_LINE", "IMAGE",)
    RETURN_NAMES = ("pipe", "image",)
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):

        return samplerFull().run(pipe, None, None, None, None, None, image_output, link_id, save_prefix,
                                 None, model, None, None, None, None, None, None,
                                 None, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)

```
