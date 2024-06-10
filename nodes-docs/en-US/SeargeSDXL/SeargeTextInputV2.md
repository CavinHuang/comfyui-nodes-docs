# Text Input v2
## Documentation
- Class name: `SeargeTextInputV2`
- Category: `Searge/UI/Prompting`
- Output node: `False`

SeargeTextInputV2 is designed to capture and process textual input from the user, specifically for generating or modifying prompts in a user interface context. It allows for multiline text input, providing a straightforward mechanism for users to input or edit text for various applications.
## Input types
### Required
- **`prompt`**
    - The 'prompt' parameter is the primary text input from the user. It is essential for capturing user input, which can then be processed or passed on for further actions. The parameter supports multiline text, enabling more complex or detailed input from the user.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt_text`**
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - The 'prompt_text' output returns the user's input text without modification. It serves as a direct reflection of the user's input, facilitating further processing or use within the application.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeTextInputV2:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "prompt": ("STRING", {"default": "", "multiline": True},),
            },
        }

    RETURN_TYPES = ("SRG_PROMPT_TEXT",)
    RETURN_NAMES = ("prompt_text",)
    FUNCTION = "get_value"

    CATEGORY = UI.CATEGORY_UI_PROMPTING

    def get_value(self, prompt):
        return (prompt,)

```
