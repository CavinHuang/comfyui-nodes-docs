---
tags:
- Prompt
- PromptStyling
---

# Prompt With Style V2 (Mikey)
## Documentation
- Class name: `Prompt With Style V2`
- Category: `Mikey`
- Output node: `False`

This node processes textual prompts by applying a specified style, removing any style syntax, and handling positive and negative prompts differently based on the style. It also incorporates seed-based modifications to ensure variability in the output.
## Input types
### Required
- **`positive_prompt`**
    - The positive prompt to be styled and modified. It undergoes transformations based on the specified style and seed, contributing to the generation of the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The negative prompt to be styled and modified similarly to the positive prompt, but with potentially different style applications based on the specified style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style`**
    - The style to be applied to the prompts. It determines how the prompts are modified and styled, playing a crucial role in the output generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ratio_selected`**
    - The selected ratio for image generation, affecting the dimensions of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_size`**
    - The number of prompts to process in a single batch, affecting performance and output volume.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value used to introduce variability and randomness in the processing of prompts, affecting how wildcards and random syntax are handled.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`clip_base`**
    - The base CLIP model used for encoding the prompts.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`clip_refiner`**
    - The CLIP refiner model used for refining the encoded prompts.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
## Output types
- **`samples`**
    - Comfy dtype: `LATENT`
    - The generated samples based on the processed prompts and applied styles.
    - Python dtype: `list`
- **`base_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - The positive condition base encoding result from the CLIP model.
    - Python dtype: `object`
- **`base_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - The negative condition base encoding result from the CLIP model.
    - Python dtype: `object`
- **`refiner_pos_cond`**
    - Comfy dtype: `CONDITIONING`
    - The positive condition refiner encoding result from the CLIP refiner model.
    - Python dtype: `object`
- **`refiner_neg_cond`**
    - Comfy dtype: `CONDITIONING`
    - The negative condition refiner encoding result from the CLIP refiner model.
    - Python dtype: `object`
- **`positive_prompt`**
    - Comfy dtype: `STRING`
    - The processed positive prompt with the applied style, stripped of any style syntax.
    - Python dtype: `str`
- **`negative_prompt`**
    - Comfy dtype: `STRING`
    - The processed negative prompt with the applied style, stripped of any style syntax.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptWithStyleV2:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        s.styles, s.pos_style, s.neg_style = read_styles()
        return {"required": {"positive_prompt": ("STRING", {"multiline": True, 'default': 'Positive Prompt'}),
                             "negative_prompt": ("STRING", {"multiline": True, 'default': 'Negative Prompt'}),
                             "style": (s.styles,),
                             "ratio_selected": (s.ratio_sizes,),
                             "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "clip_base": ("CLIP",), "clip_refiner": ("CLIP",),
                             }
        }

    RETURN_TYPES = ('LATENT',
                    'CONDITIONING','CONDITIONING','CONDITIONING','CONDITIONING',
                    'STRING','STRING')
    RETURN_NAMES = ('samples',
                    'base_pos_cond','base_neg_cond','refiner_pos_cond','refiner_neg_cond',
                    'positive_prompt','negative_prompt')

    FUNCTION = 'start'
    CATEGORY = 'Mikey'

    def start(self, clip_base, clip_refiner, positive_prompt, negative_prompt, style, ratio_selected, batch_size, seed):
        """ get output from PromptWithStyle.start """
        (latent,
         pos_prompt, neg_prompt,
         pos_style, neg_style,
         width, height,
         refiner_width, refiner_height) = PromptWithStyle.start(self, positive_prompt,
                                                                negative_prompt,
                                                                style, ratio_selected,
                                                                batch_size, seed)
        # calculate dimensions for target_width, target height (base) and refiner_width, refiner_height (refiner)
        ratio = min([width, height]) / max([width, height])
        target_width, target_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        #print('Width:', width, 'Height:', height,
        #     'Target Width:', target_width, 'Target Height:', target_height,
        #     'Refiner Width:', refiner_width, 'Refiner Height:', refiner_height)
        # encode text
        sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base, width, height, 0, 0, target_width, target_height, pos_prompt, pos_style)[0]
        sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base, width, height, 0, 0, target_width, target_height, neg_prompt, neg_style)[0]
        refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt)[0]
        refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt)[0]
        # return
        return (latent,
                sdxl_pos_cond, sdxl_neg_cond,
                refiner_pos_cond, refiner_neg_cond,
                pos_prompt, neg_prompt)

```
