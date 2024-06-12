---
tags:
- Image
- Pipeline
---

# 🚌 CR 8 Channel In
## Documentation
- Class name: `CR 8 Channel In`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🚌 Bus`
- Output node: `False`

The CR 8 Channel In node is designed to facilitate the input of data across eight distinct channels within a pipeline, enabling complex data handling and manipulation for advanced processing tasks.
## Input types
### Required
### Optional
- **`pipe`**
    - The 'pipe' parameter represents the pipeline through which data is inputted into the node, serving as the conduit for the eight distinct channels of data that are to be processed.
    - Comfy dtype: `*`
    - Python dtype: `tuple`
- **`ch1`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch2`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch3`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch4`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch5`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch6`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch7`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`ch8`**
    - Represents one of the eight channels through which data can be inputted into the node, allowing for complex data handling and manipulation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - This output type signifies the continuation of the pipeline, carrying forward the data processed within the node to subsequent stages.
    - Python dtype: `tuple`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to helpful documentation or further information regarding the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_8ChannelIn:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "pipe": (any_type,),
                "ch1": (any_type,),
                "ch2": (any_type,),
                "ch3": (any_type,),
                "ch4": (any_type,),
                "ch5": (any_type,),
                "ch6": (any_type,),
                "ch7": (any_type,),
                "ch8": (any_type,),                 
            },
        }

    RETURN_TYPES = ("PIPE_LINE", "STRING", )
    RETURN_NAMES = ("pipe", "show_help", )
    FUNCTION = "load_data"
    CATEGORY = icons.get("Comfyroll/Pipe/Bus")

    def load_data(self, ch1=None, ch2=None, ch3=None, ch4=None, ch5=None, ch6=None, ch7=None, ch8=None, pipe=None):
 
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-8-channel-in"

        # Initialize with default values
        new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8 = None, None, None, None, None, None, None, None
     
        if pipe is not None:
            new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8 = pipe

        new_ch1 = ch1 if ch1 is not None else new_ch1
        new_ch2 = ch2 if ch2 is not None else new_ch2
        new_ch3 = ch3 if ch3 is not None else new_ch3
        new_ch4 = ch4 if ch4 is not None else new_ch4
        new_ch5 = ch5 if ch5 is not None else new_ch5
        new_ch6 = ch6 if ch6 is not None else new_ch6
        new_ch7 = ch7 if ch7 is not None else new_ch7
        new_ch8 = ch8 if ch8 is not None else new_ch8        

        new_pipe = new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8
              
        return (new_pipe, show_help, )      

```
