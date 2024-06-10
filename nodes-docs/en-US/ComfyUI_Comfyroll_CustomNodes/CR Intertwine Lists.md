---
tags:
- Text
---

# 🛠️ CR Intertwine Lists
## Documentation
- Class name: `CR Intertwine Lists`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/🛠️ Utils`
- Output node: `False`

The CR_IntertwineLists node is designed to intertwine two lists into a single list, combining elements from each input list into a new list structure. This node aims to facilitate the manipulation and combination of list data within a workflow, providing a straightforward method for merging list contents.
## Input types
### Required
- **`list1`**
    - The first list to be intertwined. It plays a crucial role in the combination process, contributing its elements to the formation of the new, combined list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`list2`**
    - The second list to be intertwined. It equally contributes to the new list's formation by merging its elements with those from the first list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The resulting list after intertwining the elements of the two input lists.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the CR_IntertwineLists node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IntertwineLists:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                            "list1": ("STRING", {"multiline": True, "default": "", "forceInput": True}),
                            "list2": ("STRING", {"multiline": True, "default": "", "forceInput": True}),
                            }              
        }
        
    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("STRING", "show_help", )  
    OUTPUT_IS_LIST = (True, False)      
    FUNCTION = 'make_list'
    CATEGORY = icons.get("Comfyroll/List/Utils")

    def make_list(self, list1, list2):
           
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-intertwine-lists"      

        # Ensure both lists have the same length
        min_length = min(len(list1), len(list2))
        
         # Initialize an empty list to store the combined elements
        combined_list = []
        
        combined_element = str(list1) + ", " + str(list2)
        combined_list.append(combined_element)
        
        return(combined_list, show_help, )            

```
