# Prompt text input
## Documentation
- Class name: `SeargePromptText`
- Category: `Searge/_deprecated_/Prompting`
- Output node: `False`

The SeargePromptText node is designed for capturing and processing textual input for prompts in a deprecated Searge prompting system. It primarily serves to receive a user-defined text prompt, maintaining simplicity and directness in its approach.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter is the primary text input from the user, serving as the basis for further processing or generation tasks within the node. It allows multiline input, enabling more detailed and complex prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - This output is the unaltered text received from the input, directly passed through for use in subsequent processing or generation stages.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePromptText:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "prompt": ("STRING", {"default": "", "multiline": True}),
        },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Prompting"

    def get_value(self, prompt):
        return (prompt,)

```
