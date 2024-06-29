---
tags:
- Sampling
---

# MaskGrid N KSamplers Advanced
## Documentation
- Class name: `MaskGrid N KSamplers Advanced`
- Category: `Bmad/experimental`
- Output node: `False`

This node specializes in applying advanced sampling techniques to generate or modify latent spaces in a grid format. It leverages multiple samplers and masking strategies to create or alter latents, enabling complex manipulations like forking and merging regions within the grid. The node's functionality is crucial for tasks that require precise control over the spatial distribution of features within generated images or patterns.
## Input types
### Required
- **`model`**
    - Specifies the model used for sampling. It's essential for defining the generative model's architecture that will be utilized during the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`add_noise`**
    - Indicates whether noise should be added to the sampling process. This parameter can significantly affect the diversity and quality of the generated latents.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility when adding noise to the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to perform during the sampling process. This parameter controls the depth of the sampling operation, affecting the detail and quality of the generated latents.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Specifies the conditioning factor for the generative model, influencing the strength of the conditioning during the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the specific sampler algorithm to be used. Different samplers can produce varied effects on the generated latents.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduler for the sampling process, which can affect the progression and outcome of the sampling operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Provides positive conditioning inputs to guide the sampling towards desired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative`**
    - Provides negative conditioning inputs to steer the sampling away from certain attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`latent_image`**
    - Represents the initial latent images to be modified through the sampling and masking operations. This parameter is the starting point for the node's complex manipulations.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`start_at_step`**
    - Defines the starting step for the sampling process, allowing for more control over the sampling progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Defines the ending step for the sampling process, providing a boundary for the sampling operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Indicates whether the output should include leftover noise from the sampling process. This can be useful for further manipulations or analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`mask`**
    - Specifies the mask to be applied to the latent images, enabling targeted modifications within the grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`rows`**
    - Determines the number of rows in the grid format. This parameter affects the spatial organization of the latents within the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`columns`**
    - Determines the number of columns in the grid format. This parameter affects the spatial organization of the latents within the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Specifies the mode of operation, such as forking before or after sampling. This choice can significantly impact the outcome of the manipulations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent images after applying advanced sampling and masking techniques. This output is significant for downstream tasks that rely on the spatially manipulated features within the latents.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskGridNKSamplersAdvanced(nodes.KSamplerAdvanced):
    fork_before_sampling = {
        "Sample then Fork": False,
        "Fork then Sample": True
    }
    fork_options = list(fork_before_sampling.keys())

    @classmethod
    def INPUT_TYPES(s):
        types = super().INPUT_TYPES()
        types["required"]["mask"] = ("IMAGE",)
        types["required"]["rows"] = ("INT", {"default": 1, "min": 1, "max": 16})
        types["required"]["columns"] = ("INT", {"default": 3, "min": 1, "max": 16})
        types["required"]["mode"] = (s.fork_options, {"default": s.fork_options[0]})
        return types

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "gen_batch"
    CATEGORY = "Bmad/experimental"

    def gen_batch(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
                  latent_image, start_at_step, end_at_step, return_with_leftover_noise,
                  mask, rows, columns, mode, denoise=1.0):

        # setup sizes
        _, _, latent_height_as_img, latent_width_as_img = latent_image['samples'].size()
        latent_width_as_img *= 8
        latent_height_as_img *= 8
        _, mask_height, mask_width, _ = mask.size()

        # existing nodes required for the operation
        set_mask_node = nodes.SetLatentNoiseMask()

        latents = []

        if not self.fork_before_sampling[mode]:
            # FORK AFTER SAMPLING

            # prepare mask
            mask = RepeatIntoGridImage().repeat_into_grid(mask, columns, rows)[0]
            new_mask = torch.zeros((latent_height_as_img, latent_width_as_img))
            new_mask[:, :] = mask[0, :, :, 0]

            # prepare latent w/ mask and send to ksampler
            sampled_latent = set_mask_node.set_mask(samples=latent_image, mask=new_mask)[0]
            sampled_latent = \
            super().sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
                           sampled_latent, start_at_step, end_at_step, return_with_leftover_noise, denoise)[0][
                'samples']

            # adjust mask sizes for latent space
            mask_height //= 8
            mask_width //= 8

            # fork and copy regions from original latent
            for r in range(rows):
                for c in range(columns):
                    x2 = x1 = mask_width * c
                    x2 += mask_width
                    y2 = y1 = mask_height * r
                    y2 += mask_height
                    new_latent = latent_image['samples'].clone()
                    new_latent[0, :, y1:y2, x1:x2] = sampled_latent[0, :, y1:y2, x1:x2]
                    latents.append(new_latent)  # add new latent
        else:
            # FORK BEFORE SAMPLING
            for r in range(rows):
                for c in range(columns):
                    # copy source mask to a new empty mask
                    new_mask = torch.zeros((latent_height_as_img, latent_width_as_img))
                    new_mask[mask_height * r:mask_height * (r + 1), mask_width * c:mask_width * (c + 1)] = mask[0, :, :,
                                                                                                           0]

                    # prepare latent w/ mask and send to ksampler
                    new_latent = set_mask_node.set_mask(samples=latent_image.copy(), mask=new_mask)[0]
                    new_latent = \
                    super().sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive,
                                   negative,
                                   new_latent, start_at_step, end_at_step, return_with_leftover_noise, denoise)[0][
                        'samples']

                    latents.append(new_latent)  # add new latent

        return ({"samples": torch.cat([batch for batch in latents], dim=0)},)

```
