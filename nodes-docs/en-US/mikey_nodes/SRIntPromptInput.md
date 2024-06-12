# SR Int Prompt Input (Mikey)
## Documentation
- Class name: `SRIntPromptInput`
- Category: `Mikey/Meta`
- Output node: `False`

The SRIntPromptInput node is designed to integrate integer inputs into a structured prompt system, enhancing the prompt with specific integer values for further processing or generation tasks.
## Input types
### Required
- **`input_int`**
    - This parameter represents the integer value to be added to the prompt, playing a crucial role in customizing the prompt's content based on numerical input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output_int`**
    - Comfy dtype: `INT`
    - The integer input that was added to the prompt, returned as confirmation of successful processing.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SRIntPromptInput:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_int': ('INT', {'forceInput': True}),},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}
    
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("output_int",)
    FUNCTION = "add"
    CATEGORY = "Mikey/Meta"

    def add(self, input_int, extra_pnginfo, unique_id, prompt):
        prompt.get(str(unique_id))['inputs']['sr_val'] = str(input_int)
        return (input_int,)

```
