---
tags:
- LLM
- LLMDataConversion
---

# ∞ Markdown Composer
## Documentation
- Class name: `LLMMarkdownComposer`
- Category: `SALT/Language Toolkit/Tools/Markdown`
- Output node: `False`

The LLMMarkdownComposer node is designed to transform input text into well-structured Markdown documents. It leverages a language model to interpret and format the given text according to specified classifiers and additional directions, ensuring the output adheres to Markdown syntax while incorporating all provided data.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to use for generating the Markdown document. It plays a crucial role in understanding the input text and formatting it according to Markdown syntax.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The primary text input that will be transformed into a Markdown document. This text serves as the base content for the Markdown generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`classifier_list`**
    - A comma-separated list of classifiers that guide the language model in structuring the Markdown document. These classifiers help in categorizing and formatting the input text appropriately.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Additional instructions for the language model to follow when generating the Markdown document. These directions can include specific formatting requests or content structuring guidelines.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`markdown_output`**
    - Comfy dtype: `STRING`
    - The generated Markdown document, structured and formatted according to the input specifications and additional directions.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMarkdownComposer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Data..."}),
                "classifier_list": ("STRING", {"multiline": False, "dynamicPrompts": False}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("markdown_output",)

    FUNCTION = "compose_markdown"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Markdown"

    def compose_markdown(self, llm_model, text_input, classifier_list, extra_directions=""):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above text, create a valid Markdown document utilizing *all* of the data; "
            f"using the following classifiers: {classifier_list}.\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the Markdown output is well-structured, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
