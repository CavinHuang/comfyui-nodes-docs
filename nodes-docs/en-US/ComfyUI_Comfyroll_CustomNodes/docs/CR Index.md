---
tags:
- ComfyrollNodes
- Index
---

# 🔢 CR Index
## Documentation
- Class name: `CR Index`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔢 Index`
- Output node: `False`

The CR Index node is designed to manage and manipulate index values within a workflow, offering functionalities such as printing the current index to the console and providing a help link for further information.
## Input types
### Required
- **`index`**
    - Specifies the current index value. It is crucial for determining the position or order of elements in a sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_to_console`**
    - Determines whether the current index value should be printed to the console, aiding in debugging or monitoring the workflow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - Returns the current index value after any modifications.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to a help page for further information on the CR Index node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Index: 

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"index": ("INT", {"default": 1, "min": 0, "max": 10000}),
                             "print_to_console": (["Yes","No"],),        
                },
        }

    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    FUNCTION = "index"
    CATEGORY = icons.get("Comfyroll/Utils/Index")

    def index(self, index, print_to_console):
    
        if print_to_console == "Yes":
            print(f"[Info] CR Index:{index}")

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index"
        return (index, show_help, )

```
