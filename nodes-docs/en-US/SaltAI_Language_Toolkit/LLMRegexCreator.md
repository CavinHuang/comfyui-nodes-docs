# ∞ Regex Creator
## Documentation
- Class name: `LLMRegexCreator`
- Category: `SALT/Language Toolkit/Tools/Regex`
- Output node: `False`

The LLMRegexCreator node is designed to generate regular expression (regex) patterns based on a given description and optional additional directions. It utilizes a language model to interpret the requirements and produce a well-formed regex pattern that accurately matches the specified criteria.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for generating the regex pattern. It is crucial for interpreting the description and extra directions to create the regex.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`description`**
    - The primary description of the regex pattern to be created. This description is the basis for the regex generation, guiding the language model in crafting the pattern.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions or constraints to guide the language model in generating the regex pattern. These directions can refine the output by providing more context or specific requirements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`regex_pattern`**
    - Comfy dtype: `STRING`
    - The generated regex pattern based on the provided description and optional extra directions.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMRegexCreator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "description": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Describe regex pattern to create, optionally provide example"}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("regex_pattern",)

    FUNCTION = "create_regex"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Regex"

    def create_regex(self, llm_model, description, extra_directions=""):
        prompt = (
            f"Create only a well formed regex pattern based on the following description:\n\n"
            f"{description}\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the regex pattern is concise and accurately matches the described criteria."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
