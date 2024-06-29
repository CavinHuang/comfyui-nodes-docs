---
tags:
- Noise
---

# Noise Layer [Add] 🎭🅐🅓
## Documentation
- Class name: `ADE_NoiseLayerAdd`
- Category: `Animate Diff 🎭🅐🅓/noise layers`
- Output node: `False`

The `ADE_NoiseLayerAdd` node is designed to integrate an additive noise layer into a given noise structure, enhancing the variability and complexity of the noise pattern. This node facilitates the dynamic adjustment of noise characteristics in generative models, allowing for more nuanced and controlled modifications to the generated outputs.
## Input types
### Required
- **`batch_offset`**
    - Specifies the offset for batch processing, affecting how noise is applied across different batches, thereby enabling more precise control over the noise application process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_type`**
    - Defines the type of noise to be added, determining the characteristics and behavior of the noise layer within the generative process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_gen_override`**
    - Allows for the override of the default seed generation mechanism, enabling custom seed generation strategies for noise creation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_offset`**
    - Provides an additional offset to the seed value, further customizing the noise generation process for enhanced variability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_weight`**
    - Determines the weight of the added noise, influencing the intensity and impact of the noise on the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_noise_layers`**
    - Optional parameter to specify previous noise layers, enabling the stacking and combination of multiple noise layers for complex noise structures.
    - Comfy dtype: `NOISE_LAYERS`
    - Python dtype: `NoiseLayerGroup`
- **`mask_optional`**
    - An optional mask to selectively apply noise, allowing for targeted noise application in specific areas of interest.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`seed_override`**
    - Optionally overrides the seed used for noise generation, providing direct control over the randomness of the noise.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`noise_layers`**
    - Comfy dtype: `NOISE_LAYERS`
    - Returns the updated noise layer group, including the newly added additive noise layer, facilitating the construction of layered noise structures.
    - Python dtype: `NoiseLayerGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NoiseLayerAddNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "noise_type": (NoiseLayerType.LIST,),
                "seed_gen_override": (SeedNoiseGeneration.LIST_WITH_OVERRIDE,),
                "seed_offset": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX}),
                "noise_weight": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.001}),
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
                      noise_weight: float,
                      prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None,):
        # prepare prev_noise_layers
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        # create layer
        layer = NoiseLayerAdd(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset,
                              seed_override=seed_override, mask=mask_optional,
                              noise_weight=noise_weight)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)

```
