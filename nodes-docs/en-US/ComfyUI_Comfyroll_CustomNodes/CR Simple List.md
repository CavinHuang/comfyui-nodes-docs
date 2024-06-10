---
tags:
- List
- Text
---

# 📜 CR Simple List
## Documentation
- Class name: `CR Simple List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

The CR_SimpleList node is designed to process a list of string values, performing operations such as trimming and filtering empty strings, to produce a cleaned and streamlined list. It also provides a link to further documentation or help related to its functionality.
## Input types
### Required
- **`list_values`**
    - This parameter takes a multiline string input representing list values. Each line is considered a separate list item. The node processes these values to trim whitespace and filter out empty strings, effectively cleaning the list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`LIST`**
    - Comfy dtype: `*`
    - This output is a list of strings that have been cleaned by trimming whitespace and filtering out empty strings.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to further documentation or help related to the CR_SimpleList node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimpleList:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "list_values": ("STRING", {"multiline": True, "default": "text"}),              
                    }
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("LIST", "show_help", ) 
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = "cross_join"
    CATEGORY = icons.get("Comfyroll/List") 
    
    def cross_join(self, list_values):

        lines = list_values.split('\n')

        list_out = [i.strip() for i in lines if i.strip()]

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-simple-list"

        return (list_out, show_help, )

```
