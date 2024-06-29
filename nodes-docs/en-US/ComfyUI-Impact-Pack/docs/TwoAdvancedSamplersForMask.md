---
tags:
- Sampling
---

# TwoAdvancedSamplersForMask
## Documentation
- Class name: `TwoAdvancedSamplersForMask`
- Category: `ImpactPack/Sampler`
- Output node: `False`

This node provides advanced sampling capabilities for image masks, enabling precise control over the application and manipulation of masks in image processing tasks. It leverages specialized sampling techniques to modify latent images based on mask parameters, facilitating complex image transformations.
## Input types
### Required
- **`seed`**
    - The seed parameter ensures reproducibility of the sampling process, allowing for consistent results across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the advanced sampling process, affecting the granularity of the transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - Controls the level of denoising applied during the sampling process, influencing the clarity and quality of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`samples`**
    - Represents the latent images to be processed, serving as the input for the advanced sampling operations.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`base_sampler`**
    - Specifies the base sampler used for the initial phase of image transformation, setting the foundation for further mask application.
    - Comfy dtype: `KSAMPLER_ADVANCED`
    - Python dtype: `KSamplerAdvanced`
- **`mask_sampler`**
    - Determines the sampler used for applying the mask to the image, directly influencing the areas of the image to be modified.
    - Comfy dtype: `KSAMPLER_ADVANCED`
    - Python dtype: `KSamplerAdvanced`
- **`mask`**
    - The mask parameter defines the specific areas of the image to be targeted by the sampling process, enabling selective image manipulation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`overlap_factor`**
    - Adjusts the degree of overlap between mask applications, affecting the blending and transition between masked and unmasked areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs the modified latent image after the advanced sampling and mask application process.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TwoAdvancedSamplersForMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "samples": ("LATENT", ),
                     "base_sampler": ("KSAMPLER_ADVANCED", ),
                     "mask_sampler": ("KSAMPLER_ADVANCED", ),
                     "mask": ("MASK", ),
                     "overlap_factor": ("INT", {"default": 10, "min": 0, "max": 10000})
                     },
                }

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Sampler"

    @staticmethod
    def mask_erosion(samples, mask, grow_mask_by):
        mask = mask.clone()

        w = samples['samples'].shape[3]
        h = samples['samples'].shape[2]

        mask2 = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(w, h), mode="bilinear")
        if grow_mask_by == 0:
            mask_erosion = mask2
        else:
            kernel_tensor = torch.ones((1, 1, grow_mask_by, grow_mask_by))
            padding = math.ceil((grow_mask_by - 1) / 2)

            mask_erosion = torch.clamp(torch.nn.functional.conv2d(mask2.round(), kernel_tensor, padding=padding), 0, 1)

        return mask_erosion[:, :, :w, :h].round()

    def doit(self, seed, steps, denoise, samples, base_sampler, mask_sampler, mask, overlap_factor):

        inv_mask = torch.where(mask != 1.0, torch.tensor(1.0), torch.tensor(0.0))

        adv_steps = int(steps / denoise)
        start_at_step = adv_steps - steps

        new_latent_image = samples.copy()

        mask_erosion = TwoAdvancedSamplersForMask.mask_erosion(samples, mask, overlap_factor)

        for i in range(start_at_step, adv_steps):
            add_noise = "enable" if i == start_at_step else "disable"
            return_with_leftover_noise = "enable" if i+1 != adv_steps else "disable"

            new_latent_image['noise_mask'] = inv_mask
            new_latent_image = base_sampler.sample_advanced(add_noise, seed, adv_steps, new_latent_image, i, i + 1, "enable", recovery_mode="ratio additional")

            new_latent_image['noise_mask'] = mask_erosion
            new_latent_image = mask_sampler.sample_advanced("disable", seed, adv_steps, new_latent_image, i, i + 1, return_with_leftover_noise, recovery_mode="ratio additional")

        del new_latent_image['noise_mask']

        return (new_latent_image, )

```
