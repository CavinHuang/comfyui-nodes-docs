---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscaler (SEGS)
## Documentation
- Class name: `SEGSUpscaler`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The SEGSUpscaler node is designed to upscale images by segmenting them into smaller sections, enhancing each segment individually, and then reassembling them into a single, enhanced image. This process allows for more detailed and controlled upscaling, leveraging various models and techniques to improve image quality segment by segment.
## Input types
### Required
- **`image`**
    - The original image to be upscaled. It serves as the base for segmentation and subsequent enhancement of each segment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`segs`**
    - A collection of image segments, each with its own characteristics and metadata, used for targeted upscaling and enhancement.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[Dict]`
- **`model`**
    - The main model used in the upscaling process, central to the enhancement of each image segment.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP model used for guiding the upscaling process with textual descriptions, enhancing relevance and detail.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The VAE model used for encoding and decoding images, crucial for the transformation and enhancement of segments.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`rescale_factor`**
    - A multiplier for scaling the image's dimensions during the upscaling process, affecting the final size of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resampling_method`**
    - The method used for resampling the image during the upscaling process, influencing the texture and quality of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`supersample`**
    - Indicates whether supersampling is applied to enhance the image quality by reducing aliasing effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`rounding_modulus`**
    - A value used to adjust the dimensions of the upscaled image, ensuring they are multiples of this modulus.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the upscaling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform during the image enhancement process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings for the enhancement process, guiding the behavior of the models used.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampling method used during image enhancement, influencing the texture and details of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler used to adjust the learning rate during the enhancement process, affecting the convergence and quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Textual descriptions that guide the upscaling process towards desired outcomes, enhancing positive aspects of the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Textual descriptions that guide the upscaling process away from undesired outcomes, mitigating negative aspects of the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`denoise`**
    - A boolean indicating whether denoising is applied during the enhancement process, potentially improving the clarity of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`feather`**
    - The feathering value applied to the edges of segments, smoothing transitions between enhanced segments and the rest of the image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`inpaint_model`**
    - The model used for inpainting, filling in missing or removed parts of the image during the enhancement process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`noise_mask_feather`**
    - The feathering value applied to the noise mask, smoothing the application of noise reduction across the image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
### Optional
- **`upscale_model_opt`**
    - Optional configuration for the upscaling model, allowing for customization of the upscaling process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `Dict`
- **`upscaler_hook_opt`**
    - Optional hooks for custom operations post-upscaling, allowing for additional processing or adjustments to the upscaled image.
    - Comfy dtype: `UPSCALER_HOOK`
    - Python dtype: `Dict`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final, enhanced and upscaled image, combining all processed segments into a single, high-quality output.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SEGSUpscaler:
    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ["lanczos", "nearest", "bilinear", "bicubic"]

        return {"required": {
                    "image": ("IMAGE",),
                    "segs": ("SEGS",),
                    "model": ("MODEL",),
                    "clip": ("CLIP",),
                    "vae": ("VAE",),
                    "rescale_factor": ("FLOAT", {"default": 2, "min": 0.01, "max": 100.0, "step": 0.01}),
                    "resampling_method": (resampling_methods,),
                    "supersample": (["true", "false"],),
                    "rounding_modulus": ("INT", {"default": 8, "min": 8, "max": 1024, "step": 8}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                    "positive": ("CONDITIONING",),
                    "negative": ("CONDITIONING",),
                    "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                    "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                    },
                "optional": {
                    "upscale_model_opt": ("UPSCALE_MODEL",),
                    "upscaler_hook_opt": ("UPSCALER_HOOK",),
                    }
                }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    @staticmethod
    def doit(image, segs, model, clip, vae, rescale_factor, resampling_method, supersample, rounding_modulus,
             seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, inpaint_model, noise_mask_feather,
             upscale_model_opt=None, upscaler_hook_opt=None):

        new_image = segs_upscaler.upscaler(image, upscale_model_opt, rescale_factor, resampling_method, supersample, rounding_modulus)

        segs = core.segs_scale_match(segs, new_image.shape)

        ordered_segs = segs[1]

        for i, seg in enumerate(ordered_segs):
            cropped_image = crop_ndarray4(new_image.numpy(), seg.crop_region)
            cropped_image = to_tensor(cropped_image)
            mask = to_tensor(seg.cropped_mask)
            mask = tensor_gaussian_blur_mask(mask, feather)

            is_mask_all_zeros = (seg.cropped_mask == 0).all().item()
            if is_mask_all_zeros:
                print(f"SEGSUpscaler: segment skip [empty mask]")
                continue

            cropped_mask = seg.cropped_mask

            seg_seed = seed + i

            enhanced_image = segs_upscaler.img2img_segs(cropped_image, model, clip, vae, seg_seed, steps, cfg, sampler_name, scheduler,
                                                        positive, negative, denoise,
                                                        noise_mask=cropped_mask, control_net_wrapper=seg.control_net_wrapper,
                                                        inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            if not (enhanced_image is None):
                new_image = new_image.cpu()
                enhanced_image = enhanced_image.cpu()
                left = seg.crop_region[0]
                top = seg.crop_region[1]
                tensor_paste(new_image, enhanced_image, (left, top), mask)

                if upscaler_hook_opt is not None:
                    upscaler_hook_opt.post_paste(new_image)

        enhanced_img = tensor_convert_rgb(new_image)

        return (enhanced_img,)

```
