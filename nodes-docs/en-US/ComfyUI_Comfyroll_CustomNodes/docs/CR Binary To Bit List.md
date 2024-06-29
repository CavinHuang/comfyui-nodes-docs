---
tags:
- ComfyrollNodes
---

# 📜 CR Binary To Bit List
## Documentation
- Class name: `CR Binary To Bit List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

The CR_BinaryToBitList node is designed to convert a binary string into a list of individual bits. It aims to facilitate the manipulation and analysis of binary data by breaking it down into its constituent bits.
## Input types
### Required
- **`bit_string`**
    - The 'bit_string' parameter represents the binary string to be converted into a list of bits. It is essential for specifying the binary data that the node will process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - This output is a list where each element represents an individual bit from the input binary string.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional information and documentation about the CR_BinaryToBitList node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_BinaryToBitList:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "bit_string": ("STRING", {"multiline": True, "default": ""}),
                        }
        }
        
    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("STRING", "show_help", )  
    OUTPUT_IS_LIST = (True, False)    
    FUNCTION = 'make_list'
    CATEGORY = icons.get("Comfyroll/List")

    def make_list(self, bit_string):
           
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-binary-to-list" 
        
        list_out = [str(bit) for bit in bit_string]

        return(list_out, show_help, ) 

```
