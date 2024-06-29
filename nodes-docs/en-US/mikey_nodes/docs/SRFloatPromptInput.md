# SR Float Prompt Input (Mikey)
## Documentation
- Class name: `SRFloatPromptInput`
- Category: `Mikey/Meta`
- Output node: `False`

The SRFloatPromptInput node is designed to process floating-point inputs for specific prompts, integrating them into a larger data structure based on unique identifiers. It primarily serves to update or modify prompt-related information with floating-point values, facilitating dynamic content generation or modification within a system.
## Input types
### Required
- **`input_float`**
    - Represents the floating-point value to be integrated into the prompt's data structure, playing a crucial role in the dynamic modification or generation of content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SRFloatPromptInput:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_float': ('FLOAT', {'forceInput': True}),},
                "hidden": {"unique_id": "UNIQUE_ID", "prompt": "PROMPT"}}
    
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "add"
    CATEGORY = "Mikey/Meta"

    def add(self, input_float, unique_id=None, prompt=None):
        prompt.get(str(unique_id))['inputs']['sr_val'] = str(input_float)
        return (input_float,)

```
