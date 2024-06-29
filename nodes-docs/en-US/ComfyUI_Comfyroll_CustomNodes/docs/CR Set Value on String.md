---
tags:
- ComfyrollNodes
---

# ⚙️ CR Set Value on String
## Documentation
- Class name: `CR Set Value on String`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Conditional`
- Output node: `False`

This node is designed to conditionally set a string value based on the presence of a specified substring within another string. It facilitates conditional logic in text processing, allowing users to dynamically alter text outputs based on specific criteria.
## Input types
### Required
- **`text`**
    - The primary string to be evaluated for the presence of the 'test_string'. Its presence or absence determines which value ('value_if_true' or 'value_if_false') is returned.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`test_string`**
    - The substring to be searched for within 'text'. If found, 'value_if_true' is returned; otherwise, 'value_if_false' is returned.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`value_if_true`**
    - The string value to return if 'test_string' is found within 'text'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`value_if_false`**
    - The string value to return if 'test_string' is not found within 'text'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `*`
    - The output string, determined by whether 'test_string' was found within 'text'.
    - Python dtype: `str`
- **`BOOLEAN`**
    - Comfy dtype: `BOOLEAN`
    - A boolean value indicating whether 'test_string' was found within 'text'.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SetValueOnString:

    @ classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),            
                },
            "optional": {
                "test_string": ("STRING", {"multiline": False, "default": ""}),
                "value_if_true": ("STRING", {"multiline": False, "default": ""}),
                "value_if_false": ("STRING", {"multiline": False, "default": ""}), 
            },
        }

    RETURN_TYPES = (any_type, "BOOLEAN", "STRING", )
    RETURN_NAMES = ("STRING", "BOOLEAN","show_help", )
    FUNCTION = "replace_text"
    CATEGORY = icons.get("Comfyroll/Utils/Conditional")

    def replace_text(self, text, test_string, value_if_true, value_if_false):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-set-value-on-string" 
        
        if test_string in text:
            # Test condition is true, replace with value_if_true
            text_out = value_if_true
            bool_out = True
        else:
            # Test condition is false, replace with value_if_false
            text_out = value_if_false
            bool_out = False
        
        return (text_out, bool_out, show_help)

```
