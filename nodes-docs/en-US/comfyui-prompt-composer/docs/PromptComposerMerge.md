---
tags:
- Concatenate
- PromptComposer
---

# Prompt Composer Merge
## Documentation
- Class name: `PromptComposerMerge`
- Category: `AI WizArt/Prompt Composer Tools`
- Output node: `False`

The PromptComposerMerge node is designed to combine two text inputs into a single, concatenated output. This functionality is essential for merging distinct pieces of text to create a cohesive prompt, facilitating the generation of more complex and nuanced AI-generated content.
## Input types
### Required
- **`text_a`**
    - The first text input to be merged. It plays a crucial role in forming the beginning part of the merged output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The second text input to be merged. It is concatenated to the first input, forming the latter part of the merged output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The concatenated result of the two input texts, providing a merged text output for further processing or use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerMerge:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text_a": ("STRING", {"forceInput": True}),
                "text_b": ("STRING", {"forceInput": True}),
            }
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerMerge"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    def promptComposerMerge(self, text_a="", text_b=""):
        return(text_a + ", " + text_b,)

```
