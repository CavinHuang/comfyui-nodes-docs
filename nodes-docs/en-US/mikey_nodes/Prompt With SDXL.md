---
tags:
- Prompt
- PromptStyling
---

# Prompt With SDXL (Mikey)
## Documentation
- Class name: `Prompt With SDXL`
- Category: `Mikey`
- Output node: `False`

The Prompt With SDXL node is designed to process and encode textual prompts with specific styles for image generation, utilizing both positive and negative prompts. It integrates with the CLIPTextEncodeSDXL and CLIPTextEncodeSDXLRefiner for encoding, and applies various transformations including syntax stripping, metadata addition, and condition encoding to prepare the prompts for the image generation process.
## Input types
### Required
- **`positive_prompt`**
    - The positive prompt is a textual input that describes desired attributes or elements to be included in the generated image. It plays a crucial role in guiding the image generation process towards the intended outcome.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The negative prompt specifies undesired attributes or elements to be excluded from the generated image. It helps in refining the output by preventing the inclusion of specified elements, thus enhancing the relevance of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_style`**
    - Specifies the style to be applied to the positive prompt, influencing the aesthetic and thematic direction of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_style`**
    - Specifies the style to be applied to the negative prompt, influencing the aesthetic and thematic direction of the generated image by excluding certain styles.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ratio_selected`**
    - Determines the aspect ratio for the generated image, influencing its dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_size`**
    - Specifies the number of images to be generated in a single batch, allowing for bulk processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - The seed parameter is used to ensure reproducibility in the image generation process. It initializes the random number generator, allowing for consistent results across multiple runs with the same inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_option`**
    - Defines how the prompts and styles are combined and encoded for the image generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`samples`**
    - Comfy dtype: `LATENT`
    - The generated image samples based on the processed and encoded prompts.
    - Python dtype: `torch.Tensor`
- **`positive_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The processed positive prompt text for the 'g' channel encoding.
    - Python dtype: `str`
- **`negative_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The processed negative prompt text for the 'g' channel encoding.
    - Python dtype: `str`
- **`positive_style_text_l`**
    - Comfy dtype: `STRING`
    - The processed positive style text for the 'l' channel encoding.
    - Python dtype: `str`
- **`negative_style_text_l`**
    - Comfy dtype: `STRING`
    - The processed negative style text for the 'l' channel encoding.
    - Python dtype: `str`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the generated image.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the generated image.
    - Python dtype: `int`
- **`refiner_width`**
    - Comfy dtype: `INT`
    - The width of the image after refinement.
    - Python dtype: `int`
- **`refiner_height`**
    - Comfy dtype: `INT`
    - The height of the image after refinement.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptWithSDXL:
    @classmethod
    def INPUT_TYPES(s):
        s.ratio_sizes, s.ratio_dict = read_ratios()
        return {"required": {"positive_prompt": ("STRING", {"multiline": True, 'default': 'Positive Prompt'}),
                             "negative_prompt": ("STRING", {"multiline": True, 'default': 'Negative Prompt'}),
                             "positive_style": ("STRING", {"multiline": True, 'default': 'Positive Style'}),
                             "negative_style": ("STRING", {"multiline": True, 'default': 'Negative Style'}),
                             "ratio_selected": (s.ratio_sizes,),
                             "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
                             },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ('LATENT','STRING','STRING','STRING','STRING','INT','INT','INT','INT',)
    RETURN_NAMES = ('samples','positive_prompt_text_g','negative_prompt_text_g','positive_style_text_l',
                    'negative_style_text_l','width','height','refiner_width','refiner_height',)
    FUNCTION = 'start'
    CATEGORY = 'Mikey'
    OUTPUT_NODE = True

    def start(self, positive_prompt, negative_prompt, positive_style, negative_style, ratio_selected, batch_size, seed,
              prompt=None, extra_pnginfo=None):
        # search and replace
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)
        # process random syntax
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)
        # process wildcards
        positive_prompt = find_and_replace_wildcards(positive_prompt, seed)
        negative_prompt = find_and_replace_wildcards(negative_prompt, seed)
        width = self.ratio_dict[ratio_selected]["width"]
        height = self.ratio_dict[ratio_selected]["height"]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        # calculate dimensions for target_width, target height (base) and refiner_width, refiner_height (refiner)
        ratio = min([width, height]) / max([width, height])
        target_width, target_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        #print('Width:', width, 'Height:', height,
        #      'Target Width:', target_width, 'Target Height:', target_height,
        #      'Refiner Width:', refiner_width, 'Refiner Height:', refiner_height)
        return ({"samples":latent},
                str(positive_prompt),
                str(negative_prompt),
                str(positive_style),
                str(negative_style),
                width,
                height,
                refiner_width,
                refiner_height,)

```
