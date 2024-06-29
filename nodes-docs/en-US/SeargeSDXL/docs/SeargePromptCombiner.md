---
tags:
- Concatenate
- PromptComposer
---

# Prompt combiner
## Documentation
- Class name: `SeargePromptCombiner`
- Category: `Searge/_deprecated_/Prompting`
- Output node: `False`

The SeargePromptCombiner node is designed to merge two input prompts into a single output prompt, optionally separated by a specified delimiter. This functionality is useful in scenarios where dynamic prompt construction is needed, allowing for the combination of separate prompt elements into a cohesive whole.
## Input types
### Required
- **`prompt1`**
    - The first prompt to be combined. It serves as the initial part of the new, merged prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - A string used to separate the two prompts when combined. This allows for customizable spacing or punctuation between prompt elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt2`**
    - The second prompt to be combined. It follows the separator and completes the merged prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`combined prompt`**
    - Comfy dtype: `STRING`
    - The result of merging prompt1 and prompt2, optionally separated by the separator. This is the final, combined prompt ready for use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [SeargePromptCombiner](../../SeargeSDXL/Nodes/SeargePromptCombiner.md)



## Source code
```python
class SeargePromptCombiner:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "prompt1": ("STRING", {"default": "", "multiline": True}),
            "separator": ("STRING", {"default": ", ", "multiline": False}),
            "prompt2": ("STRING", {"default": "", "multiline": True}),
        },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("combined prompt",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Prompting"

    def get_value(self, prompt1, separator, prompt2):
        len1 = len(prompt1)
        len2 = len(prompt2)
        prompt = ""
        if len1 > 0 and len2 > 0:
            prompt = prompt1 + separator + prompt2
        elif len1 > 0:
            prompt = prompt1
        elif len2 > 0:
            prompt = prompt2
        return (prompt,)

```
