---
tags:
- Sampling
---

# StyleAligned Reference Sampler
## Documentation
- Class name: `StyleAlignedReferenceSampler`
- Category: `style_aligned`
- Output node: `False`

The StyleAlignedReferenceSampler node is designed to sample reference styles in a manner that aligns with specific style guidelines or constraints. It focuses on generating style references that adhere to predefined stylistic parameters, ensuring consistency and coherence in the style of the generated content.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sampling, ensuring that the generated styles align with the desired aesthetic or thematic guidelines.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`share_norm`**
    - Determines how normalization layers are shared across the model, influencing the consistency of style application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `SHARE_NORM_OPTIONS`
- **`share_attn`**
    - Controls how attention layers are shared, affecting the focus and coherence of the generated styles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `SHARE_ATTN_OPTIONS`
- **`scale`**
    - Adjusts the scale of the applied style, allowing for finer control over the intensity of style effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Specifies the number of samples to be processed in parallel, affecting the efficiency of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_seed`**
    - Determines the seed for noise generation, allowing for reproducibility and consistency in the style sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, adjusting the influence of the conditioning on the style sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive`**
    - Defines positive conditioning to guide the style sampling towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Conditioning`
- **`negative`**
    - Specifies negative conditioning to avoid certain attributes in the style sampling.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Conditioning`
- **`ref_positive`**
    - Provides additional positive conditioning specifically for reference style generation, enhancing the alignment with desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Conditioning`
- **`sampler`**
    - Selects the sampling strategy to be used, affecting the diversity and quality of the generated styles.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `Sampler`
- **`sigmas`**
    - Sets the noise levels for the sampling process, influencing the exploration of the style space.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `Sigmas`
- **`ref_latents`**
    - Inputs pre-existing latents to be used as a reference in the style sampling process, enabling more precise style alignment.
    - Comfy dtype: `STEP_LATENTS`
    - Python dtype: `Latent`
## Output types
- **`output`**
    - Comfy dtype: `LATENT`
    - Outputs the sampled latents according to the specified style guidelines.
    - Python dtype: `Latent`
- **`denoised_output`**
    - Comfy dtype: `LATENT`
    - Provides a denoised version of the sampled latents, potentially enhancing the clarity and quality of the generated styles.
    - Python dtype: `Latent`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StyleAlignedReferenceSampler:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "share_norm": (SHARE_NORM_OPTIONS,),
                "share_attn": (SHARE_ATTN_OPTIONS,),
                "scale": ("FLOAT", {"default": 1, "min": 0, "max": 2.0, "step": 0.01}),
                "batch_size": ("INT", {"default": 2, "min": 1, "max": 8, "step": 1}),
                "noise_seed": (
                    "INT",
                    {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF},
                ),
                "cfg": (
                    "FLOAT",
                    {
                        "default": 8.0,
                        "min": 0.0,
                        "max": 100.0,
                        "step": 0.1,
                        "round": 0.01,
                    },
                ),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "ref_positive": ("CONDITIONING",),
                "sampler": ("SAMPLER",),
                "sigmas": ("SIGMAS",),
                "ref_latents": ("STEP_LATENTS",),
            },
        }

    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("output", "denoised_output")
    FUNCTION = "patch"
    CATEGORY = "style_aligned"

    def patch(
        self,
        model: ModelPatcher,
        share_norm: str,
        share_attn: str,
        scale: float,
        batch_size: int,
        noise_seed: int,
        cfg: float,
        positive: T,
        negative: T,
        ref_positive: T,
        sampler: T,
        sigmas: T,
        ref_latents: T,
    ) -> "tuple[dict, dict]":
        m = model.clone()
        args = StyleAlignedArgs(share_attn)

        # Concat batch with style latent
        style_latent_tensor = ref_latents[0].unsqueeze(0)
        height, width = style_latent_tensor.shape[-2:]
        latent_t = torch.zeros(
            [batch_size, 4, height, width], device=ref_latents.device
        )
        latent = {"samples": latent_t}
        noise = comfy.sample.prepare_noise(latent_t, noise_seed)

        latent_t = torch.cat((style_latent_tensor, latent_t), dim=0)
        ref_noise = torch.zeros_like(noise[0]).unsqueeze(0)
        noise = torch.cat((ref_noise, noise), dim=0)

        x0_output = {}
        preview_callback = latent_preview.prepare_callback(m, sigmas.shape[-1] - 1, x0_output)

        # Replace first latent with the corresponding reference latent after each step
        def callback(step: int, x0: T, x: T, steps: int):
            preview_callback(step, x0, x, steps)
            if (step + 1 < steps):
                x[0] = ref_latents[step+1]
                x0[0] = ref_latents[step+1]

        # Register shared norms
        share_group_norm = share_norm in ["group", "both"]
        share_layer_norm = share_norm in ["layer", "both"]
        register_shared_norm(m, share_group_norm, share_layer_norm)

        # Patch cross attn
        m.set_model_attn1_patch(SharedAttentionProcessor(args, scale))

        # Add reference conditioning to batch 
        batched_condition = []
        for i,condition in enumerate(positive):
            additional = condition[1].copy()
            batch_with_reference = torch.cat([ref_positive[i][0], condition[0].repeat([batch_size] + [1] * len(condition[0].shape[1:]))], dim=0)
            if 'pooled_output' in additional and 'pooled_output' in ref_positive[i][1]:
                # combine pooled output
                pooled_output = torch.cat([ref_positive[i][1]['pooled_output'], additional['pooled_output'].repeat([batch_size] 
                    + [1] * len(additional['pooled_output'].shape[1:]))], dim=0)
                additional['pooled_output'] = pooled_output
            if 'control' in additional:
                if 'control' in ref_positive[i][1]:
                    # combine control conditioning
                    control_hint = torch.cat([ref_positive[i][1]['control'].cond_hint_original, additional['control'].cond_hint_original.repeat([batch_size] 
                        + [1] * len(additional['control'].cond_hint_original.shape[1:]))], dim=0)
                    cloned_controlnet = additional['control'].copy()
                    cloned_controlnet.set_cond_hint(control_hint, strength=additional['control'].strength, timestep_percent_range=additional['control'].timestep_percent_range)
                    additional['control'] = cloned_controlnet
                else:
                    # add zeros for first in batch
                    control_hint = torch.cat([torch.zeros_like(additional['control'].cond_hint_original), additional['control'].cond_hint_original.repeat([batch_size] 
                        + [1] * len(additional['control'].cond_hint_original.shape[1:]))], dim=0)
                    cloned_controlnet = additional['control'].copy()
                    cloned_controlnet.set_cond_hint(control_hint, strength=additional['control'].strength, timestep_percent_range=additional['control'].timestep_percent_range)
                    additional['control'] = cloned_controlnet
            batched_condition.append([batch_with_reference, additional])

        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(
            m,
            noise,
            cfg,
            sampler,
            sigmas,
            batched_condition,
            negative,
            latent_t,
            callback=callback,
            disable_pbar=disable_pbar,
            seed=noise_seed,
        )

        # remove reference image
        samples = samples[1:]

        out = latent.copy()
        out["samples"] = samples
        if "x0" in x0_output:
            out_denoised = latent.copy()
            x0 = x0_output["x0"][1:]
            out_denoised["samples"] = m.model.process_latent_out(x0.cpu())
        else:
            out_denoised = out
        return (out, out_denoised)

```
