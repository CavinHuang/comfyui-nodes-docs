---
tags:
- List
- Text
---

# CR Text List Simple (Legacy)
## Documentation
- Class name: `CR Text List Simple`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to create a simple list of texts from individual text inputs and an optional list of texts. It allows for the aggregation of up to five separate text inputs and an additional list of texts into a single list, facilitating the organization and manipulation of text data in a streamlined manner.
## Input types
### Required
### Optional
- **`text_1`**
    - The first text input to be included in the list. It's a foundational element for constructing the list, contributing to the overall content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_2`**
    - The second text input to be included in the list. It adds to the list's content, following the first text input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_3`**
    - The third text input to be included in the list. It continues to build upon the list's content, following the second text input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_4`**
    - The fourth text input to be included in the list. It further enriches the list's content, following the third text input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_5`**
    - The fifth text input to be included in the list. It completes the initial set of individual text inputs, adding depth to the list's content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_list_simple`**
    - An optional list of texts that can be appended to the list. This parameter allows for the inclusion of pre-existing lists, enhancing the node's flexibility.
    - Comfy dtype: `TEXT_LIST_SIMPLE`
    - Python dtype: `list`
## Output types
- **`TEXT_LIST_SIMPLE`**
    - Comfy dtype: `TEXT_LIST_SIMPLE`
    - The compiled list of texts, combining individual text inputs and any provided list of texts into a unified collection.
    - Python dtype: `list`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional help and documentation related to the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextListSimple:

    @classmethod
    def INPUT_TYPES(cls):
  
        return {"required": {            
                },
                "optional": {"text_1": ("STRING", {"multiline": False, "default": ""}),
                             "text_2": ("STRING", {"multiline": False, "default": ""}),
                             "text_3": ("STRING", {"multiline": False, "default": ""}),
                             "text_4": ("STRING", {"multiline": False, "default": ""}),                    
                             "text_5": ("STRING", {"multiline": False, "default": ""}),
                             "text_list_simple": ("TEXT_LIST_SIMPLE",)
                },
        }

    RETURN_TYPES = ("TEXT_LIST_SIMPLE", "STRING", )
    RETURN_NAMES = ("TEXT_LIST_SIMPLE", "show_help", )
    FUNCTION = "text_list_simple"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def text_list_simple(self, text_1, text_2, text_3,  text_4, text_5, text_list_simple=None):

        # Initialise the list
        texts = list()
        
        # Extend the list for each text in the stack
        if text_list_simple is not None:
            texts.extend(l for l in text_list_simple)
        
        if text_1 != "" and text_1 != None:
            texts.append(text_1),

        if text_2 != "" and text_2 != None:
            texts.append(text_2)

        if text_3 != "" and text_3 != None:
            texts.append(text_3)

        if text_4 != "" and text_4 != None:
            texts.append(text_4),
            
        if text_5 != "" and text_5 != None:
            texts.append(text_5),
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-list-simple"

        return (texts, show_help, )

```
