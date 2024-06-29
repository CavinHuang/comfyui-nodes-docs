---
tags:
- Prompt
- Text
- Wildcard
---

# ImpactWildcardProcessor
## Documentation
- Class name: `ImpactWildcardProcessor`
- Category: `ImpactPack/Prompt`
- Output node: `False`

The ImpactWildcardProcessor node is designed to process text inputs by populating them with dynamic content based on predefined wildcards. It allows for the customization of text through the use of wildcards, enabling the generation of varied and context-specific outputs.
## Input types
### Required
- **`wildcard_text`**
    - The text containing wildcards that need to be populated. It serves as the template for generating dynamic content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`populated_text`**
    - The text after wildcards have been replaced with their corresponding values. It represents the final output with dynamic content populated.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mode`**
    - A boolean flag indicating whether the text should be populated (True) or left as is (False). This allows for flexibility in processing the text based on user preference.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - An integer used to seed the random number generator for consistent wildcard replacement. This ensures reproducibility of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`Select to add Wildcard`**
    - Allows the user to select specific wildcards to add to the text, providing control over the customization of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The processed text with wildcards replaced by their corresponding values, ready for use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class ImpactWildcardProcessor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                        "populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                    },
                }

    CATEGORY = "ImpactPack/Prompt"

    RETURN_TYPES = ("STRING", )
    FUNCTION = "doit"

    @staticmethod
    def process(**kwargs):
        return impact.wildcards.process(**kwargs)

    def doit(self, *args, **kwargs):
        populated_text = kwargs['populated_text']
        return (populated_text, )

```
