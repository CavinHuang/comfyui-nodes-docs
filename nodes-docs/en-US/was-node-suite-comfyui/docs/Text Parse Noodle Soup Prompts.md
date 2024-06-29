---
tags:
- Prompt
- Text
- Wildcard
---

# Text Parse Noodle Soup Prompts
## Documentation
- Class name: `Text Parse Noodle Soup Prompts`
- Category: `WAS Suite/Text/Parse`
- Output node: `True`

This node is designed to parse and transform text inputs using Noodle Soup Prompts (NSP) or wildcard patterns. It dynamically replaces specified placeholders or wildcards in the input text with random selections from a predefined set of terms or patterns, allowing for the generation of varied and contextually relevant text outputs.
## Input types
### Required
- **`mode`**
    - Specifies the parsing mode: either 'Noodle Soup Prompts' for NSP-based parsing or 'Wildcards' for wildcard pattern replacement. This choice determines the method of text transformation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`noodle_key`**
    - The delimiter used to identify NSP terms or wildcard patterns within the input text. It serves as a marker for the start and end of placeholders to be replaced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A seed value for the random number generator, ensuring reproducibility of the text transformation process by controlling the randomness of selections.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The input text to be parsed and transformed according to the specified mode and patterns.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The transformed text output, with NSP terms or wildcard patterns replaced according to the specified mode and selections.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Parse_NSP:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mode": (["Noodle Soup Prompts", "Wildcards"],),
                "noodle_key": ("STRING", {"default": '__', "multiline": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_parse_nsp"

    CATEGORY = "WAS Suite/Text/Parse"

    def text_parse_nsp(self, text, mode="Noodle Soup Prompts", noodle_key='__', seed=0):

        if mode == "Noodle Soup Prompts":

            new_text = nsp_parse(text, seed, noodle_key)
            cstr(f"Text Parse NSP:\n{new_text}").msg.print()

        else:

            new_text = replace_wildcards(text, (None if seed == 0 else seed), noodle_key)
            cstr(f"CLIPTextEncode Wildcards:\n{new_text}").msg.print()

        return (new_text, )

```
