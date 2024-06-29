# SR String Prompt Input (Mikey)
## Documentation
- Class name: `SRStringPromptInput`
- Category: `Mikey/Meta`
- Output node: `False`

The SRStringPromptInput node is designed to integrate string inputs into a prompt management system, specifically targeting the enhancement of semantic resolution in generated content. It captures and applies string values to designated prompts, facilitating dynamic content customization and refinement.
## Input types
### Required
- **`input_str`**
    - The 'input_str' parameter is the primary string input that the node processes to enhance the semantic resolution of prompts. It plays a crucial role in customizing and refining generated content by directly influencing the prompt's semantic context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The 'string' parameter returns the input string after it has been processed and integrated into the prompt, reflecting the enhanced semantic resolution achieved.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SRStringPromptInput:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_str': ('STRING', {'forceInput': True}),},
                "hidden": {"unique_id": "UNIQUE_ID", "prompt": "PROMPT"}}
    
    RETURN_TYPES = ("STRING",)
    FUNCTION = "add"
    CATEGORY = "Mikey/Meta"

    def add(self, input_str, unique_id=None, prompt=None):
        prompt.get(str(unique_id))['inputs']['sr_val'] = input_str
        return (input_str,)

```
