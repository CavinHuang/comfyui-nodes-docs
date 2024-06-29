---
tags:
- AnimateDiff
- Animation
---

# Sample Settings 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffSamplingSettings`
- Category: `Animate Diff 🎭🅐🅓`
- Output node: `False`

This node is designed to configure and apply advanced sampling settings for the AnimateDiff process, enabling precise control over the animation generation process through detailed sampling parameters.
## Input types
### Required
- **`batch_offset`**
    - Specifies the offset for the batch processing, allowing for sequential or staggered processing of animation frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_type`**
    - Defines the type of noise to be applied during the sampling process, influencing the texture and details of the generated animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_gen`**
    - Determines the seed generation strategy, ensuring reproducibility or variability in the animation outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_offset`**
    - Adjusts the seed value by a specified offset, enabling variations in the animation while maintaining a degree of control.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`noise_layers`**
    - Optional parameter that allows for the customization of noise layers, further refining the animation's visual characteristics.
    - Comfy dtype: `NOISE_LAYERS`
    - Python dtype: `NoiseLayerGroup`
- **`iteration_opts`**
    - Provides additional iteration options to fine-tune the animation process, such as step adjustments and caching strategies.
    - Comfy dtype: `ITERATION_OPTS`
    - Python dtype: `IterationOptions`
- **`seed_override`**
    - Directly overrides the seed value, offering an alternative method for controlling the animation's randomness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`adapt_denoise_steps`**
    - Enables or disables the adaptation of denoise steps based on the animation's requirements, optimizing the generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`custom_cfg`**
    - Allows for the integration of custom configuration settings, enhancing the flexibility and creativity of the animation.
    - Comfy dtype: `CUSTOM_CFG`
    - Python dtype: `CustomCFGKeyframeGroup`
- **`sigma_schedule`**
    - Specifies a sigma schedule to be used during sampling, affecting the diffusion process and the animation's smoothness.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
## Output types
- **`settings`**
    - Comfy dtype: `SAMPLE_SETTINGS`
    - Returns the configured sampling settings, ready to be applied to the AnimateDiff process.
    - Python dtype: `SampleSettings`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SampleSettingsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "noise_type": (NoiseLayerType.LIST,),
                "seed_gen": (SeedNoiseGeneration.LIST,),
                "seed_offset": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX}),
            },
            "optional": {
                "noise_layers": ("NOISE_LAYERS",),
                "iteration_opts": ("ITERATION_OPTS",),
                "seed_override": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "forceInput": True}),
                "adapt_denoise_steps": ("BOOLEAN", {"default": False},),
                "custom_cfg": ("CUSTOM_CFG",),
                "sigma_schedule": ("SIGMA_SCHEDULE",),
            }
        }

    RETURN_TYPES = ("SAMPLE_SETTINGS",)
    RETURN_NAMES = ("settings",)
    CATEGORY = "Animate Diff 🎭🅐🅓"
    FUNCTION = "create_settings"

    def create_settings(self, batch_offset: int, noise_type: str, seed_gen: str, seed_offset: int, noise_layers: NoiseLayerGroup=None,
                        iteration_opts: IterationOptions=None, seed_override: int=None, adapt_denoise_steps=False,
                        custom_cfg: CustomCFGKeyframeGroup=None, sigma_schedule: SigmaSchedule=None):
        sampling_settings = SampleSettings(batch_offset=batch_offset, noise_type=noise_type, seed_gen=seed_gen, seed_offset=seed_offset, noise_layers=noise_layers,
                                           iteration_opts=iteration_opts, seed_override=seed_override, adapt_denoise_steps=adapt_denoise_steps,
                                           custom_cfg=custom_cfg, sigma_schedule=sigma_schedule)
        return (sampling_settings,)

```
