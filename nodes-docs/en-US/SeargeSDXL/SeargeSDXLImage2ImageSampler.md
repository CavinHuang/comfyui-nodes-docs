---
tags:
- Sampling
---

# Image2Image Sampler v1 (Searge)
## Documentation
- Class name: `SeargeSDXLImage2ImageSampler`
- Category: `Searge/_deprecated_/Sampling`
- Output node: `False`

This node specializes in image-to-image sampling, incorporating a high-resolution fix to enhance the quality of the output images. It leverages advanced sampling techniques to refine and generate images based on input conditions, aiming to produce high-fidelity results that closely match the specified criteria.
## Input types
### Required
- **`base_model`**
    - Specifies the base model used for the initial phase of image generation, influencing the core structure and style of the output.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_positive`**
    - Positive conditioning text or criteria to guide the base model towards desired image attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - Negative conditioning text or criteria to instruct the base model on what attributes to avoid in the image generation process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - Defines the model used in the refinement phase, aimed at enhancing details and adjusting aspects of the initially generated image.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_positive`**
    - Positive conditioning for the refinement phase, focusing on enhancing or adding desired details to the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Negative conditioning for the refinement phase, aimed at removing or minimizing undesired details in the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`image`**
    - The initial image or its latent representation to be refined, serving as the starting point for the refinement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used for processing the image or its latent representation.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`noise_seed`**
    - A seed value for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to be taken in the sampling process, affecting the detail and quality of the final image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter influencing the sampling process's complexity and detail level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampling algorithm to be used, determining the approach to image generation and refinement.
    - Comfy dtype: `SAMPLER_NAME`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduling algorithm for controlling the sampling process, impacting the progression and quality of image refinement.
    - Comfy dtype: `SCHEDULER_NAME`
    - Python dtype: `str`
- **`base_ratio`**
    - Determines the balance between the base and refiner models' contributions to the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - The degree of denoising applied during the refinement process, affecting the smoothness and clarity of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`upscale_model`**
    - unknown
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `unknown`
- **`scaled_width`**
    - The target width for scaling the image during the refinement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scaled_height`**
    - The target height for scaling the image during the refinement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_offset`**
    - An offset applied to the noise seed, allowing for variation in the noise pattern during the refinement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_strength`**
    - Controls the intensity of the refinement process, affecting how much the refiner model alters the initial image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`softness`**
    - Adjusts the softness of the image, influencing the blending and transition effects during refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final refined image, showcasing the combined effects of base and refinement conditioning, along with the applied sampling techniques.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLImage2ImageSampler:
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
