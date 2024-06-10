---
tags:
- Concatenate
- PromptComposer
---

# ⚙️ CR Combine Prompt
## Documentation
- Class name: `CR Combine Prompt`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

The CR_CombinePrompt node is designed to concatenate multiple string inputs into a single string output, using a specified separator. This functionality is useful for dynamically constructing prompts or text sequences in a flexible manner.
## Input types
### Required
### Optional
- **`part1`**
    - The first part of the prompt to be combined. It contributes to the beginning of the final concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`part2`**
    - The second part of the prompt to be combined. It is appended after the first part, separated by the specified separator.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`part3`**
    - The third part of the prompt to be combined. It follows the second part, further extending the concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`part4`**
    - The fourth and final part of the prompt to be combined. It concludes the concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - The string used to separate each part of the prompt in the final concatenated output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The final concatenated string resulting from combining the specified parts with the separator.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CombinePrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                },
                "optional": {
                    "part1": ("STRING", {"default": "", "multiline": True}),
                    "part2": ("STRING", {"default": "", "multiline": True}),
                    "part3": ("STRING", {"default": "", "multiline": True}),
                    "part4": ("STRING", {"default": "", "multiline": True}),               
                    "separator": ("STRING", {"default": ",", "multiline": False}),
                }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("prompt", "show_help", )
    FUNCTION = "get_value"
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def get_value(self, part1="", part2="", part3="", part4="", separator=""):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-prompt-parts"
        
        prompt = part1 + separator + part2 + separator + part3 + separator + part4
        
        return (prompt, show_help, )

```
