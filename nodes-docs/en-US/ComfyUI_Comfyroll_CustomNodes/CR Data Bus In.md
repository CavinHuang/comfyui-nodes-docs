---
tags:
- Image
- Pipeline
---

# 🚌 CR Data Bus In
## Documentation
- Class name: `CR Data Bus In`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🚌 Bus`
- Output node: `False`

The CR Data Bus In node is designed for loading and initializing data into a pipeline, allowing for optional inputs to be provided and utilized within the data flow. It serves as an entry point for data, facilitating the integration and manipulation of various data types as they enter the system.
## Input types
### Required
### Optional
- **`pipe`**
    - Represents the primary data conduit into which data is loaded. It can optionally accept a tuple of any types, enabling the flexible integration of data into the pipeline.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Tuple[Any, ...]]`
- **`any1`**
    - An optional input parameter that can be used to provide additional data or override the first element of the 'pipe' tuple if both are provided.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Any]`
- **`any2`**
    - Similar to 'any1', this optional input parameter allows for the provision or overriding of the second element in the 'pipe' tuple.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Any]`
- **`any3`**
    - This optional parameter enables the provision or overriding of the third element in the 'pipe' tuple, allowing for further customization of the data flow.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Any]`
- **`any4`**
    - Allows for the provision or overriding of the fourth element in the 'pipe' tuple, facilitating additional flexibility in how data is integrated into the pipeline.
    - Comfy dtype: `*`
    - Python dtype: `Optional[Any]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs a tuple representing the loaded data, potentially modified by the optional input parameters. This tuple serves as the processed data ready for further manipulation or analysis in subsequent nodes.
    - Python dtype: `Tuple[Any, ...]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page for this node, offering users guidance and additional information on its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DataBusIn:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "pipe": (any_type,),
                "any1": (any_type,),
                "any2": (any_type,),
                "any3": (any_type,),
                "any4": (any_type,),          
            },
        }

    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("pipe", "show_help", )
    FUNCTION = "load_data"
    CATEGORY = icons.get("Comfyroll/Pipe/Bus")

    def load_data(self, any1=None, any2=None, any3=None, any4=None, pipe=None):
 
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-data-bus-in"

        # Initialize with default values
        new_any1, new_any2, new_any3, new_any4 = None, None, None, None
     
        if pipe is not None:
            new_any1, new_any2, new_any3, new_any4 = pipe

        new_any1 = any1 if any1 is not None else new_any1
        new_any2 = any2 if any2 is not None else new_any2
        new_any3 = any3 if any3 is not None else new_any3
        new_any4 = any4 if any4 is not None else new_any4

        new_pipe = new_any1, new_any2, new_any3, new_any4
              
        return (new_pipe, show_help, )

```
