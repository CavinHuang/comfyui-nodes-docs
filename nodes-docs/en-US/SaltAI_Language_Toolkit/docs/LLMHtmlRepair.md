# ∞ HTML Repair
## Documentation
- Class name: `LLMHtmlRepair`
- Category: `SALT/Language Toolkit/Tools/HTML`
- Output node: `False`

The LLMHtmlRepair node leverages a language model to analyze and correct malformed HTML content, ensuring the output is well-structured and valid HTML without data loss.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for repairing the HTML. It's crucial for interpreting the input and generating the corrected HTML.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`text_input`**
    - The malformed HTML content that needs to be repaired. It serves as the primary input for the correction process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions for the language model, guiding the repair process with more specificity.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`html_output`**
    - Comfy dtype: `STRING`
    - The repaired HTML content, which is well-structured and valid, ensuring no data is omitted.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMHtmlRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed HTML..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("html_output",)

    FUNCTION = "repair_html"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/HTML"

    def repair_html(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed HTML, please inspect it and repair it so that it's valid HTML, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the HTML output is well-structured, valid,, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
