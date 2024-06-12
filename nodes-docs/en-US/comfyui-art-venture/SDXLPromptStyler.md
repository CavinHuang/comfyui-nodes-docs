---
tags:
- Prompt
- PromptStyling
---

# SDXL Prompt Styler
## Documentation
- Class name: `SDXLPromptStyler`
- Category: `utils`
- Output node: `False`

The SDXL Prompt Styler node is designed to enhance text prompts with a specific style, allowing for the dynamic customization of prompts based on user-defined positive and negative text inputs and a selected style. It supports the application of predefined styles to the prompts, optionally logging the process, and can adjust the styling based on a specified style name if available.
## Input types
### Required
- **`text_positive`**
    - The positive text input that will be styled according to the selected style. It plays a crucial role in defining the overall tone and direction of the generated prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input that will be combined with the style's negative prompt template, if available, to refine the direction of the generated prompt further.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style`**
    - The primary style identifier used to select the template for styling the prompts. It determines the thematic or aesthetic direction of the prompt styling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A flag indicating whether the styling process should be logged, providing insights into the selected style and the resulting positive and negative prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`style_name`**
    - An optional style name that, if provided and found within the available styles, overrides the primary style identifier for more specific prompt styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The styled positive prompt text, ready for further processing or use.
    - Python dtype: `str`
- **`negative_prompt_text_g`**
    - Comfy dtype: `STRING`
    - The styled negative prompt text, complementing the positive prompt with additional or contrasting information.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - Demofusion From Single File
    - IDGenerationNode
    - [ttN pipeLoader](../../ComfyUI_tinyterraNodes/Nodes/ttN pipeLoader.md)
    - [Eff. Loader SDXL](../../efficiency-nodes-comfyui/Nodes/Eff. Loader SDXL.md)
    - [SDXLPromptStyler](../../comfyui-art-venture/Nodes/SDXLPromptStyler.md)
    - ComfyUIStyler
    - NEW_PhotoMaker_Generation
    - Reroute



## Source code
```python
class SDXLPromptStyler:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        current_directory = os.path.dirname(os.path.realpath(__file__))
        self.json_data, self.styles = load_styles_from_directory(current_directory)

        return {
            "required": {
                "text_positive": ("STRING", {"default": "", "multiline": True}),
                "text_negative": ("STRING", {"default": "", "multiline": True}),
                "style": ((self.styles),),
                "log_prompt": (["No", "Yes"], {"default": "No"}),
            },
            "optional": {
                "style_name": ("STRING", {"multiline": False}),
            },
        }

    RETURN_TYPES = (
        "STRING",
        "STRING",
    )
    RETURN_NAMES = (
        "positive_prompt_text_g",
        "negative_prompt_text_g",
    )
    FUNCTION = "prompt_styler"
    CATEGORY = "utils"

    def prompt_styler(
        self, text_positive, text_negative, style, log_prompt, style_name=None
    ):
        if style_name and style_name not in self.styles:
            print(f"Warning: Style '{style_name}' not found. Using '{style}' instead.")
            style_name = None

        if style_name:
            style = style_name

        # Process and combine prompts in templates
        # The function replaces the positive prompt placeholder in the template,
        # and combines the negative prompt with the template's negative prompt, if they exist.
        positive_prompt, negative_prompt = read_sdxl_templates_replace_and_combine(
            self.json_data, style, text_positive, text_negative
        )

        # If logging is enabled (log_prompt is set to "Yes"),
        # print the style, positive and negative text, and positive and negative prompts to the console
        if log_prompt == "Yes":
            print(f"style: {style}")
            print(f"text_positive: {text_positive}")
            print(f"text_negative: {text_negative}")
            print(f"positive_prompt: {positive_prompt}")
            print(f"negative_prompt: {negative_prompt}")

        return positive_prompt, negative_prompt

```
