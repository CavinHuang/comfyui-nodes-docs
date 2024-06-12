# ∞ YAML Repair
## Documentation
- Class name: `LLMYamlRepair`
- Category: `SALT/Language Toolkit/Tools/YAML`
- Output node: `False`

The LLMYamlRepair node is designed to inspect and correct malformed YAML content, ensuring its validity and proper formatting without data loss, guided by optional additional directions.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for repairing the YAML, central to interpreting and correcting the malformed input.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The malformed YAML content to be repaired, serving as the primary input for analysis and correction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional instructions to guide the repair process, allowing for customization of the repair strategy.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`yaml_output`**
    - Comfy dtype: `STRING`
    - The corrected and valid YAML content, resulting from the repair process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMYamlRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed YAML..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("yaml_output",)

    FUNCTION = "repair_yaml"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/YAML"

    def repair_yaml(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed YAML, please inspect it and repair it so that it's valid YAML, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the YAML output is properly formatted, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
