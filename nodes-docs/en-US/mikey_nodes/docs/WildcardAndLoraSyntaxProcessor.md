---
tags:
- Prompt
- Text
---

# Wildcard And Lora Syntax Processor (Mikey)
## Documentation
- Class name: `WildcardAndLoraSyntaxProcessor`
- Category: `Mikey/Lora`
- Output node: `False`

The WildcardAndLoraSyntaxProcessor node is designed to process text inputs by identifying and handling both wildcard and Lora syntax patterns. This dual functionality allows for the dynamic modification of text based on predefined patterns and the integration of Lora model adjustments directly within text inputs, facilitating a more flexible and powerful text manipulation and model interaction capability.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the model that may be adjusted based on Lora syntax within the input text, allowing for dynamic model manipulation.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`clip`**
    - The 'clip' parameter represents the clip model that may be adjusted alongside the main model in response to Lora syntax within the input text, facilitating coordinated model adjustments.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`text`**
    - The 'text' parameter is the primary input text that the node processes. It is crucial for the operation as it contains the wildcard and Lora syntax patterns that need to be identified and handled. The processing of this text enables the dynamic modification and model interaction based on the specified patterns.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter is used to introduce a deterministic element in the processing of wildcard patterns, ensuring reproducibility of results across different runs with the same input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The 'model' output is the potentially modified model after processing Lora syntax adjustments specified in the input text.
    - Python dtype: `object`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The 'clip' output is the potentially modified clip model after processing Lora syntax adjustments specified in the input text.
    - Python dtype: `object`
- **`text`**
    - Comfy dtype: `STRING`
    - The output 'text' is the modified version of the input text after the wildcard and Lora syntax patterns have been processed. This includes the application of dynamic modifications and model adjustments specified within the input text.
    - Python dtype: `str`
- **`unprocessed_text`**
    - Comfy dtype: `STRING`
    - The 'unprocessed_text' output provides the original input text before any processing of wildcard or Lora syntax patterns, preserving the initial state for reference or further use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WildcardAndLoraSyntaxProcessor:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "model": ("MODEL",),
                    "clip": ("CLIP",),
                    "text": ("STRING", {"multiline": True, "default": "<lora:filename:weight>"}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"},
                }

    RETURN_TYPES = ('MODEL','CLIP','STRING','STRING')
    RETURN_NAMES = ('model','clip','text','unprocessed_text')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Lora'

    def extract_and_load_loras(self, text, model, clip):
        # load loras detected in the prompt text
        # The text for adding LoRA to the prompt, <lora:filename:multiplier>, is only used to enable LoRA, and is erased from prompt afterwards
        # The multiplier is optional, and defaults to 1.0
        # We update the model and clip, and return the new model and clip with the lora prompt stripped from the text
        # If multiple lora prompts are detected we chain them together like: original clip > clip_with_lora1 > clip_with_lora2 > clip_with_lora3 > etc
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
                # apply the lora to the clip using the LoraLoader.load_lora function
                model, clip = load_lora(model, clip, lora_filename, lora_multiplier, lora_multiplier)
        # strip lora syntax from text
        stripped_text = re.sub(lora_re, '', stripped_text)
        return model, clip, stripped_text

    def process(self, model, clip, text, seed, extra_pnginfo=None, prompt=None):
        # search and replace
        text = search_and_replace(text, extra_pnginfo, prompt)
        # process random syntax
        text = process_random_syntax(text, seed)
        # process wildcards
        text_ = find_and_replace_wildcards(text, seed, True)
        if len(text_) != len(text):
            seed = random.randint(0, 1000000)
        else:
            seed = 1
        # extract and load loras
        model, clip, stripped_text = self.extract_and_load_loras(text_, model, clip)
        # process wildcards again
        stripped_text = find_and_replace_wildcards(stripped_text, seed, True)
        return (model, clip, stripped_text, text_, )

```
