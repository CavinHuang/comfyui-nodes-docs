---
tags:
- Image
- Pipeline
---

# 🚌 CR Data Bus Out
## Documentation
- Class name: `CR Data Bus Out`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🚌 Bus`
- Output node: `False`

The CR Data Bus Out node is designed to output data from a pipeline, allowing for the transfer of multiple data types through a single pipe. It also provides a link to documentation for further assistance.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter is a tuple that carries the data to be outputted. It is essential for transferring the data through the pipeline.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Tuple[Any, Any, Any, Any]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the modified or unmodified 'pipe' tuple, depending on the input parameters.
    - Python dtype: `Tuple[Any, Any, Any, Any]`
- **`any1`**
    - Comfy dtype: `*`
    - Returns the first element of the 'pipe' tuple, potentially modified by the input parameter 'any1'.
    - Python dtype: `Any`
- **`any2`**
    - Comfy dtype: `*`
    - Returns the second element of the 'pipe' tuple, potentially modified by the input parameter 'any2'.
    - Python dtype: `Any`
- **`any3`**
    - Comfy dtype: `*`
    - Returns the third element of the 'pipe' tuple, potentially modified by the input parameter 'any3'.
    - Python dtype: `Any`
- **`any4`**
    - Comfy dtype: `*`
    - Returns the fourth element of the 'pipe' tuple, potentially modified by the input parameter 'any4'.
    - Python dtype: `Any`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation for further assistance with the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DataBusOut:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",)
            }
        }

    RETURN_TYPES = ("PIPE_LINE", any_type, any_type, any_type, any_type, "STRING", )
    RETURN_NAMES = ("pipe", "any1", "any2", "any3", "any4", "show_help", )
    FUNCTION = "data_out"
    CATEGORY = icons.get("Comfyroll/Pipe/Bus")

    def data_out(self, any1=None, any2=None, any3=None, any4=None, pipe=None):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-data-bus-out"
            
        new_any1, new_any2, new_any3, new_any4 = pipe
        
        return (pipe, new_any1, new_any2, new_any3, new_any4, show_help, )

```
