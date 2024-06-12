---
tags:
- Sampling
---

# KSampler Adv. (Efficient)
## Documentation
- Class name: `KSampler Adv. (Efficient)`
- Category: `Efficiency Nodes/Sampling`
- Output node: `True`

This node specializes in advanced sampling techniques for generating or refining images in a computationally efficient manner. It leverages enhanced algorithms to optimize the sampling process, ensuring high-quality outputs with reduced computational demands.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sampling, central to determining the characteristics and quality of the generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`add_noise`**
    - Determines whether noise should be added to the sampling process, affecting the texture and realism of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility in the randomness introduced to the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to execute in the sampling process, impacting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Specifies the configuration for the sampling process, influencing the generation's creativity and coherence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to use, affecting the efficiency and quality of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduler for controlling the sampling steps, crucial for optimizing the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Provides positive conditioning to guide the sampling towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Applies negative conditioning to avoid undesired attributes or themes in the sampling process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Inputs a latent image for refinement or further processing, serving as a starting point for the sampling.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`start_at_step`**
    - Defines the starting step of the sampling process, allowing for customization of the generation or refinement phase.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Specifies the ending step of the sampling process, enabling control over the duration and depth of sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Determines whether to return the sampled image with leftover noise, affecting the final image's appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`preview_method`**
    - Specifies the method used for previewing the sampling process, aiding in visualizing the generation progress.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_decode`**
    - Indicates whether to use VAE decoding on the sampled latent image, impacting the final image's quality and style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`optional_vae`**
    - Provides an optional VAE model for decoding, offering flexibility in the post-sampling processing.
    - Comfy dtype: `VAE`
    - Python dtype: `tuple`
- **`script`**
    - Allows for the execution of a custom script during the sampling process, enabling advanced customization.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - Outputs the model used in the sampling process.
    - Python dtype: `torch.nn.Module`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - Provides the positive conditioning applied during sampling, guiding the generation towards desired attributes.
    - Python dtype: `str`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - Delivers the negative conditioning used to steer the sampling away from undesired attributes.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - Outputs a latent representation of the sampled image, ready for further processing or conversion to an image.
    - Python dtype: `torch.Tensor`
- **`VAE`**
    - Comfy dtype: `VAE`
    - Returns the VAE model used, if any, during the sampling process.
    - Python dtype: `torch.nn.Module`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Generates the final image as a result of the sampling and optional post-processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class TSC_KSamplerAdvanced(TSC_KSampler):

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"model": ("MODEL",),
                     "add_noise": (["enable", "disable"],),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "latent_image": ("LATENT",),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "return_with_leftover_noise": (["disable", "enable"],),
                     "preview_method": (["auto", "latent2rgb", "taesd", "none"],),
                     "vae_decode": (["true", "true (tiled)", "false", "output only", "output only (tiled)"],),
                     },
                "optional": {"optional_vae": ("VAE",),
                             "script": ("SCRIPT",), },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID", },
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "IMAGE",)
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", "IMAGE",)
    OUTPUT_NODE = True
    FUNCTION = "sample_adv"
    CATEGORY = "Efficiency Nodes/Sampling"

    def sample_adv(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
               latent_image, start_at_step, end_at_step, return_with_leftover_noise, preview_method, vae_decode,
               prompt=None, extra_pnginfo=None, my_unique_id=None, optional_vae=(None,), script=None):

        return super().sample(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
               latent_image, preview_method, vae_decode, denoise=1.0, prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id,
               optional_vae=optional_vae, script=script, add_noise=add_noise, start_at_step=start_at_step,end_at_step=end_at_step,
                       return_with_leftover_noise=return_with_leftover_noise,sampler_type="advanced")

```
