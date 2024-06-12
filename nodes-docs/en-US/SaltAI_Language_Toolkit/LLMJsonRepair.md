# ∞ JSON Repair
## Documentation
- Class name: `LLMJsonRepair`
- Category: `SALT/Language Toolkit/Tools/JSON`
- Output node: `False`

The LLMJsonRepair node is designed to correct malformed JSON strings using a language model. It takes a potentially incorrect JSON input and optional directions, and outputs a repaired version of the JSON, ensuring data integrity and proper formatting.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for repairing the JSON. It is crucial for interpreting the input and generating the corrected output.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The malformed JSON string that needs to be repaired. This input is essential for the node to understand what needs fixing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions for the language model to follow during the repair process, allowing for more tailored corrections.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`json_output`**
    - Comfy dtype: `STRING`
    - The repaired JSON string, corrected for syntax and formatting errors to ensure validity.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMJsonRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed JSON..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("json_output",)

    FUNCTION = "compose_json"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/JSON"

    def compose_json(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed JSON, please inspect it and repair it so that it's valid JSON, without changing or loosing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the JSON output is properly formatted, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
