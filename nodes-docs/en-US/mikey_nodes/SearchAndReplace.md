---
tags:
- Text
- TextReplacement
---

# Search And Replace (Mikey)
## Documentation
- Class name: `SearchAndReplace`
- Category: `Mikey/Utils`
- Output node: `False`

The SearchAndReplace node is designed to modify input text by searching for specific patterns and replacing them with new content, potentially utilizing additional information from JSON inputs to guide the replacement process. This node is part of a utility collection aimed at text manipulation, allowing for dynamic and context-sensitive alterations of text based on predefined rules or mappings.
## Input types
### Required
- **`text`**
    - The primary text input where search and replacement operations will be performed. It serves as the main content to be manipulated.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A numerical input used to influence the randomness of certain operations within the node, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The modified text after search and replace operations have been applied.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SearchAndReplace:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": False, "placeholder": "Text to search and replace"}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    RETURN_TYPES = ('STRING',)
    FUNCTION = "search_and_replace"
    CATEGORY = "Mikey/Utils"

    def search_and_replace(self, text, seed, prompt=None, extra_pnginfo=None):
        result = search_and_replace(text, extra_pnginfo, prompt)
        s = seed + 1
        return (result,)

```
