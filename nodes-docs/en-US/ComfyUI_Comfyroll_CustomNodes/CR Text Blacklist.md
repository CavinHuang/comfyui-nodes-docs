---
tags:
- Text
---

# 🔤 Text Blacklist
## Documentation
- Class name: `CR Text Blacklist`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node is designed to filter and replace specific words in a given text with alternative text or an empty string, based on a user-defined blacklist. It's particularly useful for content moderation or customizing text output by removing unwanted words.
## Input types
### Required
- **`text`**
    - The input text to be processed. Words found in this text that match the blacklist will be replaced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`blacklist_words`**
    - A list of words to be filtered out from the input text. Each word should be separated by a newline.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`replacement_text`**
    - The text to replace each blacklisted word with. If left empty, blacklisted words will be removed entirely.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `*`
    - The modified text after blacklisted words have been replaced or removed.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR Text Blacklist node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextBlacklist:

    @ classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "default": "", "forceInput": True}),
                "blacklist_words": ("STRING", {"multiline": True, "default": ""}),
                },
            "optional": {
                "replacement_text": ("STRING", {"multiline": False, "default": ""}),    
            },
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "replace_text"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def replace_text(self, text, blacklist_words, replacement_text=""):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-blacklist" 
         
        text_out = text 
        
        for line in blacklist_words.split('\n'):  # Splitting based on line return
            if line.strip():
                text_out = text_out.replace(line.strip(), replacement_text)       
    
        return (text_out, show_help)   

```
