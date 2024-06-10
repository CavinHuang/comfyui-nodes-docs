# 🛠️ CR Repeater
## Documentation
- Class name: `CR Repeater`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/🛠️ Utils`
- Output node: `False`

The CR Repeater node is designed to replicate items within a list or a single item multiple times based on a specified repeat count. It aims to facilitate the generation of extended datasets or the amplification of existing data elements for further processing.
## Input types
### Required
- **`input_data`**
    - Represents the data to be repeated. It can be a single item or a list of items, determining the scope of repetition within the node's operation.
    - Comfy dtype: `*`
    - Python dtype: `Union[List[Any], Any]`
- **`repeats`**
    - Specifies the number of times the input data should be repeated. This parameter directly influences the size of the output list, allowing for controlled data expansion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`list`**
    - Comfy dtype: `*`
    - A list containing the repeated instances of the input data, expanded according to the specified repeat count.
    - Python dtype: `List[Any]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page for the CR Repeater node, offering additional information and usage guidelines.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Repeater:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "input_data": (any_type, ),             
                    "repeats": ("INT", {"default": 1, "min": 1, "max": 99999}),
                    }
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("list", "show_help", ) 
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = "repeat_list_items"
    CATEGORY = icons.get("Comfyroll/List/Utils") 
        
    def repeat_list_items(self, input_data, repeats):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-repeater"
        
        new_list = []
        
        if isinstance(input_data, list):
            new_list = []
            for item in input_data:
                new_list.extend([item] * repeats)
            return (new_list, show_help, )
        else:
            return ([input_data] * repeats, show_help, )

```
