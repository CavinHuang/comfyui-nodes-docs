# ∞ HTML Composer
## Documentation
- Class name: `LLMHtmlComposer`
- Category: `SALT/Language Toolkit/Tools/HTML`
- Output node: `False`

The LLMHtmlComposer node is designed to generate HTML content based on given text input, classifier list, and optional extra directions. It leverages a language model to compose either a full HTML page document or an HTML snippet, depending on the specified mode, ensuring the output is well-structured and valid.
## Input types
### Required
- **`llm_model`**
    - Represents the language model used for generating HTML content. It's crucial for interpreting the input text and classifiers to produce the desired HTML output.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The primary text input from which the HTML content will be generated. This text serves as the base for the composition process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`classifier_list`**
    - A list of classifiers provided as a comma-separated string. These classifiers guide the language model in generating HTML content that aligns with specific criteria or categories.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions to further guide the HTML generation process, allowing for more customized outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`composer_mode`**
    - Specifies the mode of HTML composition, either as a full HTML page document or an HTML snippet, influencing the structure and inclusion of HTML elements in the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`html_output`**
    - Comfy dtype: `STRING`
    - The generated HTML content, either as a full HTML page or an HTML snippet, based on the input text, classifiers, and optional directions.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMHtmlComposer:
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
                "composer_mode": (["full_markup", "blocked_markup"],)
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("html_output",)

    FUNCTION = "compose_html"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/HTML"

    def compose_html(self, llm_model, text_input, classifier_list, extra_directions="", composer_mode="full_markup"):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        markup_style = "full HTML page document" if composer_mode == "full_markup" else "HTML snippet (without html, head, body or any extraneous containers)"
        prompt = (
            f"{text_input}\n\n###\n\n"
            f"Given the above text, create a valid {markup_style} utilizing *all* of the data, intact; "
            f"using the following classifiers: {classifier_list}.\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the HTML output is well-structured, valid, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
