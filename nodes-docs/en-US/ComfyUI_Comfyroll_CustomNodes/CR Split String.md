# 🔤 CR Split String
## Documentation
- Class name: `CR Split String`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

The CR Split String node is designed to split a given text string into multiple parts based on a specified delimiter, facilitating text manipulation and processing tasks.
## Input types
### Required
- **`text`**
    - The primary text string to be split. This parameter is crucial for determining the content that will be divided into parts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`delimiter`**
    - The character or sequence of characters used to divide the text string into parts. Its specification directly influences how the text is split.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string_1`**
    - Comfy dtype: `*`
    - The first part of the split text.
    - Python dtype: `str`
- **`string_2`**
    - Comfy dtype: `*`
    - The second part of the split text.
    - Python dtype: `str`
- **`string_3`**
    - Comfy dtype: `*`
    - The third part of the split text.
    - Python dtype: `str`
- **`string_4`**
    - Comfy dtype: `*`
    - The fourth part of the split text.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SplitString:

    @classmethod
    def INPUT_TYPES(s):  
    
        return {"required": {
                    "text": ("STRING", {"multiline": False, "default": "text"}),
                },
                "optional": {
                    "delimiter": ("STRING", {"multiline": False, "default": ","}),
                }            
        }

    RETURN_TYPES = (any_type, any_type, any_type, any_type, "STRING", )
    RETURN_NAMES = ("string_1", "string_2", "string_3", "string_4", "show_help", )    
    FUNCTION = "split"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def split(self, text, delimiter=""):

        # Split the text string
        parts = text.split(delimiter)
        strings = [part.strip() for part in parts[:4]]
        string_1, string_2, string_3, string_4 = strings + [""] * (4 - len(strings))            

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-split-string"

        return (string_1, string_2, string_3, string_4, show_help, )

```
