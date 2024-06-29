---
tags:
- Sampling
---

# RegionalSamplerAdvanced
## Documentation
- Class name: `RegionalSamplerAdvanced`
- Category: `ImpactPack/Regional`
- Output node: `False`

The RegionalSamplerAdvanced node is designed for advanced sampling operations within specific regions of latent images. It utilizes a base sampler and additional samplers to apply complex sampling strategies, enabling precise control over the sampling process in targeted areas.
## Input types
### Required
- **`add_noise`**
    - Determines whether noise is added to the sampling process, affecting the texture and details of the sampled output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility of the noise patterns in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Specifies the number of steps to perform in the sampling process, influencing the depth and detail of the sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_at_step`**
    - Defines the starting step for the sampling process, allowing for partial sampling starting from a specific point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Determines the ending step for the sampling process, enabling partial sampling up to a specific point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`overlap_factor`**
    - Controls the overlap between sampled regions, affecting the blending and transition between sampled areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`restore_latent`**
    - Indicates whether the original latent image is restored after sampling, preserving the original content outside the sampled regions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`return_with_leftover_noise`**
    - Determines whether the sampled output includes leftover noise, adding an additional layer of texture to the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`latent_image`**
    - The latent image to be sampled, serving as the base for the sampling operations.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`base_sampler`**
    - The base sampler used for the initial sampling process, setting the foundation for further sampling operations.
    - Comfy dtype: `KSAMPLER_ADVANCED`
    - Python dtype: `str`
- **`regional_prompts`**
    - Specifies the regional prompts used to guide the sampling process in specific areas, enhancing the relevance and accuracy of the sampled output.
    - Comfy dtype: `REGIONAL_PROMPTS`
    - Python dtype: `List[Dict]`
- **`additional_mode`**
    - Defines the mode for additional sampling operations, allowing for customization of the sampling strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`additional_sampler`**
    - Specifies the additional sampler used for enhanced sampling operations, providing flexibility in the sampling approach.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`additional_sigma_ratio`**
    - Sets the sigma ratio for additional sampling operations, influencing the variance and intensity of the sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent image after the advanced regional sampling process, reflecting the targeted modifications and enhancements.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalSamplerAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "overlap_factor": ("INT", {"default": 10, "min": 0, "max": 10000}),
                     "restore_latent": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                     "latent_image": ("LATENT", ),
                     "base_sampler": ("KSAMPLER_ADVANCED", ),
                     "regional_prompts": ("REGIONAL_PROMPTS", ),
                     "additional_mode": (["DISABLE", "ratio additional", "ratio between"], {"default": "ratio between"}),
                     "additional_sampler": (["AUTO", "euler", "heun", "heunpp2", "dpm_2", "dpm_fast", "dpmpp_2m", "ddpm"],),
                     "additional_sigma_ratio": ("FLOAT", {"default": 0.3, "min": 0.0, "max": 1.0, "step": 0.01}),
                     },
                 "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Regional"

    def doit(self, add_noise, noise_seed, steps, start_at_step, end_at_step, overlap_factor, restore_latent, return_with_leftover_noise, latent_image, base_sampler, regional_prompts,
             additional_mode, additional_sampler, additional_sigma_ratio, unique_id):

        if restore_latent:
            latent_compositor = nodes.NODE_CLASS_MAPPINGS['LatentCompositeMasked']()
        else:
            latent_compositor = None

        masks = [regional_prompt.mask.numpy() for regional_prompt in regional_prompts]
        masks = [np.ceil(mask).astype(np.int32) for mask in masks]
        combined_mask = torch.from_numpy(np.bitwise_or.reduce(masks))

        inv_mask = torch.where(combined_mask == 0, torch.tensor(1.0), torch.tensor(0.0))

        region_len = len(regional_prompts)
        end_at_step = min(steps, end_at_step)
        total = (end_at_step - start_at_step) * region_len

        new_latent_image = latent_image.copy()
        base_latent_image = None
        region_masks = {}

        for i in range(start_at_step, end_at_step-1):
            core.update_node_status(unique_id, f"{start_at_step+i}/{end_at_step} steps  |         ", ((i-start_at_step)*region_len)/total)

            cur_add_noise = True if i == start_at_step and add_noise else False

            new_latent_image['noise_mask'] = inv_mask
            new_latent_image = base_sampler.sample_advanced(cur_add_noise, noise_seed, steps, new_latent_image, i, i + 1, True,
                                                            recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)

            if restore_latent:
                del new_latent_image['noise_mask']
                base_latent_image = new_latent_image.copy()

            j = 1
            for regional_prompt in regional_prompts:
                if restore_latent:
                    new_latent_image = base_latent_image.copy()

                core.update_node_status(unique_id, f"{start_at_step+i}/{end_at_step} steps  |  {j}/{region_len}", ((i-start_at_step)*region_len + j)/total)

                if j not in region_masks:
                    region_mask = regional_prompt.get_mask_erosion(overlap_factor).squeeze(0).squeeze(0)
                    region_masks[j] = region_mask
                else:
                    region_mask = region_masks[j]

                new_latent_image['noise_mask'] = region_mask
                new_latent_image = regional_prompt.sampler.sample_advanced(False, noise_seed, steps, new_latent_image, i, i + 1, True,
                                                                           recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)

                if restore_latent:
                    del new_latent_image['noise_mask']
                    base_latent_image = latent_compositor.composite(base_latent_image, new_latent_image, 0, 0, False, region_mask)[0]
                    new_latent_image = base_latent_image

                j += 1

        # finalize
        core.update_node_status(unique_id, f"finalize")
        if base_latent_image is not None:
            new_latent_image = base_latent_image
        else:
            base_latent_image = new_latent_image

        new_latent_image['noise_mask'] = inv_mask
        new_latent_image = base_sampler.sample_advanced(False, noise_seed, steps, new_latent_image, end_at_step-1, end_at_step, return_with_leftover_noise,
                                                        recovery_mode=additional_mode, recovery_sampler=additional_sampler, recovery_sigma_ratio=additional_sigma_ratio)

        core.update_node_status(unique_id, f"{end_at_step}/{end_at_step} steps", total)
        core.update_node_status(unique_id, "", None)

        if restore_latent:
            new_latent_image = base_latent_image

        if 'noise_mask' in new_latent_image:
            del new_latent_image['noise_mask']

        return (new_latent_image, )

```
