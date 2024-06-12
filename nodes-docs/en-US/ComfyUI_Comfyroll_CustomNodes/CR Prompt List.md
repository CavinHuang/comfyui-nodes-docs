---
tags:
- Prompt
---

# 📜 CR Prompt List
## Documentation
- Class name: `CR Prompt List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

The CR Prompt List node is designed to aggregate and manage a collection of prompts for generative tasks, facilitating the organization and sequential processing of textual inputs for creative or analytical applications.
## Input types
### Required
- **`prepend_text`**
    - This parameter allows for the addition of text before the main content of each prompt, enabling customization and contextualization of the input sequence.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`multiline_text`**
    - Accepts multiple lines of text as input, providing a flexible space for entering extensive or detailed prompts that require more than a single line.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`append_text`**
    - Enables the appending of text to the end of each prompt, allowing for further customization or the addition of closing remarks or signatures.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - Determines the starting index for processing the list of prompts, offering control over the sequence's beginning point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_rows`**
    - Limits the number of prompts to be processed, facilitating the management of large collections by setting a maximum threshold.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - Represents the aggregated and potentially transformed collection of prompts, ready for downstream generative tasks.
    - Python dtype: `str`
- **`body_text`**
    - Comfy dtype: `STRING`
    - Provides the main content of the processed prompts, central to the node's output.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Offers a link to additional information or guidance related to the node's functionality, supporting user understanding and application.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_PromptList:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {"prepend_text": ("STRING", {"multiline": False, "default": ""}),
                             "multiline_text": ("STRING", {"multiline": True, "default": "body_text"}),
                             "append_text": ("STRING", {"multiline": False, "default": ""}),
                             "start_index": ("INT", {"default": 0, "min": 0, "max": 9999}),
                             "max_rows": ("INT", {"default": 1000, "min": 1, "max": 9999}),
                            }
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", )
    RETURN_NAMES = ("prompt", "body_text", "show_help", )
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = "make_list"
    CATEGORY = icons.get("Comfyroll/List")

    def make_list(self, multiline_text, prepend_text="", append_text="", start_index=0, max_rows=9999):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-prompt-list"

        lines = multiline_text.split('\n')

        # Ensure start_index is within the bounds of the list
        start_index = max(0, min(start_index, len(lines) - 1))

        # Calculate the end index based on max_rows
        end_index = min(start_index + max_rows, len(lines))

        # Extract the desired portion of the list
        selected_rows = lines[start_index:end_index]
        prompt_list_out = [prepend_text + line + append_text for line in selected_rows]
        body_list_out = selected_rows          

        return (prompt_list_out, body_list_out, show_help, )

```
