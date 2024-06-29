---
tags:
- Text
---

# 🔤 CR Text Operation
## Documentation
- Class name: `CR Text Operation`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node performs various text manipulation operations such as changing case, reversing, trimming, or removing spaces from the input text based on the specified operation.
## Input types
### Required
- **`text`**
    - The text to be manipulated. It is the primary input on which all operations are performed, affecting the node's execution and results.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`operation`**
    - Specifies the text manipulation operation to be applied to the input text, such as uppercase, lowercase, capitalize, invert case, reverse, trim, or remove spaces.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `*`
    - The manipulated text after applying the specified operation.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing help and additional information about the text operation node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextOperation:

    @ classmethod
    def INPUT_TYPES(cls):
      
        operations = ["uppercase", "lowercase", "capitalize", "invert_case", "reverse", "trim", "remove_spaces"]
    
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),            
                "operation": (operations,),
            },
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "text_operation"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def text_operation(self, text, operation):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text_operation" 
  
        if operation == "uppercase":
            text_out = text.upper()
        elif operation == "lowercase":
            text_out = text.lower()
        elif operation == "capitalize":
            text_out = text.capitalize()
        elif operation == "invert_case":
            text_out = text.swapcase()
        elif operation == "reverse":
            text_out = text[::-1]
        elif operation == "trim":
            text_out = text.strip()
        elif operation == "remove_spaces":
            text_out = text.replace(" ", "")
        else:
            return "CR Text Operation: Invalid operation."

        return (text_out, show_help, )

```
