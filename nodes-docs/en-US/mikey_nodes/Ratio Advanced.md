---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# Ratio Advanced (Mikey)
## Documentation
- Class name: `Ratio Advanced`
- Category: `Mikey/Utils`
- Output node: `False`

The `Ratio Advanced` node is designed to provide advanced functionalities for managing and selecting image ratios. It encompasses reading, updating, and utilizing predefined and custom ratio presets for image generation tasks, allowing for flexible image dimension specifications based on user input or predefined standards.
## Input types
### Required
- **`preset`**
    - Specifies the ratio preset to be used. If 'none' is selected, custom dimensions can be specified, allowing for greater flexibility in image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`swap_axis`**
    - Determines whether the width and height of the selected ratio should be swapped, enabling orientation changes without altering the ratio itself.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`select_latent_ratio`**
    - Selects a specific ratio for the latent space dimensions, which can influence the aspect ratio of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_latent_w`**
    - Allows for the specification of a custom width for the latent space, offering precise control over the generated image's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`custom_latent_h`**
    - Allows for the specification of a custom height for the latent space, offering precise control over the generated image's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_cte_ratio`**
    - Selects a specific ratio for constant tensor extension (CTE), which can affect the final image dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cte_w`**
    - Specifies a custom width for the constant tensor extension, providing flexibility in adjusting the image dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cte_h`**
    - Specifies a custom height for the constant tensor extension, providing flexibility in adjusting the image dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cte_mult`**
    - Applies a multiplier to the constant tensor extension dimensions, allowing for dynamic scaling of the image size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cte_res`**
    - Specifies a resolution for the constant tensor extension, enabling precise control over the image quality and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cte_fit_size`**
    - Adjusts the constant tensor extension dimensions to fit within a specified size, ensuring the generated image meets certain size constraints.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`select_target_ratio`**
    - Selects a target ratio for the final image, influencing its aspect ratio and overall appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`target_w`**
    - Specifies a custom width for the target image, allowing for detailed control over its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_h`**
    - Specifies a custom height for the target image, allowing for detailed control over its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_mult`**
    - Applies a multiplier to the target image dimensions, facilitating dynamic adjustments to its size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_res`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_fit_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop_w`**
    - Specifies the width for cropping the image, allowing for precise control over the portion of the image to be used.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Specifies the height for cropping the image, allowing for precise control over the portion of the image to be used.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`use_preset_seed`**
    - Determines whether a preset seed should be used for generating images, ensuring consistency in image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Specifies the seed value to be used for image generation, allowing for reproducible results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent_w`**
    - Comfy dtype: `INT`
    - The width of the latent space after processing, reflecting the dimensions used for image generation.
    - Python dtype: `int`
- **`latent_h`**
    - Comfy dtype: `INT`
    - The height of the latent space after processing, reflecting the dimensions used for image generation.
    - Python dtype: `int`
- **`cte_w`**
    - Comfy dtype: `INT`
    - The width of the constant tensor extension after processing, which can influence the final image dimensions.
    - Python dtype: `int`
- **`cte_h`**
    - Comfy dtype: `INT`
    - The height of the constant tensor extension after processing, which can influence the final image dimensions.
    - Python dtype: `int`
- **`target_w`**
    - Comfy dtype: `INT`
    - The width of the target image after processing, reflecting the final dimensions of the generated image.
    - Python dtype: `int`
- **`target_h`**
    - Comfy dtype: `INT`
    - The height of the target image after processing, reflecting the final dimensions of the generated image.
    - Python dtype: `int`
- **`crop_w`**
    - Comfy dtype: `INT`
    - The width used for cropping the image, reflecting the portion of the image that was selected for use.
    - Python dtype: `int`
- **`crop_h`**
    - Comfy dtype: `INT`
    - The height used for cropping the image, reflecting the portion of the image that was selected for use.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RatioAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        default_ratio = s.ratio_sizes[0]
        # prepend 'custom' to ratio_sizes
        s.ratio_sizes.insert(0, 'custom')
        s.ratio_presets, s.ratio_config = read_ratio_presets()
        if 'none' not in s.ratio_presets:
            s.ratio_presets.append('none')
        return {"required": { "preset": (s.ratio_presets, {"default": "none"}),
                              "swap_axis": (['true','false'], {"default": 'false'}),
                              "select_latent_ratio": (s.ratio_sizes, {'default': default_ratio}),
                              "custom_latent_w": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "custom_latent_h": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "select_cte_ratio": (s.ratio_sizes, {'default': default_ratio}),
                              "cte_w": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "cte_h": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "cte_mult": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                              "cte_res": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "cte_fit_size": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "select_target_ratio": (s.ratio_sizes, {'default': default_ratio}),
                              "target_w": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "target_h": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "target_mult": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                              "target_res": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "target_fit_size": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "crop_w": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "crop_h": ("INT", {"default": 0, "min": 0, "max": 8192, "step": 1}),
                              "use_preset_seed": (['true','false'], {"default": 'false'}),
                              "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                              },
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

    def mult(self, width, height, mult):
        return int(width * mult), int(height * mult)

    def fit(self, width, height, fit_size):
        if width > height:
            return fit_size, int(height * fit_size / width)
        else:
            return int(width * fit_size / height), fit_size

    def res(self, width, height, res):
        return find_latent_size(width, height, res)

    def calculate(self, preset, swap_axis, select_latent_ratio, custom_latent_w, custom_latent_h,
                  select_cte_ratio, cte_w, cte_h, cte_mult, cte_res, cte_fit_size,
                  select_target_ratio, target_w, target_h, target_mult, target_res, target_fit_size,
                  crop_w, crop_h, use_preset_seed, seed, unique_id=None, extra_pnginfo=None, prompt=None):
        # check if use_preset_seed is true
        if use_preset_seed == 'true' and len(self.ratio_presets) > 1:
            # seed is a randomly generated number that can be much larger than the number of presets
            # we use the seed to select a preset
            offset = seed % len(self.ratio_presets - 1)
            presets = [p for p in self.ratio_presets if p != 'none']
            preset = presets[offset]
        # check if ratio preset is selected
        if preset != 'none':
            latent_width = self.ratio_config[preset]['custom_latent_w']
            latent_height = self.ratio_config[preset]['custom_latent_h']
            cte_w = self.ratio_config[preset]['cte_w']
            cte_h = self.ratio_config[preset]['cte_h']
            target_w = self.ratio_config[preset]['target_w']
            target_h = self.ratio_config[preset]['target_h']
            crop_w = self.ratio_config[preset]['crop_w']
            crop_h = self.ratio_config[preset]['crop_h']
            if swap_axis == 'true':
                latent_width, latent_height = latent_height, latent_width
                cte_w, cte_h = cte_h, cte_w
                target_w, target_h = target_h, target_w
                crop_w, crop_h = crop_h, crop_w
            """
            example user_ratio_presets.json
            {
                "ratio_presets": {
                    "all_1024": {
                        "custom_latent_w": 1024,
                        "custom_latent_h": 1024,
                        "cte_w": 1024,
                        "cte_h": 1024,
                        "target_w": 1024,
                        "target_h": 1024,
                        "crop_w": 0,
                        "crop_h": 0
                    },
                }
            }
            """
            return (latent_width, latent_height,
                    cte_w, cte_h,
                    target_w, target_h,
                    crop_w, crop_h)
        # if no preset is selected, check if custom latent ratio is selected
        if select_latent_ratio != 'custom':
            latent_width = self.ratio_dict[select_latent_ratio]["width"]
            latent_height = self.ratio_dict[select_latent_ratio]["height"]
        else:
            latent_width = custom_latent_w
            latent_height = custom_latent_h
        # check if cte ratio is selected
        if select_cte_ratio != 'custom':
            cte_w = self.ratio_dict[select_cte_ratio]["width"]
            cte_h = self.ratio_dict[select_cte_ratio]["height"]
        else:
            cte_w = cte_w
            cte_h = cte_h
        # check if cte_mult not 0
        if cte_mult != 0.0:
            cte_w, cte_h = self.mult(cte_w, cte_h, cte_mult)
        # check if cte_res not 0
        if cte_res != 0:
            cte_w, cte_h = self.res(cte_w, cte_h, cte_res)
        # check if cte_fit_size not 0
        if cte_fit_size != 0:
            cte_w, cte_h = self.fit(cte_w, cte_h, cte_fit_size)
        # check if target ratio is selected
        if select_target_ratio != 'custom':
            target_w = self.ratio_dict[select_target_ratio]["width"]
            target_h = self.ratio_dict[select_target_ratio]["height"]
        else:
            target_w = target_w
            target_h = target_h
        # check if target_mult not 0
        if target_mult != 0.0:
            target_w, target_h = self.mult(target_w, target_h, target_mult)
        # check if target_res not 0
        if target_res != 0:
            target_w, target_h = self.res(target_w, target_h, target_res)
        # check if target_fit_size not 0
        if target_fit_size != 0:
            target_w, target_h = self.fit(target_w, target_h, target_fit_size)
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
