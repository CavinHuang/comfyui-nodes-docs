---
tags:
- Sampling
---

# pipeKSamplerAdvanced v1 (Legacy)
## Documentation
- Class name: `ttN pipeKSamplerAdvanced`
- Category: `ttN/legacy`
- Output node: `True`

The `ttN pipeKSamplerAdvanced` node is designed to enhance the sampling process within a pipeline by incorporating advanced techniques and parameters. It aims to provide more control and flexibility over the generation process, allowing for customized sampling strategies that can adapt to various requirements and scenarios.
## Input types
### Required
- **`pipe`**
    - unknown
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `unknown`
- **`lora_name`**
    - Defines the LoRA (Low-Rank Adaptation) model name to be used, enhancing the sampling process by applying specific model adaptations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Specifies the strength of the model adjustments made by the LoRA adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Determines the intensity of the clip adjustments applied through LoRA adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_method`**
    - Indicates the method used for upscaling images in the sampling process, affecting image quality and resolution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`factor`**
    - Defines the factor by which images are upscaled, directly influencing the output image size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop`**
    - Specifies whether and how the output images are cropped, affecting the final image composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sampler_state`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`add_noise`**
    - Indicates whether noise is added to the sampling process, affecting the texture and detail of generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`cfg`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sampler_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`scheduler`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`start_at_step`**
    - Defines the starting step of the sampling process, allowing for control over the generation's initial state.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Sets the ending step of the sampling process, determining when the generation concludes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Specifies whether the output includes leftover noise, affecting the final image's texture and detail.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_output`**
    - Indicates the format or destination for the generated images, affecting how and where outputs are saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_prefix`**
    - Defines a prefix for saved file names, organizing outputs in a consistent manner.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`noise_seed`**
    - Sets a seed for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`optional_model`**
    - Allows for the specification of an alternative model for sampling, providing flexibility in model usage.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`optional_positive`**
    - Enables the inclusion of additional positive conditioning, refining the generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`optional_negative`**
    - Permits the addition of negative conditioning to steer the generation away from certain attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`optional_latent`**
    - Provides an option to include a specific latent space configuration, influencing the starting point of generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`optional_vae`**
    - Allows for the use of an alternative VAE model, affecting the encoding and decoding processes.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`optional_clip`**
    - Enables the specification of an alternative CLIP model, impacting the alignment between text and image features.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`xyPlot`**
    - Specifies the configuration for plotting XY data, potentially used for visualizing aspects of the sampling process.
    - Comfy dtype: `XYPLOT`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline configuration after applying advanced sampling techniques.
    - Python dtype: `object`
- **`model`**
    - Comfy dtype: `MODEL`
    - The model used or modified during the advanced sampling process.
    - Python dtype: `str`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Positive conditioning factors applied or generated during sampling.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Negative conditioning factors applied or generated during sampling.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent space configuration resulting from the sampling process.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model used or modified during the sampling process.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model used or modified during the sampling process.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image output generated by the advanced sampling process.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed used during the sampling process, affecting reproducibility.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSamplerAdvanced:
    version = '1.0.5'
    upscale_methods = ["None", "nearest-exact", "bilinear", "area", "bicubic", "lanczos", "bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),

                "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "upscale_method": (cls.upscale_methods,),
                "factor": ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.25}),
                "crop": (cls.crop_methods,),
                "sampler_state": (["Sample", "Hold"], ),

                "add_noise": (["enable", "disable"], ),

                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),

                "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                "return_with_leftover_noise": (["disable", "enable"], ),

                "image_output": (["Hide", "Preview", "Save", "Hide/Save"],),
                "save_prefix": ("STRING", {"default": "ComfyUI"})
                },
                "optional": 
                {"noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                 "optional_model": ("MODEL",),
                 "optional_positive": ("CONDITIONING",),
                 "optional_negative": ("CONDITIONING",),
                 "optional_latent": ("LATENT",),
                 "optional_vae": ("VAE",),
                 "optional_clip": ("CLIP",),
                 "xyPlot": ("XYPLOT",),
                },
                "hidden":
                {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                 "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                 "ttNnodeVersion": ttN_pipeKSamplerAdvanced.version},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("pipe", "model", "positive", "negative", "latent","vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/legacy"

    def sample(self, pipe,
               lora_name, lora_model_strength, lora_clip_strength,
               sampler_state, add_noise, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
               noise_seed=None, optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, xyPlot=None, upscale_method=None, factor=None, crop=None, prompt=None, extra_pnginfo=None, my_unique_id=None, start_at_step=None, end_at_step=None, return_with_leftover_noise=False):
        
        force_full_denoise = True
        if return_with_leftover_noise == "enable":
            force_full_denoise = False

        disable_noise = False
        if add_noise == "disable":
            disable_noise = True
            
        out = ttN_TSC_pipeKSampler.sample(self, pipe, lora_name, lora_model_strength, lora_clip_strength, sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise, 
               optional_model, optional_positive, optional_negative, optional_latent, optional_vae, optional_clip, noise_seed, xyPlot, upscale_method, factor, crop, prompt, extra_pnginfo, my_unique_id, start_at_step, end_at_step, force_full_denoise, disable_noise)

        return out 

```
