# 🪙 String Tokenizer
## Documentation
- Class name: `String Tokenizer [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `True`

The String Tokenizer node is designed to split a given string into parts based on a specified separator and select one of these parts based on its index. This functionality is essential for parsing and manipulating text data, allowing for the extraction of specific segments of interest from larger text bodies.
## Input types
### Required
- **`text`**
    - The primary text input that will be split into parts. This parameter is crucial for defining the text to be tokenized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - Defines the character or string used to split the text into parts. Its role is pivotal in determining how the text is divided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`selected`**
    - Determines which part of the split text to return, based on its index. This parameter is key for selecting the specific segment of interest.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`token`**
    - Comfy dtype: `STRING`
    - The selected part of the text after splitting by the specified separator. This output is significant for text processing and manipulation tasks.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamStringTokenizer:
    NODE_NAME = "String Tokenizer"
    ICON = "🪙"
    OUTPUT_NODE = True
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("token",)
    FUNCTION = "exec"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True}),
                "separator": ("STRING", {"default": ","}),
                "selected": ("INT", {"default": 0, "min": 0})
            },
        }

    def exec(self, text: str, separator: str, selected: int):
        if separator is None or separator == "":
            separator = " "
        parts = text.split(sep=separator)
        return (parts[abs(selected) % len(parts)].strip(),)

```
