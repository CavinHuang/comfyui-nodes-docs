---
tags:
- Prompt
---

# CR Simple Prompt List (Legacy)
## Documentation
- Class name: `CR Simple Prompt List`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to aggregate multiple text prompts into a single list, optionally incorporating an existing list of prompts. It's particularly useful for constructing comprehensive prompt lists for animation or text generation tasks, allowing for dynamic extension based on input prompts.
## Input types
### Required
- **`prompt_1`**
    - The first text prompt to be included in the prompt list. Its inclusion directly influences the beginning of the aggregated prompt list, setting the initial context or theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_2`**
    - The second text prompt to be included in the prompt list. It adds to the diversity of the aggregated list, potentially introducing a new aspect or detail following the initial prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_3`**
    - The third text prompt to be included in the prompt list. It further diversifies the content of the list, adding depth or complexity to the combined narrative or instructions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_4`**
    - The fourth text prompt to be included in the prompt list. It contributes additional layers or nuances to the aggregated list, enriching the overall content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_5`**
    - The fifth text prompt to be included in the prompt list. It finalizes the input sequence, potentially capping the list with a conclusive or summarizing statement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`simple_prompt_list`**
    - An optional list of pre-existing prompts to be included in the final aggregated list. This allows for dynamic extension of the prompt list based on existing collections, effectively enriching the final output with a broader range of expressions or instructions.
    - Comfy dtype: `SIMPLE_PROMPT_LIST`
    - Python dtype: `List[str]`
## Output types
- **`SIMPLE_PROMPT_LIST`**
    - Comfy dtype: `SIMPLE_PROMPT_LIST`
    - The aggregated list of text prompts, constructed from the input prompts and any existing prompt list provided. This list represents a comprehensive collection of instructions or themes for subsequent use.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for using the CR Simple Prompt List node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimplePromptList:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "prompt_1": ("STRING", {"multiline": True, "default": "prompt"}),
                    "prompt_2": ("STRING", {"multiline": True, "default": "prompt"}),
                    "prompt_3": ("STRING", {"multiline": True, "default": "prompt"}),
                    "prompt_4": ("STRING", {"multiline": True, "default": "prompt"}),
                    "prompt_5": ("STRING", {"multiline": True, "default": "prompt"}),
                },
                "optional": {"simple_prompt_list": ("SIMPLE_PROMPT_LIST",)
                },
        }

    RETURN_TYPES = ("SIMPLE_PROMPT_LIST", "STRING", )
    RETURN_NAMES = ("SIMPLE_PROMPT_LIST", "show_help", )
    FUNCTION = "prompt_stacker"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def prompt_stacker(self, prompt_1, prompt_2, prompt_3, prompt_4, prompt_5, simple_prompt_list=None):

        # Initialise the list
        prompts = list()
        
        # Extend the list for each prompt in connected stacks
        if simple_prompt_list is not None:
            prompts.extend([l for l in simple_prompt_list])
        
        # Extend the list for each prompt in the stack
        if prompt_1 != "":
            prompts.extend([(prompt_1)]),

        if prompt_2 != "":
            prompts.extend([(prompt_2)]),

        if prompt_3 != "":
            prompts.extend([(prompt_3)]),

        if prompt_4 != "":
            prompts.extend([(prompt_4)]),
            
        if prompt_5 != "":
            prompts.extend([(prompt_5)]),
            
        #print(f"[TEST] CR Simple Prompt List: {prompts}")        

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-simple-prompt-list"           

        return (prompts, show_help, )

```
