---
tags:
- Prompt
- Text
- Wildcard
---

# Wildcard Processor (Mikey)
## Documentation
- Class name: `Wildcard Processor`
- Category: `Mikey/Text`
- Output node: `False`

The Wildcard Processor node is designed to process text inputs by searching for and replacing wildcard patterns with specified content. It utilizes a seed value to ensure reproducibility in the selection of replacements, making it suitable for generating varied yet consistent outputs based on the input prompt.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter is the text input that contains wildcard patterns to be processed. It plays a crucial role in determining the output of the node by providing the base content that will undergo transformation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter is used to initialize the random number generator, ensuring that the selection of replacements for wildcard patterns in the prompt is reproducible and consistent across runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a modified version of the input prompt, where wildcard patterns have been replaced with specified content, based on the provided seed value.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [LMStudioPrompt](../../mikey_nodes/Nodes/LMStudioPrompt.md)
    - [Prompt With Style V3](../../mikey_nodes/Nodes/Prompt With Style V3.md)



## Source code
```python
class WildcardProcessor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"prompt": ("STRING", {"multiline": True, "placeholder": "Prompt Text"}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})},
                "hidden": {"prompt_": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    RETURN_TYPES = ('STRING',)
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Text'

    def process(self, prompt, seed, prompt_=None, extra_pnginfo=None):
        if prompt_ is None:
            prompt_ = {}
        if extra_pnginfo is None:
            extra_pnginfo = {}
        prompt = search_and_replace(prompt, extra_pnginfo, prompt_)
        prompt = find_and_replace_wildcards(prompt, seed)
        return (prompt, )

```
