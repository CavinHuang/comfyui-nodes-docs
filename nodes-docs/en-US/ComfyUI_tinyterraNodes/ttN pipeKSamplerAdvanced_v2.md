---
tags:
- Sampling
---

# pipeKSamplerAdvanced
## Documentation
- Class name: `ttN pipeKSamplerAdvanced_v2`
- Category: `ttN/pipe`
- Output node: `True`

The `ttN_pipeKSamplerAdvanced_v2` node is designed to enhance the sampling process in generative models by incorporating advanced techniques for noise management and image quality improvement. It leverages a variety of parameters to fine-tune the generation process, aiming to produce higher-quality outputs with greater control over the sampling dynamics.
## Input types
### Required
- **`pipe`**
    - unknown
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `unknown`
- **`lora_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`lora_strength`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`upscale_method`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`upscale_model_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`factor`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`rescale`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`percent`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`longer_side`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`sampler_state`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`add_noise`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`noise`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`start_at_step`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`end_at_step`**
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
- **`return_with_leftover_noise`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`image_output`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`save_prefix`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
- **`noise_seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`optional_model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`optional_positive`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_negative`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_latent`**
    - unknown
    - Comfy dtype: `LATENT`
    - Python dtype: `unknown`
- **`optional_vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`optional_clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`input_image_override`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`adv_xyPlot`**
    - unknown
    - Comfy dtype: `ADV_XYPLOT`
    - Python dtype: `unknown`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - unknown
    - Python dtype: `unknown`
- **`model`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`vae`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`clip`**
    - Comfy dtype: `CLIP`
    - unknown
    - Python dtype: `unknown`
- **`image`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`seed`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSamplerAdvanced_v2:
    version = '2.1.0'
    upscale_methods = ["None",
                       "[latent] nearest-exact", "[latent] bilinear", "[latent] area", "[latent] bicubic", "[latent] lanczos", "[latent] bislerp",
                       "[hiresFix] nearest-exact", "[hiresFix] bilinear", "[hiresFix] area", "[hiresFix] bicubic", "[hiresFix] lanczos", "[hiresFix] bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                
                "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "upscale_method": (cls.upscale_methods, {"default": "None"}),
                "upscale_model_name": (folder_paths.get_filename_list("upscale_models"),),
                "factor": ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.25}),
                "rescale": (["by percentage", "to Width/Height", 'to longer side - maintain aspect', 'None'],),
                "percent": ("INT", {"default": 50, "min": 0, "max": 1000, "step": 1}),
                "width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "longer_side": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "crop": (cls.crop_methods,),
                
                "sampler_state": (["Sample", "Hold"], ),
                "add_noise": (["enable", "disable"], ),
                "noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                
                
                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "return_with_leftover_noise": (["disable", "enable"], ),
                "image_output": (["Hide", "Preview", "Save", "Hide/Save", "Disabled"],),
                "save_prefix": ("STRING", {"default": "ComfyUI"}),
                },
            "optional": {
                "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "optional_model": ("MODEL",),
                "optional_positive": ("CONDITIONING",),
                "optional_negative": ("CONDITIONING",),
                "optional_latent": ("LATENT",),
                "optional_vae": ("VAE",),
                "optional_clip": ("CLIP",),
                "input_image_override": ("IMAGE",),
                "adv_xyPlot": ("ADV_XYPLOT",),
                },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO",
                "my_unique_id": "UNIQUE_ID",
                "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                "lorasList": (folder_paths.get_filename_list("loras"),),
                "ttNnodeVersion": ttN_pipeKSamplerAdvanced_v2.version
                },
            }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT", )
    RETURN_NAMES = ("pipe", "model", "positive", "negative", "latent","vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "adv_sample"
    CATEGORY = "ttN/pipe"

    def adv_sample(self, pipe,
               lora_name, lora_strength,
               sampler_state, add_noise, steps, cfg, sampler_name, scheduler, image_output, save_prefix, noise, 
               noise_seed=None, optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, input_image_override=None, adv_xyPlot=None, upscale_method=None, upscale_model_name=None, factor=None, rescale=None, percent=None, width=None, height=None, longer_side=None, crop=None, prompt=None, extra_pnginfo=None, my_unique_id=None, start_at_step=None, end_at_step=None, return_with_leftover_noise=False):

        force_full_denoise = True
        if return_with_leftover_noise == "enable":
            force_full_denoise = False

        disable_noise = False
        if add_noise == "disable":
            disable_noise = True

        return ttN_pipeKSampler_v2.sample(self, pipe, lora_name, lora_strength, sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, noise, 
                optional_model, optional_positive, optional_negative, optional_latent, optional_vae, optional_clip, input_image_override, noise_seed, adv_xyPlot, upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop, prompt, extra_pnginfo, my_unique_id, start_at_step, end_at_step, force_full_denoise, disable_noise)

```
