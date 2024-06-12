---
tags:
- Prompt
---

# PromptLine
## Documentation
- Class name: `easy promptLine`
- Category: `EasyUse/Prompt`
- Output node: `False`

The `promptLine` node is designed for the manipulation and generation of text lines based on conditioning inputs, facilitating the creation of new text content or the modification of existing ones. It leverages specific inputs to tailor text outputs for various applications, emphasizing the dynamic generation and transformation of text.
## Input types
### Required
- **`prompt`**
    - Serves as the foundational text input for manipulation or generation, where its content is crucial in determining the node's text output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - Determines the starting point within the input text from which processing begins, allowing for targeted manipulation or generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_rows`**
    - Specifies the maximum number of text lines to be generated or processed, setting a limit on the output's extent.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The output text after processing, reflecting the applied manipulations or generations based on the input conditions.
    - Python dtype: `List[str]`
- **`COMBO`**
    - Comfy dtype: `*`
    - An additional output that may represent an alternative or complementary processing result to the 'STRING' output, typically involving a combination of text and other elements.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class promptLine:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "prompt": ("STRING", {"multiline": True, "default": "text"}),
                    "start_index": ("INT", {"default": 0, "min": 0, "max": 9999}),
                     "max_rows": ("INT", {"default": 1000, "min": 1, "max": 9999}),
                    },
            "hidden":{
                "workflow_prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"
            }
        }

    RETURN_TYPES = ("STRING", AlwaysEqualProxy('*'))
    RETURN_NAMES = ("STRING", "COMBO")
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = "generate_strings"
    CATEGORY = "EasyUse/Prompt"

    def generate_strings(self, prompt, start_index, max_rows, workflow_prompt=None, my_unique_id=None):
        lines = prompt.split('\n')

        start_index = max(0, min(start_index, len(lines) - 1))

        end_index = min(start_index + max_rows, len(lines))

        rows = lines[start_index:end_index]


        return (rows, rows)

```
