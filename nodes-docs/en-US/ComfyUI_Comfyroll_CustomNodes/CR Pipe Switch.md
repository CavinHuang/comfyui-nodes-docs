---
tags:
- Image
- Pipeline
---

# 🔀️ CR Pipe Switch
## Documentation
- Class name: `CR Pipe Switch`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe`
- Output node: `True`

The CR Pipe Switch node is designed to dynamically select between two pipeline paths based on a specified input. It facilitates conditional execution within a pipeline, allowing for more flexible and customizable data processing flows.
## Input types
### Required
- **`Input`**
    - Determines which pipeline path to select for execution. A value of 1 selects the first pipeline, while any other value selects the second pipeline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`pipe1`**
    - The first pipeline path to be potentially executed. It is selected if the 'Input' parameter is set to 1.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `PIPE_LINE`
- **`pipe2`**
    - The second pipeline path to be potentially executed. It is selected if the 'Input' parameter is not set to 1.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `PIPE_LINE`
## Output types
- **`PIPE_LINE`**
    - Comfy dtype: `PIPE_LINE`
    - The selected pipeline path based on the 'Input' parameter.
    - Python dtype: `PIPE_LINE`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and documentation about the CR Pipe Switch node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute
    - [CR Module Input](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Input.md)



## Source code
```python
class CR_InputSwitchPipe:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
                "pipe1": ("PIPE_LINE",),
                "pipe2": ("PIPE_LINE",)
            }
        }
 
    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("PIPE_LINE", "show_help", )
    OUTPUT_NODE = True
    FUNCTION = "switch_pipe"
    CATEGORY = icons.get("Comfyroll/Pipe")

    def switch_pipe(self, Input, pipe1, pipe2):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-pipe-switch"
        
        if Input == 1:
            return (pipe1, show_help, )
        else:
            return (pipe2, show_help, )

```
