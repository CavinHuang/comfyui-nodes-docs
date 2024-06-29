# ∞ Markdown Repair
## Documentation
- Class name: `LLMMarkdownRepair`
- Category: `SALT/Language Toolkit/Tools/Markdown`
- Output node: `False`

The node is designed to repair malformed Markdown text, ensuring it is transformed into valid, well-structured Markdown without omitting any data. It leverages a language model to analyze and correct the input text based on given instructions.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for repairing the Markdown. It plays a crucial role in understanding and fixing the malformed Markdown based on the provided prompt.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The malformed Markdown text that needs to be repaired. This input is critical as it provides the content that the node will work on to produce valid Markdown.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions for the language model to follow when repairing the Markdown. This can guide the repair process more precisely according to specific requirements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`markdown_output`**
    - Comfy dtype: `STRING`
    - The repaired Markdown text, which is the result of the language model's processing of the input text and any extra directions provided.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMMarkdownRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed Markdown..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("markdown_output",)

    FUNCTION = "repair_markdown"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Markdown"

    def repair_markdown(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed Markdown, please inspect it and repair it so that it's valid Markdown, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the Markdown output is well-structured, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
