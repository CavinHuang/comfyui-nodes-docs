---
tags:
- Prompt
- Text
---

# Lora Syntax Processor (Mikey)
## Documentation
- Class name: `LoraSyntaxProcessor`
- Category: `Mikey/Lora`
- Output node: `False`

The LoraSyntaxProcessor node is designed to interpret and process specific syntax within text inputs to dynamically modify machine learning models and their parameters. It focuses on parsing 'lora' syntax to apply corresponding adjustments to models and clips, facilitating the customization of model behavior based on textual prompts.
## Input types
### Required
- **`model`**
    - The machine learning model to be adjusted based on the 'lora' syntax within the text input.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - A clip parameter that may be modified alongside the model as part of the 'lora' syntax processing.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.Tensor`
- **`text`**
    - The text input containing 'lora' syntax that specifies how the model and clip should be adjusted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A seed value used for processing random syntax within the text input, ensuring reproducibility.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The adjusted machine learning model after processing the 'lora' syntax.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The modified clip parameter after 'lora' syntax processing.
    - Python dtype: `torch.Tensor`
- **`text`**
    - Comfy dtype: `STRING`
    - The original text input before any processing, for reference or further use.
    - Python dtype: `str`
- **`unprocessed_text`**
    - Comfy dtype: `STRING`
    - The original text input with 'lora' syntax removed, indicating the adjustments have been applied.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoraSyntaxProcessor:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "model": ("MODEL",),
                    "clip": ("CLIP",),
                    "text": ("STRING", {"multiline": True, "default": "<lora:filename:weight>"}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
                    },
                "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"},
                }

    RETURN_TYPES = ('MODEL','CLIP','STRING','STRING')
    RETURN_NAMES = ('model','clip','text','unprocessed_text')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Lora'

    def process(self, model, clip, text, seed, extra_pnginfo=None, prompt=None):
        # process random syntax
        text = process_random_syntax(text, seed)
        # search and replace
        text = search_and_replace(text, extra_pnginfo, prompt)
        lora_re = r'<lora:(.*?)(?::(.*?))?>'
        # find all lora prompts
        lora_prompts = re.findall(lora_re, text)
        stripped_text = text
        # if we found any lora prompts
        clip_lora = clip
        if len(lora_prompts) > 0:
            # loop through each lora prompt
            for lora_prompt in lora_prompts:
                # get the lora filename
                lora_filename = lora_prompt[0]
                # check for file extension in filename
                if '.safetensors' not in lora_filename:
                    lora_filename += '.safetensors'
                # get the lora multiplier
                try:
                    lora_multiplier = float(lora_prompt[1]) if lora_prompt[1] != '' else 1.0
                except:
                    lora_multiplier = 1.0    
                model, clip = load_lora(model, clip, lora_filename, lora_multiplier, lora_multiplier)
        # strip lora syntax from text
        stripped_text = re.sub(lora_re, '', stripped_text)
        return (model, clip, stripped_text,  text, )

```
