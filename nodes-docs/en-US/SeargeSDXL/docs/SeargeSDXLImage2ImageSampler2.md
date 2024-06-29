---
tags:
- Sampling
---

# Image2Image Sampler v2 (Searge)
## Documentation
- Class name: `SeargeSDXLImage2ImageSampler2`
- Category: `Searge/_deprecated_/Sampling`
- Output node: `False`

This node specializes in image-to-image sampling, incorporating high-resolution fixes to enhance the quality and detail of the output images. It leverages advanced sampling techniques to transform input images into refined versions, maintaining the essence while improving visual fidelity.
## Input types
### Required
- **`base_model`**
    - Specifies the base model used for the initial phase of image sampling, setting the foundation for subsequent refinements.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_positive`**
    - Positive conditioning for the base model, guiding the initial image transformation with desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - Negative conditioning for the base model, instructing it to avoid certain attributes during the initial transformation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - The model used for refining the output of the base model, enhancing details and overall image quality.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_positive`**
    - Positive conditioning for the refiner model, further guiding the enhancement of image details.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Negative conditioning for the refiner model, ensuring undesired attributes are minimized in the final output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`image`**
    - The original image input for the sampling process, serving as the basis for both initial transformation and subsequent refinement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used to process the image, contributing to the generation of latent representations.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`noise_seed`**
    - A seed value for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to be used in the sampling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter influencing the sampling process, allowing for fine-tuning of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the sampling algorithm to be used, affecting the approach to image transformation.
    - Comfy dtype: `SAMPLER_NAME`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for sampling, impacting the progression of image refinement.
    - Comfy dtype: `SCHEDULER_NAME`
    - Python dtype: `str`
- **`base_ratio`**
    - Defines the ratio of steps allocated to the base model versus the refiner model, balancing between initial transformation and refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - Controls the level of denoising applied during the refinement process, affecting the clarity of the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`upscale_model`**
    - Specifies the model used for upscaling the image, enhancing its resolution as part of the refinement process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `str`
- **`scaled_width`**
    - The target width for image upscaling, defining the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scaled_height`**
    - The target height for image upscaling, defining the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_offset`**
    - Adjusts the noise level added during the sampling process, allowing for finer control over the texture and details of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`refiner_strength`**
    - Determines the intensity of the refinement process, directly influencing the detail and quality of the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`softness`**
    - Adjusts the softness of the image, affecting the smoothness and blending of details during the refinement process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final, refined image output, showcasing enhanced detail and quality following the sampling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLImage2ImageSampler2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_model": ("MODEL",),
            "base_positive": ("CONDITIONING",),
            "base_negative": ("CONDITIONING",),
            "refiner_model": ("MODEL",),
            "refiner_positive": ("CONDITIONING",),
            "refiner_negative": ("CONDITIONING",),
            "image": ("IMAGE",),
            "vae": ("VAE",),
            "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xfffffffffffffff0}),
            "steps": ("INT", {"default": 20, "min": 0, "max": 200}),
            "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 30.0, "step": 0.5}),
            "sampler_name": ("SAMPLER_NAME", {"default": "ddim"}),
            "scheduler": ("SCHEDULER_NAME", {"default": "ddim_uniform"}),
            "base_ratio": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
            "denoise": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01}),
        },
            "optional": {
                "upscale_model": ("UPSCALE_MODEL",),
                "scaled_width": ("INT", {"default": 1536, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
                "scaled_height": ("INT", {"default": 1536, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
                "noise_offset": ("INT", {"default": 1, "min": 0, "max": 1}),
                "refiner_strength": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 1.0, "step": 0.05}),
                "softness": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "sample"

    CATEGORY = "Searge/_deprecated_/Sampling"

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative,
               image, vae, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise, softness,
               upscale_model=None, scaled_width=None, scaled_height=None, noise_offset=None, refiner_strength=None):

        base_steps = int(steps * (base_ratio + 0.0001))

        if noise_offset is None:
            noise_offset = 1

        if refiner_strength is None:
            refiner_strength = 1.0

        if refiner_strength < 0.01:
            refiner_strength = 0.01

        if steps < 1:
            return (image,)

        scaled_image = image

        use_upscale_model = upscale_model is not None and softness < 0.9999
        if use_upscale_model:
            upscale_result = comfy_extras.nodes_upscale_model.ImageUpscaleWithModel().upscale(upscale_model, image)
            scaled_image = upscale_result[0]

        if scaled_width is not None and scaled_height is not None:
            upscale_result = nodes.ImageScale().upscale(scaled_image, "bicubic", scaled_width,
                                                        scaled_height, "center")

            scaled_image = upscale_result[0]

        if use_upscale_model and softness > 0.0001:
            upscale_result = nodes.ImageScale().upscale(image, "bicubic", scaled_width, scaled_height,
                                                        "center")

            scaled_original = upscale_result[0]

            blend_result = comfy_extras.nodes_post_processing.Blend().blend_images(scaled_image, scaled_original,
                                                                                   softness, "normal")

            scaled_image = blend_result[0]

        if denoise < 0.01:
            return (scaled_image,)

        vae_encode_result = nodes.VAEEncode().encode(vae, scaled_image)
        input_latent = vae_encode_result[0]

        if base_steps >= steps:
            result_latent = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler,
                                                  base_positive, base_negative, input_latent, denoise=denoise,
                                                  disable_noise=False, start_step=0, last_step=steps,
                                                  force_full_denoise=True)
        else:
            base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler,
                                                base_positive, base_negative, input_latent, denoise=denoise,
                                                disable_noise=False, start_step=0, last_step=base_steps,
                                                force_full_denoise=True)

            result_latent = nodes.common_ksampler(refiner_model, noise_seed + noise_offset, steps, cfg, sampler_name,
                                                  scheduler, refiner_positive, refiner_negative, base_result[0],
                                                  denoise=denoise * refiner_strength, disable_noise=False,
                                                  start_step=base_steps, last_step=steps, force_full_denoise=True)

        vae_decode_result = nodes.VAEDecode().decode(vae, result_latent[0])
        output_image = vae_decode_result[0]

        return (output_image,)

```
