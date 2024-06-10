---
tags:
- Text
- TextReplacement
---

# Text Find and Replace by Dictionary
## Documentation
- Class name: `Text Find and Replace by Dictionary`
- Category: `WAS Suite/Text/Search`
- Output node: `False`

This node performs a search and replace operation on a given text using a dictionary. It identifies specific terms within the text, marked by a customizable replacement key, and replaces them with random selections from lists associated with those terms in the dictionary. The operation can be influenced by a seed for reproducible randomness.
## Input types
### Required
- **`text`**
    - The input text to be processed. It serves as the base content for search and replace operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`dictionary`**
    - A dictionary where keys represent terms to be replaced in the text, and values are lists of possible replacements.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict[str, List[str]]`
- **`replacement_key`**
    - A string used to mark the beginning and end of terms in the text that should be replaced. It helps in identifying the exact terms to be replaced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - An integer used to seed the random number generator for reproducible randomness in the selection of replacements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The modified text after search and replace operations have been performed, with specific terms replaced by random selections from the dictionary.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Search_and_Replace_Dictionary:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "dictionary": ("DICT",),
                "replacement_key": ("STRING", {"default": "__", "multiline": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_search_and_replace_dict"

    CATEGORY = "WAS Suite/Text/Search"

    def text_search_and_replace_dict(self, text, dictionary, replacement_key, seed):

        random.seed(seed)

        # Parse Text
        new_text = text

        for term in dictionary.keys():
            tkey = f'{replacement_key}{term}{replacement_key}'
            tcount = new_text.count(tkey)
            for _ in range(tcount):
                new_text = new_text.replace(tkey, random.choice(dictionary[term]), 1)
                if seed > 0 or seed < 0:
                    seed = seed + 1
                    random.seed(seed)

        return (new_text, )

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
