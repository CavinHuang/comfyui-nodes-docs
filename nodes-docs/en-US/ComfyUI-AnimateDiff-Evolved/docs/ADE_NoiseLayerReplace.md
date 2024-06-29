---
tags:
- Noise
---

# Noise Layer [Replace] 🎭🅐🅓
## Documentation
- Class name: `ADE_NoiseLayerReplace`
- Category: `Animate Diff 🎭🅐🅓/noise layers`
- Output node: `False`

This node is designed to replace specific noise layers within an animation or image generation process, allowing for the customization of noise patterns by overlaying new noise on top of existing noise based on a mask. It facilitates the creation of varied visual textures and effects by selectively modifying the noise characteristics.
## Input types
### Required
- **`batch_offset`**
    - Determines the offset for batch processing, affecting how noise patterns are applied across different items in a batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_type`**
    - Specifies the type of noise to be used in the replacement process, influencing the visual texture and characteristics of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_gen_override`**
    - Overrides the default seed generator, allowing for custom seed generation strategies that can affect the randomness and distribution of the noise.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed_offset`**
    - Applies an additional offset to the seed value, further customizing the randomness of the noise generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_noise_layers`**
    - Specifies the previous configuration of noise layers to be modified, allowing for the integration of the new noise layer into the existing sequence.
    - Comfy dtype: `NOISE_LAYERS`
    - Python dtype: `NoiseLayerGroup`
- **`mask_optional`**
    - Defines a mask to control where the noise is replaced, enabling selective application of new noise patterns on specific areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`seed_override`**
    - Directly specifies a seed value, overriding any automatic seed generation for precise control over the noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`noise_layers`**
    - Comfy dtype: `NOISE_LAYERS`
    - Returns the modified noise layer configuration, incorporating the newly replaced noise layer for subsequent processing.
    - Python dtype: `NoiseLayerGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NoiseLayerReplaceNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "noise_type": (NoiseLayerType.LIST,),
                "seed_gen_override": (SeedNoiseGeneration.LIST_WITH_OVERRIDE,),
                "seed_offset": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX}),
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
                      prev_noise_layers: NoiseLayerGroup=None, mask_optional: Tensor=None, seed_override: int=None,):
        # prepare prev_noise_layers
        if prev_noise_layers is None:
            prev_noise_layers = NoiseLayerGroup()
        prev_noise_layers = prev_noise_layers.clone()
        # create layer
        layer = NoiseLayerReplace(noise_type=noise_type, batch_offset=batch_offset, seed_gen_override=seed_gen_override, seed_offset=seed_offset,
                                  seed_override=seed_override, mask=mask_optional)
        prev_noise_layers.add_to_start(layer)
        return (prev_noise_layers,)

```
