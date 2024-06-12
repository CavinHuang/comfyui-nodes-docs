---
tags:
- LayeredDiffusion
---

# EasyKSampler (LayerDiffuse)
## Documentation
- Class name: `easy kSamplerLayerDiffusion`
- Category: `EasyUse/Sampler`
- Output node: `True`

The `easy kSamplerLayerDiffusion` node is designed to integrate layer diffusion techniques into the sampling process, enhancing image generation with more control over the blending and detailing of generated images. It leverages various diffusion methods to apply nuanced modifications to images, supporting both foreground and background blending, attention mechanisms, and convolutional approaches for a refined output.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration, including model and sampling settings, crucial for the layer diffusion process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`image_output`**
    - Specifies the desired output format for the generated images, influencing how the final images are presented or saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier used to link the current diffusion process with other processes or data within the pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - Defines the prefix for filenames when saving generated images, allowing for organized storage and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - The model used for the diffusion process, central to determining the characteristics and quality of the generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `Any`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline configuration after applying layer diffusion, reflecting changes in image blending, sampling, and additional settings.
    - Python dtype: `Dict[str, Any]`
- **`final_image`**
    - Comfy dtype: `IMAGE`
    - The final image result after the layer diffusion process, showcasing the applied blending and detailing effects.
    - Python dtype: `Any`
- **`original_image`**
    - Comfy dtype: `IMAGE`
    - The original image before the application of layer diffusion, allowing for comparison with the final result.
    - Python dtype: `Any`
- **`alpha`**
    - Comfy dtype: `MASK`
    - A value representing the blending factor used in the diffusion process, indicating the degree of blending between the original and diffused elements.
    - Python dtype: `float`
- **`ui`**
    - Provides a user interface component, typically displaying the seed value used in the diffusion process, facilitating user interaction and customization.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSimpleLayerDiffusion:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),
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

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("pipe", "final_image", "original_image", "alpha")
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (False, False, False, True)
    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, image_output='preview', link_id=0, save_prefix='ComfyUI', model=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        result = samplerFull().run(pipe, None, None,None,None,None, image_output, link_id, save_prefix,
                               None, model, None, None, None, None, None, None,
                               None, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
        pipe = result["result"][0] if "result" in result else None
        return ({"ui":result['ui'], "result":(pipe, pipe["images"], pipe["samp_images"], pipe["alpha"])})

```
