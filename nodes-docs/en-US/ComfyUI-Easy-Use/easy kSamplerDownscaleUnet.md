---
tags:
- ImageScaling
---

# EasyKsampler (Downscale Unet)
## Documentation
- Class name: `easy kSamplerDownscaleUnet`
- Category: `EasyUse/Sampler`
- Output node: `True`

This node specializes in dynamically adjusting the Unet model within a sampling pipeline, specifically targeting the downscaling of the model's dimensions to optimize performance and efficiency. It employs a methodical approach to modify the Unet configuration based on specific downscale factors, ensuring the model's output remains high-quality while potentially reducing computational load.
## Input types
### Required
- **`pipe`**
    - The pipeline through which the sampling process is executed, serving as the backbone for model operations and transformations.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `CustomPipelineType`
- **`downscale_mode`**
    - Determines the mode of downscaling to be applied to the Unet model, allowing for automatic or manual adjustment of downscale parameters.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`block_number`**
    - Specifies the block number within the Unet model to which the downscaling adjustments are applied, targeting specific layers for optimization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`downscale_factor`**
    - The factor by which the Unet model's dimensions are reduced, directly influencing the model's performance and output quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Defines the starting percentage of the model's operation range to begin downscaling, affecting the initial phase of model processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Sets the ending percentage of the model's operation range for downscaling, impacting the final phase of model processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`downscale_after_skip`**
    - A boolean flag indicating whether downscaling should occur after skip connections within the Unet model, affecting the model's internal architecture.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`downscale_method`**
    - Specifies the method used for downscaling the Unet model, such as bicubic or nearest neighbor, influencing the quality of the downscaled output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_method`**
    - Determines the method used for upscaling within the Unet model, complementing the downscaling process to maintain output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_output`**
    - Controls the output format of the image, including options for preview, save, or hide, affecting the visibility and storage of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - An identifier for linking the current operation with other processes or outputs, facilitating the tracking and management of generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - A prefix added to the filenames of saved images, allowing for organized storage and easy retrieval of generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - The model to be downscaled, typically a pre-loaded Unet model, which is the target of the downscaling adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[torch.nn.Module]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline after applying the downscaling adjustments, including any modifications to the model and processing parameters.
    - Python dtype: `CustomPipelineType`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image generated after the downscaling process, showcasing the effects of the applied adjustments on image quality and detail.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSimpleDownscaleUnet:

    def __init__(self):
        pass

    upscale_methods = ["bicubic", "nearest-exact", "bilinear", "area", "bislerp"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                {"pipe": ("PIPE_LINE",),
                 "downscale_mode": (["None", "Auto", "Custom"],{"default": "Auto"}),
                 "block_number": ("INT", {"default": 3, "min": 1, "max": 32, "step": 1}),
                 "downscale_factor": ("FLOAT", {"default": 2.0, "min": 0.1, "max": 9.0, "step": 0.001}),
                 "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                 "end_percent": ("FLOAT", {"default": 0.35, "min": 0.0, "max": 1.0, "step": 0.001}),
                 "downscale_after_skip": ("BOOLEAN", {"default": True}),
                 "downscale_method": (s.upscale_methods,),
                 "upscale_method": (s.upscale_methods,),
                 "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
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

    def run(self, pipe, downscale_mode, block_number, downscale_factor, start_percent, end_percent, downscale_after_skip, downscale_method, upscale_method, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        downscale_options = None
        if downscale_mode == 'Auto':
            downscale_options = {
                "block_number": block_number,
                "downscale_factor": None,
                "start_percent": 0,
                "end_percent":0.35,
                "downscale_after_skip": True,
                "downscale_method": "bicubic",
                "upscale_method": "bicubic"
            }
        elif downscale_mode == 'Custom':
            downscale_options = {
                "block_number": block_number,
                "downscale_factor": downscale_factor,
                "start_percent": start_percent,
                "end_percent": end_percent,
                "downscale_after_skip": downscale_after_skip,
                "downscale_method": downscale_method,
                "upscale_method": upscale_method
            }

        return samplerFull().run(pipe, None, None,None,None,None, image_output, link_id, save_prefix,
                               None, model, None, None, None, None, None, None,
                               tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise, downscale_options)

```
