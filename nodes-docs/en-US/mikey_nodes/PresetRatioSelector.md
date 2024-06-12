---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# Preset Ratio Selector (Mikey)
## Documentation
- Class name: `PresetRatioSelector`
- Category: `Mikey/Utils`
- Output node: `False`

The PresetRatioSelector node is designed to manage and apply predefined and user-defined ratio presets for image dimensions. It dynamically reads, merges, and deduplicates ratio presets from both a default set and user-customized configurations, providing a flexible way to select and apply specific aspect ratios for image generation tasks.
## Input types
### Required
- **`select_preset`**
    - Specifies the preset to be selected for determining image dimensions. This allows for the direct selection of a predefined or user-defined ratio preset.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_axis`**
    - Determines whether the width and height dimensions of selected ratios should be swapped, allowing for easy adjustment of orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_preset_seed`**
    - Indicates whether to use a preset seed for selecting a ratio preset, enabling deterministic selection of presets based on a seed value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The seed value used for deterministic selection of a ratio preset when 'use_preset_seed' is true. It ensures consistent preset selection across runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent_w`**
    - Comfy dtype: `INT`
    - The width dimension of the latent space determined by the selected preset.
    - Python dtype: `int`
- **`latent_h`**
    - Comfy dtype: `INT`
    - The height dimension of the latent space determined by the selected preset.
    - Python dtype: `int`
- **`cte_w`**
    - Comfy dtype: `INT`
    - Width dimension for clip text encode, determined by the selected preset.
    - Python dtype: `int`
- **`cte_h`**
    - Comfy dtype: `INT`
    - Height dimension for clip text encode, determined by the selected preset.
    - Python dtype: `int`
- **`target_w`**
    - Comfy dtype: `INT`
    - The target width dimension for image generation, determined by the selected preset.
    - Python dtype: `int`
- **`target_h`**
    - Comfy dtype: `INT`
    - The target height dimension for image generation, determined by the selected preset.
    - Python dtype: `int`
- **`crop_w`**
    - Comfy dtype: `INT`
    - The width dimension for cropping, determined by the selected preset.
    - Python dtype: `int`
- **`crop_h`**
    - Comfy dtype: `INT`
    - The height dimension for cropping, determined by the selected preset.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PresetRatioSelector:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_presets, s.ratio_config = read_ratio_presets()
        return {"required": { "select_preset": (s.ratio_presets, {"default": "none"}),
                              "swap_axis": (['true','false'], {"default": 'false'}),
                              "use_preset_seed": (['true','false'], {"default": 'false'}),
                              "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('INT', 'INT', # latent
                    'INT', 'INT', # clip text encode
                    'INT', 'INT', # target
                    'INT', 'INT') # crop
    RETURN_NAMES = ('latent_w', 'latent_h',
                    'cte_w', 'cte_h',
                    'target_w', 'target_h',
                    'crop_w', 'crop_h')
    CATEGORY = 'Mikey/Utils'
    FUNCTION = 'calculate'

    def calculate(self, select_preset, swap_axis, use_preset_seed, seed, unique_id=None, extra_pnginfo=None, prompt=None):
        # check if use_preset_seed is true
        if use_preset_seed == 'true' and len(self.ratio_presets) > 0:
            # seed is a randomly generated number that can be much larger than the number of presets
            # we use the seed to select a preset
            len_presets = len(self.ratio_presets)
            offset = seed % (len_presets - 1)
            presets = [p for p in self.ratio_presets if p != 'none']
            select_preset = presets[offset]
        latent_width = self.ratio_config[select_preset]['custom_latent_w']
        latent_height = self.ratio_config[select_preset]['custom_latent_h']
        cte_w = self.ratio_config[select_preset]['cte_w']
        cte_h = self.ratio_config[select_preset]['cte_h']
        target_w = self.ratio_config[select_preset]['target_w']
        target_h = self.ratio_config[select_preset]['target_h']
        crop_w = self.ratio_config[select_preset]['crop_w']
        crop_h = self.ratio_config[select_preset]['crop_h']
        if swap_axis == 'true':
            latent_width, latent_height = latent_height, latent_width
            cte_w, cte_h = cte_h, cte_w
            target_w, target_h = target_h, target_w
            crop_w, crop_h = crop_h, crop_w
        #prompt.get(str(unique_id))['inputs']['output_latent_w'] = str(latent_width)
        #prompt.get(str(unique_id))['inputs']['output_latent_h'] = str(latent_height)
        #prompt.get(str(unique_id))['inputs']['output_cte_w'] = str(cte_w)
        #prompt.get(str(unique_id))['inputs']['output_cte_h'] = str(cte_h)
        #prompt.get(str(unique_id))['inputs']['output_target_w'] = str(target_w)
        #prompt.get(str(unique_id))['inputs']['output_target_h'] = str(target_h)
        #prompt.get(str(unique_id))['inputs']['output_crop_w'] = str(crop_w)
        #prompt.get(str(unique_id))['inputs']['output_crop_h'] = str(crop_h)
        return (latent_width, latent_height,
                cte_w, cte_h,
                target_w, target_h,
                crop_w, crop_h)

```
