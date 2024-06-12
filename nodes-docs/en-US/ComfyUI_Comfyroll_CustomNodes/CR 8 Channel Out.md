---
tags:
- Image
- Pipeline
---

# 🚌 CR 8 Channel Out
## Documentation
- Class name: `CR 8 Channel Out`
- Category: `🧩 Comfyroll Studio/✨ Essential/🎷 Pipe/🚌 Bus`
- Output node: `False`

This node is designed to output data across eight channels from a pipeline, facilitating complex data manipulation and routing within a node-based processing environment. It serves as a critical component for distributing data to multiple downstream nodes, enhancing modularity and flexibility in data processing workflows.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter represents the pipeline from which data is extracted and distributed across the eight output channels. It is essential for the node's operation as it sources the data to be processed and routed.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Represents the pipeline data structure, carrying data through the node for processing and output across multiple channels.
    - Python dtype: `tuple`
- **`ch1`**
    - Comfy dtype: `*`
    - Outputs the first channel of data processed by the node.
    - Python dtype: `any`
- **`ch2`**
    - Comfy dtype: `*`
    - Outputs the second channel of data processed by the node.
    - Python dtype: `any`
- **`ch3`**
    - Comfy dtype: `*`
    - Outputs the third channel of data processed by the node.
    - Python dtype: `any`
- **`ch4`**
    - Comfy dtype: `*`
    - Outputs the fourth channel of data processed by the node.
    - Python dtype: `any`
- **`ch5`**
    - Comfy dtype: `*`
    - Outputs the fifth channel of data processed by the node.
    - Python dtype: `any`
- **`ch6`**
    - Comfy dtype: `*`
    - Outputs the sixth channel of data processed by the node.
    - Python dtype: `any`
- **`ch7`**
    - Comfy dtype: `*`
    - Outputs the seventh channel of data processed by the node.
    - Python dtype: `any`
- **`ch8`**
    - Comfy dtype: `*`
    - Outputs the eighth channel of data processed by the node.
    - Python dtype: `any`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to a help page, offering guidance on how to use the CR 8 Channel Out node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_8ChannelOut:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",)
            }
        }

    RETURN_TYPES = ("PIPE_LINE", any_type, any_type, any_type, any_type, any_type, any_type, any_type, any_type, "STRING", )
    RETURN_NAMES = ("pipe", "ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "ch8", "show_help", )
    FUNCTION = "data_out"
    CATEGORY = icons.get("Comfyroll/Pipe/Bus")

    def data_out(self, ch1=None, ch2=None, ch3=None, ch4=None, ch5=None, ch6=None, ch7=None, ch8=None, pipe=None):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-8-channel-out"
            
        new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8 = pipe
        
        return (pipe, new_ch1, new_ch2, new_ch3, new_ch4, new_ch5, new_ch6, new_ch7, new_ch8, show_help, ) 

```
