---
tags:
- Concatenate
- PromptComposer
---

# PromptConcat
## Documentation
- Class name: `easy promptConcat`
- Category: `EasyUse/Prompt`
- Output node: `False`

The `promptConcat` node is designed to concatenate two text prompts with an optional separator, allowing for the dynamic creation of combined text strings. This functionality is particularly useful in scenarios where text from different sources needs to be merged into a single string, maintaining flexibility in how the texts are joined.
## Input types
### Required
### Optional
- **`prompt1`**
    - The first text prompt to be concatenated. It serves as the initial part of the new combined text string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt2`**
    - The second text prompt to be concatenated. It follows the first prompt in the new combined text string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - An optional string used to separate the two prompts in the combined text string. If not specified, the prompts are concatenated directly without any separator.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The resulting text string after concatenating `prompt1` and `prompt2` with the optional `separator`. This output is useful for further text processing or output display.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class promptConcat:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
        },
            "optional": {
                "prompt1": ("STRING", {"multiline": False, "default": "", "forceInput": True}),
                "prompt2": ("STRING", {"multiline": False, "default": "", "forceInput": True}),
                "separator": ("STRING", {"multiline": False, "default": ""}),
            },
        }
    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("prompt", )
    FUNCTION = "concat_text"
    CATEGORY = "EasyUse/Prompt"

    def concat_text(self, prompt1="", prompt2="", separator=""):

        return (prompt1 + separator + prompt2,)

```
