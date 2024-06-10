---
tags:
- Prompt
- PromptStyling
---

# Prompt With Style V1 (Mikey)
## Documentation
- Class name: `Prompt With Style`
- Category: `Mikey`
- Output node: `True`

The PromptWithStyle node is designed to process textual prompts by applying specific styles, removing or replacing certain syntax, and incorporating user-defined styles. It aims to enhance the expressiveness and specificity of prompts through stylistic modifications and the integration of dynamic elements based on input parameters.
## Input types
### Required
- **`positive_prompt`**
    - Represents the positive aspect of the textual content to which styles and modifications will be applied. It is crucial for generating the enhanced positive output prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - Represents the negative aspect of the textual content to which styles and modifications will be applied. It is essential for generating the enhanced negative output prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style`**
    - Specifies the style to be applied to both positive and negative prompts. It determines the stylistic adjustments and enhancements made to the prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ratio_selected`**
    - Determines the aspect ratio for image generation, influencing the dimensions of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`batch_size`**
    - Specifies the number of samples to be processed in a single batch, affecting the node's execution efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - Influences the randomness involved in processing the prompts, such as in wildcard replacement or random syntax processing. It ensures reproducibility and consistency across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`samples`**
    - Comfy dtype: `LATENT`
    - The generated samples based on the processed prompts and applied styles.
    - Python dtype: `List[torch.Tensor]`
- **`positive_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The enhanced positive prompt text after processing and applying styles.
    - Python dtype: `str`
- **`negative_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The enhanced negative prompt text after processing and applying styles.
    - Python dtype: `str`
- **`positive_style_text_l`**
    - Comfy dtype: `STRING`
    - The text representing the applied positive style after processing.
    - Python dtype: `str`
- **`negative_style_text_l`**
    - Comfy dtype: `STRING`
    - The text representing the applied negative style after processing.
    - Python dtype: `str`
- **`width`**
    - Comfy dtype: `INT`
    - The width dimension of the generated samples.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height dimension of the generated samples.
    - Python dtype: `int`
- **`refiner_width`**
    - Comfy dtype: `INT`
    - The width dimension for the refined samples.
    - Python dtype: `int`
- **`refiner_height`**
    - Comfy dtype: `INT`
    - The height dimension for the refined samples.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptWithStyle:
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
                             },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ('LATENT','STRING','STRING','STRING','STRING','INT','INT','INT','INT',)
    RETURN_NAMES = ('samples','positive_prompt_text_g','negative_prompt_text_g','positive_style_text_l',
                    'negative_style_text_l','width','height','refiner_width','refiner_height',)
    FUNCTION = 'start'
    CATEGORY = 'Mikey'
    OUTPUT_NODE = True

    def start(self, positive_prompt, negative_prompt, style, ratio_selected, batch_size, seed,
              prompt=None, extra_pnginfo=None):
        # use search and replace
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)
        # process random syntax
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)
        # process wildcards
        #print('Positive Prompt Entered:', positive_prompt)
        pos_prompt = find_and_replace_wildcards(positive_prompt, seed, debug=True)
        #print('Positive Prompt:', pos_prompt)
        #print('Negative Prompt Entered:', negative_prompt)
        neg_prompt = find_and_replace_wildcards(negative_prompt, seed, debug=True)
        #print('Negative Prompt:', neg_prompt)
        if pos_prompt != '' and pos_prompt != 'Positive Prompt' and pos_prompt is not None:
            if '{prompt}' in self.pos_style[style]:
                pos_prompt = self.pos_style[style].replace('{prompt}', pos_prompt)
            else:
                if self.pos_style[style]:
                    pos_prompt = pos_prompt + ', ' + self.pos_style[style]
        else:
            pos_prompt = self.pos_style[style]
        if neg_prompt != '' and neg_prompt != 'Negative Prompt' and neg_prompt is not None:
            if '{prompt}' in self.neg_style[style]:
                neg_prompt = self.neg_style[style].replace('{prompt}', neg_prompt)
            else:
                if self.neg_style[style]:
                    neg_prompt = neg_prompt + ', ' + self.neg_style[style]
        else:
            neg_prompt = self.neg_style[style]
        width = self.ratio_dict[ratio_selected]["width"]
        height = self.ratio_dict[ratio_selected]["height"]
        # calculate dimensions for target_width, target height (base) and refiner_width, refiner_height (refiner)
        ratio = min([width, height]) / max([width, height])
        target_width, target_height = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        #print('Width:', width, 'Height:', height,
        #      'Target Width:', target_width, 'Target Height:', target_height,
        #      'Refiner Width:', refiner_width, 'Refiner Height:', refiner_height)
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({"samples":latent},
                str(pos_prompt),
                str(neg_prompt),
                str(self.pos_style[style]),
                str(self.neg_style[style]),
                width,
                height,
                refiner_width,
                refiner_height,)

```
