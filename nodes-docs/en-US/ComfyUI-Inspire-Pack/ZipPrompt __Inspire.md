---
tags:
- Prompt
---

# Zip Prompt (Inspire)
## Documentation
- Class name: `ZipPrompt __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The ZipPrompt node is designed to combine positive and negative textual prompts, along with an optional name, into a single zipped prompt. This functionality is crucial for organizing and structuring prompt data in a way that facilitates further processing or storage, especially within the context of the InspirePack for prompt management.
## Input types
### Required
- **`positive`**
    - The positive prompt text, which is a required multiline string input. This text represents the desired attributes or characteristics to be emphasized in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative prompt text, which is a required multiline string input. This text outlines the attributes or characteristics to be minimized or avoided in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`name_opt`**
    - An optional single-line string input that provides a name for the zipped prompt, aiding in its identification and organization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`zipped_prompt`**
    - Comfy dtype: `ZIPPED_PROMPT`
    - The output is a tuple containing the positive, negative, and optional name inputs, effectively zipping them into a single structured prompt.
    - Python dtype: `Tuple[str, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ZipPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "positive": ("STRING", {"forceInput": True, "multiline": True}),
                    "negative": ("STRING", {"forceInput": True, "multiline": True}),
                    },
                "optional": {
                    "name_opt": ("STRING", {"forceInput": True, "multiline": False})
                    }
                }

    RETURN_TYPES = ("ZIPPED_PROMPT",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, positive, negative, name_opt=""):
        return ((positive, negative, name_opt), )

```
