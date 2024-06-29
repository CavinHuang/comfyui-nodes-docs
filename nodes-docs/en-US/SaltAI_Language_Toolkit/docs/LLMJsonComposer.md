# ∞ JSON Composer
## Documentation
- Class name: `LLMJsonComposer`
- Category: `SALT/Language Toolkit/Tools/JSON`
- Output node: `False`

The LLMJsonComposer node is designed to generate valid JSON objects from given text inputs by leveraging a language model. It processes textual data along with a set of classifiers and optional directions to compose JSON structures that encapsulate the provided information accurately and coherently.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to be used for generating the JSON object, playing a crucial role in interpreting the input text and classifiers to produce the desired output.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`text_input`**
    - The primary textual data from which the JSON object will be composed, serving as the base content for the generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`classifier_list`**
    - A comma-separated list of classifiers that guide the JSON composition by categorizing the input text, influencing the structure and content of the generated JSON.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_directions`**
    - Optional additional instructions for the language model to follow when composing the JSON, allowing for more tailored and specific outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`json_output`**
    - Comfy dtype: `STRING`
    - The generated JSON object as a string, representing a structured and valid JSON format of the input text and classifiers.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMJsonComposer:
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
    RETURN_NAMES = ("json_output",)

    FUNCTION = "compose_json"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/JSON"

    def compose_json(self, llm_model, text_input, classifier_list, extra_directions=""):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        prompt = f"{text_input}\n\n###\n\nGiven the above text, create a valid JSON object utilizing *all* of the data; using the following classifiers: {classifier_list}.\n\n{extra_directions}\n\nPlease ensure the JSON output is properly formatted, and does not omit any data."
        response = llm_model['llm'].complete(prompt)
        return (response.text,)

```
