---
tags:
- Noise
---

# Noise Layer [Add Weighted] 🎭🅐🅓
## Documentation
- Class name: `ADE_NoiseLayerAddWeighted`
- Category: `Animate Diff 🎭🅐🅓/noise layers`
- Output node: `False`

The ADE_NoiseLayerAddWeighted node specializes in enhancing the noise layering process by applying a weighted addition of noise to an existing noise layer. It leverages a balance multiplier to fine-tune the impact of new noise on the existing noise structure, aiming to achieve a more controlled and nuanced noise integration.
## Input types
### Required
- **`batch_offset`**
    - Specifies the offset for batch processing, affecting how noise is applied across different batches.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_type`**
    - Defines the type of noise to be added, influencing the characteristics of the noise applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_gen_override`**
    - Allows for overriding the default seed generation mechanism, enabling custom noise generation patterns.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_offset`**
    - Determines the offset applied to the seed value, facilitating varied noise generation outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_weight`**
    - Controls the weight of the new noise being added, allowing for adjustment of the noise's influence on the existing layer.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`balance_multiplier`**
    - Adjusts the balance between the old and new noise, fine-tuning the overall effect of noise addition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_noise_layers`**
    - Represents the previous state of noise layers, enabling sequential layering of noise for complex effects.
    - Comfy dtype: `NOISE_LAYERS`
    - Python dtype: `NoiseLayerGroup`
- **`mask_optional`**
    - An optional mask that can be applied to selectively influence the noise addition process, providing further control over the noise characteristics.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`seed_override`**
    - Provides an option to override the seed value used for noise generation, offering control over the randomness aspect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`noise_layers`**
    - Comfy dtype: `NOISE_LAYERS`
    - Outputs the updated noise layer group after the addition of the weighted noise layer, reflecting the new state of noise layering.
    - Python dtype: `NoiseLayerGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NoiseLayerAddWeightedNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "noise_type": (NoiseLayerType.LIST,),
                "seed_gen_override": (SeedNoiseGeneration.LIST_WITH_OVERRIDE,),
                "seed_offset": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX}),
                "noise_weight": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.001}),
                "balance_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            },
            "optional": {
                "prev_noise_layers": ("NOISE_LAYERS",),
                "mask_optional": ("MASK",),
                "seed_override": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "forceInput": True}),
            }
        }

    RETURN_TYPES = ("NOISE_LAYERS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/noise layers"
    FUNCTION = "create_layers"

    def create_layers(self, batch_offset: int, noise_type: str, seed_gen_override: str, seed_offset: int,
                      noise_weight: float, balance_multiplier: float,
                      prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None,):
        # prepare prev_noise_layers
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        # create layer
        layer = NoiseLayerAddWeighted(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset,
                              seed_override=seed_override, mask=mask_optional,
                              noise_weight=noise_weight, balance_multiplier=balance_multiplier)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)

```
