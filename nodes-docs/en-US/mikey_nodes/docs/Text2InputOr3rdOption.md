---
tags:
- Text
---

# Text 2 Inputs Or 3rd Option Instead (Mikey)
## Documentation
- Class name: `Text2InputOr3rdOption`
- Category: `Mikey/Text`
- Output node: `False`

This node processes three input texts and, based on a condition, outputs either two of the original texts or duplicates one across both outputs. It allows for dynamic text manipulation and conditional output generation.
## Input types
### Required
- **`text_a`**
    - The first text input to be potentially modified and outputted. It serves as one of the primary inputs for conditional processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The second text input that may be modified and outputted, acting as another primary input for the node's conditional logic.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - The third text input, which can replace the other two inputs based on the condition specified by 'use_text_c_for_both'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`use_text_c_for_both`**
    - A boolean flag determining whether 'text_c' should be used as the output for both 'text_a' and 'text_b', enabling conditional output behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`text_a`**
    - Comfy dtype: `STRING`
    - The modified version of 'text_a', or 'text_c' if the condition is met.
    - Python dtype: `str`
- **`text_b`**
    - Comfy dtype: `STRING`
    - The modified version of 'text_b', or 'text_c' if the condition is met.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text2InputOr3rdOption:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_a': ('STRING', {'multiline': True, 'default': 'Text A'}),
                             'text_b': ('STRING', {'multiline': True, 'default': 'Text B'}),
                             'text_c': ('STRING', {'multiline': True, 'default': 'Text C'}),
                             'use_text_c_for_both': (['true','false'], {'default': 'false'}),},
                "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING','STRING',)
    RETURN_NAMES = ('text_a','text_b',)
    FUNCTION = 'output'
    CATEGORY = 'Mikey/Text'

    def output(self, text_a, text_b, text_c, use_text_c_for_both, extra_pnginfo, prompt):
        # search and replace
        text_a = search_and_replace(text_a, extra_pnginfo, prompt)
        text_b = search_and_replace(text_b, extra_pnginfo, prompt)
        text_c = search_and_replace(text_c, extra_pnginfo, prompt)
        if use_text_c_for_both == 'true':
            return (text_c, text_c)
        else:
            return (text_a, text_b)

```
