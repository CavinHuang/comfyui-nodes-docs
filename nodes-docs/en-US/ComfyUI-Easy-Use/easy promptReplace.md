---
tags:
- Prompt
---

# PromptReplace
## Documentation
- Class name: `easy promptReplace`
- Category: `EasyUse/Prompt`
- Output node: `False`

The `promptReplace` node is designed to dynamically modify text prompts based on a set of replacement rules. It allows for the customization of text by replacing specified phrases or words with alternatives, supporting a straightforward approach to text manipulation. This functionality is particularly useful for generating or altering text prompts in a flexible manner, accommodating a wide range of text manipulation needs.
## Input types
### Required
- **`prompt`**
    - The initial text prompt that will be modified based on the find and replace parameters provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`find1`**
    - The first phrase or word to search for in the prompt for replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace1`**
    - The replacement text for the first search term found by `find1`.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find2`**
    - The second phrase or word to search for in the prompt for replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace2`**
    - The replacement text for the second search term found by `find2`.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find3`**
    - The third phrase or word to search for in the prompt for replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace3`**
    - The replacement text for the third search term found by `find3`.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The output is a modified version of the input text, with specified phrases or words replaced according to the defined rules.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class promptReplace:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "default": "", "forceInput": True}),
            },
            "optional": {
                "find1": ("STRING", {"multiline": False, "default": ""}),
                "replace1": ("STRING", {"multiline": False, "default": ""}),
                "find2": ("STRING", {"multiline": False, "default": ""}),
                "replace2": ("STRING", {"multiline": False, "default": ""}),
                "find3": ("STRING", {"multiline": False, "default": ""}),
                "replace3": ("STRING", {"multiline": False, "default": ""}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "replace_text"
    CATEGORY = "EasyUse/Prompt"

    def replace_text(self, prompt, find1="", replace1="", find2="", replace2="", find3="", replace3=""):

        prompt = prompt.replace(find1, replace1)
        prompt = prompt.replace(find2, replace2)
        prompt = prompt.replace(find3, replace3)

        return (prompt,)

```
