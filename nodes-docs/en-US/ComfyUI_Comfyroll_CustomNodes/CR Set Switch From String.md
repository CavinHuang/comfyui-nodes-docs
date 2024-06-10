---
tags:
- ConditionalSelection
---

# ⚙️ CR Set Switch From String
## Documentation
- Class name: `CR Set Switch From String`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Conditional`
- Output node: `False`

This node dynamically sets a switch based on a string input, allowing for conditional logic flows within a node network. It supports up to four predefined string conditions to determine the switch's state.
## Input types
### Required
- **`text`**
    - The primary string input used to determine the switch's state. It's essential for executing the node's logic and determining the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`switch_1`**
    - A predefined condition string. If it matches the 'text' input, the switch is set to 1.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`switch_2`**
    - A predefined condition string. If it matches the 'text' input, the switch is set to 2.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`switch_3`**
    - A predefined condition string. If it matches the 'text' input, the switch is set to 3.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`switch_4`**
    - A predefined condition string. If it matches the 'text' input, the switch is set to 4.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`switch`**
    - Comfy dtype: `INT`
    - The output switch state determined by the input string, indicating which condition was met.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for using this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SetSwitchFromString:

    @classmethod
    def INPUT_TYPES(cls):
    
        methods = ["Fit", "Crop"]
        
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),
            },
            "optional": {
                "switch_1": ("STRING", {"multiline": False, "default": ""}),
                "switch_2": ("STRING", {"multiline": False, "default": ""}),
                "switch_3": ("STRING", {"multiline": False, "default": ""}),
                "switch_4": ("STRING", {"multiline": False, "default": ""}),                
            },            
        }
    
    RETURN_TYPES =("INT", "STRING", )
    RETURN_NAMES =("switch", "show_help", )
    FUNCTION = "set_switch"
    CATEGORY = icons.get("Comfyroll/Utils/Conditional")

    def set_switch(self, text, switch_1="", switch_2="", switch_3="", switch_4=""):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-switch-from-string"    
      
        if text == switch_1:
            switch = 1
        elif text == switch_2:
            switch = 2
        elif text == switch_3:
            switch = 3
        elif text == switch_4:
            switch = 4
        else:
            pass
        
        return (switch, show_help, )        

```
