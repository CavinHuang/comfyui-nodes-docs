---
tags:
- Sampling
---

# KSampler Cycle
## Documentation
- Class name: `KSampler Cycle`
- Category: `WAS Suite/Sampling`
- Output node: `False`

The KSampler Cycle node is designed to perform iterative sampling cycles using a specified sampling strategy. It leverages advanced sampling techniques to generate or modify latent images, incorporating various conditioning and noise parameters to guide the generation process. This node is part of a suite aimed at enhancing image generation capabilities through sophisticated sampling algorithms.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sampling, playing a crucial role in determining the quality and characteristics of the generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - The seed parameter ensures reproducibility of the sampling process by initializing the random number generator to a specific state.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the detail and quality of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor in the sampling process, influencing how strongly the positive and negative conditioning affect the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the specific sampling algorithm to be used, allowing for customization of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler to manage the sampling steps, enabling fine-tuning of the sampling dynamics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive conditioning terms to guide the sampling towards desired attributes or features in the generated images.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning terms to steer the sampling away from certain attributes or features, refining the generation process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to be modified or used as a basis for generation in the sampling cycle.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`tiled_vae`**
    - Enables or disables the use of tiled VAE, affecting the texture and detail of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_upscale`**
    - Specifies the method used for upscaling the latent image, influencing the resolution and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_factor`**
    - Determines the factor by which the latent image is upscaled, directly impacting its resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_cycles`**
    - Defines the number of cycles for upscaling, affecting the final image quality through iterative refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`starting_denoise`**
    - Sets the initial denoise level for the sampling process, influencing the clarity of the generated images from the start.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cycle_denoise`**
    - Adjusts the denoise level for each cycle, allowing for dynamic control over image clarity throughout the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_denoise`**
    - Enables or disables denoise scaling, affecting the denoise level based on the image scale.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_sampling`**
    - Determines the sampling method used during scaling, impacting the texture and detail of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae`**
    - Specifies the VAE model used in the process, crucial for the generation and manipulation of latent images.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
### Optional
- **`secondary_model`**
    - Optional secondary model for enhanced sampling or effects, providing additional customization.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`secondary_start_cycle`**
    - Defines the cycle at which the secondary model begins to be applied, allowing for staged sampling processes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_model`**
    - Specifies the model used for upscaling, impacting the quality and method of image enlargement.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`processor_model`**
    - Optional processor model for additional image processing or effects during the sampling cycle.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`pos_additive`**
    - Additional positive conditioning terms, enhancing the guidance towards desired features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`neg_additive`**
    - Additional negative conditioning terms, refining the avoidance of certain features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`pos_add_mode`**
    - Determines how the additional positive conditioning is applied, affecting its influence on the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pos_add_strength`**
    - Sets the strength of the additional positive conditioning, controlling its impact on the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`pos_add_strength_scaling`**
    - Adjusts the scaling of positive conditioning strength, allowing for dynamic influence based on other factors.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`pos_add_strength_cutoff`**
    - Defines a cutoff for positive conditioning strength, limiting its maximum impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`neg_add_mode`**
    - Determines how the additional negative conditioning is applied, affecting its influence on the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`neg_add_strength`**
    - Sets the strength of the additional negative conditioning, controlling its impact on the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`neg_add_strength_scaling`**
    - Adjusts the scaling of negative conditioning strength, allowing for dynamic influence based on other factors.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`neg_add_strength_cutoff`**
    - Defines a cutoff for negative conditioning strength, limiting its maximum impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sharpen_strength`**
    - Adjusts the strength of image sharpening applied after sampling, affecting image clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sharpen_radius`**
    - Determines the radius of the sharpening effect, influencing the extent of detail enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`steps_scaling`**
    - Enables or disables scaling of the number of steps based on certain conditions, affecting the sampling process duration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps_control`**
    - Specifies the control mechanism for dynamically adjusting the number of sampling steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps_scaling_value`**
    - Sets the value for scaling the number of steps, directly impacting the sampling process duration.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`steps_cutoff`**
    - Defines a cutoff for the number of steps, limiting the maximum duration of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise_cutoff`**
    - Sets a cutoff for denoise level, limiting the maximum amount of denoising applied to the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent(s)`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_KSampler_Cycle:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "model": ("MODEL",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "latent_image": ("LATENT", ),
                    "tiled_vae": (["disable", "enable"], ),
                    "latent_upscale": (["disable","nearest-exact", "bilinear", "area", "bicubic", "bislerp"],),
                    "upscale_factor": ("FLOAT", {"default":2.0, "min": 0.1, "max": 8.0, "step": 0.1}),
                    "upscale_cycles": ("INT", {"default": 2, "min": 2, "max": 12, "step": 1}),
                    "starting_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "cycle_denoise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "scale_denoise": (["enable", "disable"],),
                    "scale_sampling": (["bilinear", "bicubic", "nearest", "lanczos"],),
                    "vae": ("VAE",),
                },
                "optional": {
                    "secondary_model": ("MODEL",),
                    "secondary_start_cycle": ("INT", {"default": 2, "min": 2, "max": 16, "step": 1}),
                    "upscale_model": ("UPSCALE_MODEL",),
                    "processor_model": ("UPSCALE_MODEL",),
                    "pos_additive": ("CONDITIONING",),
                    "neg_additive": ("CONDITIONING",),
                    "pos_add_mode": (["increment", "decrement"],),
                    "pos_add_strength": ("FLOAT", {"default": 0.25, "min": 0.01, "max": 1.0, "step": 0.01}),
                    "pos_add_strength_scaling": (["enable", "disable"],),
                    "pos_add_strength_cutoff": ("FLOAT", {"default": 2.0, "min": 0.01, "max": 10.0, "step": 0.01}),
                    "neg_add_mode": (["increment", "decrement"],),
                    "neg_add_strength": ("FLOAT", {"default": 0.25, "min": 0.01, "max": 1.0, "step": 0.01}),
                    "neg_add_strength_scaling": (["enable", "disable"],),
                    "neg_add_strength_cutoff": ("FLOAT", {"default": 2.0, "min": 0.01, "max": 10.0, "step": 0.01}),
                    "sharpen_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                    "sharpen_radius": ("INT", {"default": 2, "min": 1, "max": 12, "step": 1}),
                    "steps_scaling": (["enable", "disable"],),
                    "steps_control": (["decrement", "increment"],),
                    "steps_scaling_value": ("INT", {"default": 10, "min": 1, "max": 20, "step": 1}),
                    "steps_cutoff": ("INT", {"default": 20, "min": 4, "max": 1000, "step": 1}),
                    "denoise_cutoff": ("FLOAT", {"default": 0.25, "min": 0.01, "max": 1.0, "step": 0.01}),
                }
            }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES =  ("latent(s)",)
    FUNCTION = "sample"

    CATEGORY = "WAS Suite/Sampling"

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, tiled_vae, latent_upscale, upscale_factor,
                upscale_cycles, starting_denoise, cycle_denoise, scale_denoise, scale_sampling, vae, secondary_model=None, secondary_start_cycle=None,
                pos_additive=None, pos_add_mode=None, pos_add_strength=None, pos_add_strength_scaling=None, pos_add_strength_cutoff=None,
                neg_additive=None, neg_add_mode=None, neg_add_strength=None, neg_add_strength_scaling=None, neg_add_strength_cutoff=None,
                upscale_model=None, processor_model=None, sharpen_strength=0, sharpen_radius=2, steps_scaling=None, steps_control=None,
                steps_scaling_value=None, steps_cutoff=None, denoise_cutoff=0.25):

        upscale_steps = upscale_cycles
        division_factor = upscale_steps if steps >= upscale_steps else steps
        current_upscale_factor = upscale_factor ** (1 / (division_factor - 1))
        tiled_vae = (tiled_vae == "enable")
        scale_denoise = (scale_denoise == "enable")
        pos_add_strength_scaling = (pos_add_strength_scaling == "enable")
        neg_add_strength_scaling = (neg_add_strength_scaling == "enable")
        steps_scaling = (steps_scaling == "enable")
        run_model = model
        secondary_switched = False

        for i in range(division_factor):

            cstr(f"Cycle Pass {i+1}/{division_factor}").msg.print()

            if scale_denoise:
                denoise = (
                    ( round(cycle_denoise * (2 ** (-(i-1))), 2) if i > 0 else cycle_denoise )
                    if i > 0 else round(starting_denoise, 2)
                )
            else:
                denoise = round((cycle_denoise if i > 0 else starting_denoise), 2)

            if denoise < denoise_cutoff and scale_denoise:
                denoise = denoise_cutoff

            if i >= (secondary_start_cycle - 1) and secondary_model and not secondary_switched:
                run_model = secondary_model
                denoise = cycle_denoise
                model = None
                secondary_switched = True

            if steps_scaling and i > 0:

                steps = (
                    steps + steps_scaling_value
                    if steps_control == 'increment'
                    else steps - steps_scaling_value
                )
                steps = (
                    ( steps
                    if steps <= steps_cutoff
                    else steps_cutoff )
                    if steps_control == 'increment'
                    else ( steps
                    if steps >= steps_cutoff
                    else steps_cutoff )
                )

            print("Steps:", steps)
            print("Denoise:", denoise)

            if pos_additive:

                pos_strength = 0.0 if i <= 0 else pos_add_strength

                if pos_add_mode == 'increment':
                    pos_strength = (
                        ( round(pos_add_strength * (2 ** (i-1)), 2)
                        if i > 0
                        else pos_add_strength )
                        if pos_add_strength_scaling
                        else pos_add_strength
                    )
                    pos_strength = (
                        pos_add_strength_cutoff
                        if pos_strength > pos_add_strength_cutoff
                        else pos_strength
                    )
                else:
                    pos_strength = (
                        ( round(pos_add_strength / (2 ** (i-1)), 2)
                        if i > 0
                        else pos_add_strength )
                        if pos_add_strength_scaling
                        else pos_add_strength
                    )
                    pos_strength = (
                        pos_add_strength_cutoff
                        if pos_strength < pos_add_strength_cutoff
                        else pos_strength
                    )
                comb = nodes.ConditioningAverage()
                positive = comb.addWeighted(pos_additive, positive, pos_strength)[0]
                print("Positive Additive Strength:", pos_strength)

            if neg_additive:

                neg_strength = 0.0 if i <= 0 else pos_add_strength

                if neg_add_mode == 'increment':
                    neg_strength = (
                        ( round(neg_add_strength * (2 ** (i-1)), 2)
                        if i > 0
                        else neg_add_strength )
                        if neg_add_strength_scaling
                        else neg_add_strength
                    )
                    neg_strength = (
                        neg_add_strength_cutoff
                        if neg_strength > neg_add_strength_cutoff
                        else neg_strength
                    )
                else:
                    neg_strength = (
                        ( round(neg_add_strength / (2 ** (i-1)), 2)
                        if i > 0
                        else neg_add_strength )
                        if neg_add_strength_scaling
                        else neg_add_strength
                    )
                    neg_strength = (
                        neg_add_strength_cutoff
                        if neg_strength < neg_add_strength_cutoff
                        else neg_strength
                    )

                comb = nodes.ConditioningAverage()
                negative = comb.addWeighted(neg_additive, negative, neg_strength)[0]
                print("Negative Additive Strength:", neg_strength)

            if i != 0:
                latent_image = latent_image_result

            samples = nodes.common_ksampler(
                run_model,
                seed,
                steps,
                cfg,
                sampler_name,
                scheduler,
                positive,
                negative,
                latent_image,
                denoise=denoise,
            )

            # Upscale
            if i < division_factor - 1:

                tensors = None
                upscaler = None

                resample_filters = {
                    'nearest': 0,
                    'bilinear': 2,
                    'bicubic': 3,
                    'lanczos': 1
                }

                if latent_upscale == 'disable':

                    if tiled_vae:
                        tensors = vae.decode_tiled(samples[0]['samples'])
                    else:
                        tensors = vae.decode(samples[0]['samples'])

                    if processor_model or upscale_model:

                        from comfy_extras import nodes_upscale_model
                        upscaler = nodes_upscale_model.ImageUpscaleWithModel()

                    if processor_model:

                        original_size = tensor2pil(tensors[0]).size
                        upscaled_tensors = upscaler.upscale(processor_model, tensors)
                        tensor_images = []
                        for tensor in upscaled_tensors[0]:
                            pil = tensor2pil(tensor)
                            if pil.size[0] != original_size[0] or pil.size[1] != original_size[1]:
                                pil = pil.resize((original_size[0], original_size[1]), Image.Resampling(resample_filters[scale_sampling]))
                            if sharpen_strength != 0.0:
                                pil = self.unsharp_filter(pil, sharpen_radius, sharpen_strength)
                            tensor_images.append(pil2tensor(pil))

                        tensor_images = torch.cat(tensor_images, dim=0)

                    if upscale_model:

                        if processor_model:
                            tensors = tensor_images
                            del tensor_images

                        original_size = tensor2pil(tensors[0]).size
                        new_width = round(original_size[0] * current_upscale_factor)
                        new_height = round(original_size[1] * current_upscale_factor)
                        new_width = int(round(new_width / 32) * 32)
                        new_height = int(round(new_height / 32) * 32)
                        upscaled_tensors = upscaler.upscale(upscale_model, tensors)
                        tensor_images = []
                        for tensor in upscaled_tensors[0]:
                            tensor = pil2tensor(tensor2pil(tensor).resize((new_width, new_height), Image.Resampling(resample_filters[scale_sampling])))
                            size = max(tensor2pil(tensor).size)
                            if sharpen_strength != 0.0:
                                tensor = pil2tensor(self.unsharp_filter(tensor2pil(tensor), sharpen_radius, sharpen_strength))
                            tensor_images.append(tensor)

                        tensor_images = torch.cat(tensor_images, dim=0)

                    else:

                        tensor_images = []
                        scale = WAS_Image_Rescale()
                        for tensor in tensors:
                            tensor = scale.image_rescale(tensor.unsqueeze(0), "rescale", "true", scale_sampling, current_upscale_factor, 0, 0)[0]
                            size = max(tensor2pil(tensor).size)
                            if sharpen_strength > 0.0:
                                tensor = pil2tensor(self.unsharp_filter(tensor2pil(tensor), sharpen_radius, sharpen_strength))
                            tensor_images.append(tensor)
                        tensor_images = torch.cat(tensor_images, dim=0)

                    if tiled_vae:
                        latent_image_result = {"samples": vae.encode_tiled(self.vae_encode_crop_pixels(tensor_images)[:,:,:,:3])}
                    else:
                        latent_image_result = {"samples": vae.encode(self.vae_encode_crop_pixels(tensor_images)[:,:,:,:3])}

                else:

                    upscaler = nodes.LatentUpscaleBy()
                    latent_image_result = upscaler.upscale(samples[0], latent_upscale, current_upscale_factor)[0]

            else:

                latent_image_result = samples[0]

        return (latent_image_result, )

    @staticmethod
    def vae_encode_crop_pixels(pixels):
        x = (pixels.shape[1] // 8) * 8
        y = (pixels.shape[2] // 8) * 8
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % 8) // 2
            y_offset = (pixels.shape[2] % 8) // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
        return pixels

    @staticmethod
    def unsharp_filter(image, radius=2, amount=1.0):
        from skimage.filters import unsharp_mask
        img_array = np.array(image)
        img_array = img_array / 255.0
        sharpened = unsharp_mask(img_array, radius=radius, amount=amount, channel_axis=2)
        sharpened = (sharpened * 255.0).astype(np.uint8)
        sharpened_pil = Image.fromarray(sharpened)

        return sharpened_pil

```
