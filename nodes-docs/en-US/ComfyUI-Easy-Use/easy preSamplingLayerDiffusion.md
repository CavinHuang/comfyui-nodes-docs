---
tags:
- LayeredDiffusion
---

# PreSampling (LayerDiffuse)
## Documentation
- Class name: `easy preSamplingLayerDiffusion`
- Category: `EasyUse/PreSampling`
- Output node: `True`

This node is designed to apply a layer diffusion process to images before sampling, enhancing the generation of images by blending different layers based on specified methods. It allows for the customization of the diffusion process through various parameters, including method selection, weight adjustment, and step configuration, to achieve desired visual effects.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline configuration for image generation, serving as the foundation for the layer diffusion process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`method`**
    - Specifies the layer diffusion method to be applied, influencing how layers are blended and the overall visual outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum[LayerMethod]`
- **`weight`**
    - Determines the influence of the diffusion method on the image, allowing for fine-tuning of the blending effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - Defines the number of steps to execute in the layer diffusion process, affecting the depth of the diffusion effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration setting that influences the generative model's behavior during the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the sampling algorithm used in the generative process, affecting the quality and characteristics of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for the diffusion steps, impacting the progression and outcome of the image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied during the diffusion process, influencing the clarity and detail of the generated image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the random seed for the generative process, ensuring reproducibility of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image`**
    - Optional input image that can be used as a base or reference in the diffusion process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`blended_image`**
    - Optional input image to be blended with the base image during the diffusion process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`mask`**
    - Optional mask to specify areas of the image to be affected or protected during the diffusion process.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[Mask]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the modified pipeline configuration after applying the layer diffusion process.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class layerDiffusionSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
            {
             "pipe": ("PIPE_LINE",),
             "method": ([LayerMethod.FG_ONLY_ATTN.value, LayerMethod.FG_ONLY_CONV.value, LayerMethod.EVERYTHING.value, LayerMethod.FG_TO_BLEND.value, LayerMethod.BG_TO_BLEND.value],),
             "weight": ("FLOAT",{"default": 1.0, "min": -1, "max": 3, "step": 0.05},),
             "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
             "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {"default": "euler"}),
             "scheduler": (comfy.samplers.KSampler.SCHEDULERS+ ['align_your_steps'], {"default": "normal"}),
             "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
             "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
             },
            "optional": {
                "image": ("IMAGE",),
                "blended_image": ("IMAGE",),
                "mask": ("MASK",),
                # "latent": ("LATENT",),
                # "blended_latent": ("LATENT",),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def get_layer_diffusion_method(self, method, has_blend_latent):
        method = LayerMethod(method)
        if has_blend_latent:
            if method == LayerMethod.BG_TO_BLEND:
                method = LayerMethod.BG_BLEND_TO_FG
            elif method == LayerMethod.FG_TO_BLEND:
                method = LayerMethod.FG_BLEND_TO_BG
        return method

    def settings(self, pipe, method, weight, steps, cfg, sampler_name, scheduler, denoise, seed, image=None, blended_image=None, mask=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        blend_samples = pipe['blend_samples'] if "blend_samples" in pipe else None
        vae = pipe["vae"]
        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1

        method = self.get_layer_diffusion_method(method, blend_samples is not None or blended_image is not None)

        if image is not None or "image" in pipe:
            image = image if image is not None else pipe['image']
            if mask is not None:
                print('inpaint')
                samples, = VAEEncodeForInpaint().encode(vae, image, mask)
            else:
                samples = {"samples": vae.encode(image[:,:,:,:3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image
        elif "samp_images" in pipe:
            samples = {"samples": vae.encode(pipe["samp_images"][:,:,:,:3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = pipe["samp_images"]
        else:
            if method not in [LayerMethod.FG_ONLY_ATTN, LayerMethod.FG_ONLY_CONV, LayerMethod.EVERYTHING]:
                raise Exception("image is missing")

            samples = pipe["samples"]
            images = pipe["images"]

        if method in [LayerMethod.BG_BLEND_TO_FG, LayerMethod.FG_BLEND_TO_BG]:
            if blended_image is None and blend_samples is None:
                raise Exception("blended_image is missing")
            elif blended_image is not None:
                blend_samples = {"samples": vae.encode(blended_image[:,:,:,:3])}
                blend_samples = RepeatLatentBatch().repeat(blend_samples, batch_size)[0]

        new_pipe = {
            "model": pipe['model'],
            "positive": pipe['positive'],
            "negative": pipe['negative'],
            "vae": pipe['vae'],
            "clip": pipe['clip'],

            "samples": samples,
            "blend_samples": blend_samples,
            "images": images,
            "seed": seed,

            "loader_settings": {
                **pipe["loader_settings"],
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler_name,
                "scheduler": scheduler,
                "denoise": denoise,
                "add_noise": "enabled",
                "layer_diffusion_method": method,
                "layer_diffusion_weight": weight,
            }
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
