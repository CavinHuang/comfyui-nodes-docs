---
tags:
- Prompt
---

# ⚙️ CR Prompt Text
## Documentation
- Class name: `CR Prompt Text`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

This node is designed to process and return a user-defined text prompt, along with a help URL for further guidance. It primarily serves as a utility for text input handling within a broader system, facilitating user interaction by accepting and returning text prompts.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter is the user-defined text input that the node processes. It plays a crucial role in the node's operation by being the main piece of information that gets returned along with a help URL.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The 'prompt' output is the user-defined text input that was processed by the node.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output provides a URL to a help page, offering users additional information and guidance on using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SeargePromptCombiner](../../SeargeSDXL/Nodes/SeargePromptCombiner.md)
    - PromptControlSimple
    - TagsSelector
    - [CR Text Replace](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Text Replace.md)
    - [CR Text Concatenate](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Text Concatenate.md)
    - [BatchPromptSchedule](../../ComfyUI_FizzNodes/Nodes/BatchPromptSchedule.md)
    - [CR SDXL Base Prompt Encoder](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR SDXL Base Prompt Encoder.md)
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - Assemble Tags



## Source code
```python
class CR_PromptText:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
        "prompt": ("STRING", {"default": "prompt", "multiline": True})
            }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("prompt", "show_help", )
    FUNCTION = "get_value"
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def get_value(self, prompt):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-prompt-text"
        
        return (prompt, show_help, )

```
