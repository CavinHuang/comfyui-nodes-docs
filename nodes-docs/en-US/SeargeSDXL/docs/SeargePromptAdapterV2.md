---
tags:
- Searge
---

# Prompt Adapter v2
## Documentation
- Class name: `SeargePromptAdapterV2`
- Category: `Searge/UI/Prompting`
- Output node: `False`

The SeargePromptAdapterV2 node is designed to adapt input prompts for further processing or generation tasks, enabling customization and refinement of text inputs to fit specific requirements or formats.
## Input types
### Required
### Optional
- **`data`**
    - This input represents a data stream that can include various types of information, serving as a flexible container for inputs that the node can process or transform.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict[str, Any]`
- **`main_prompt`**
    - Captures the primary text prompt intended for guiding the generation process, focusing on the main subject or theme.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
- **`secondary_prompt`**
    - This input captures additional text prompts that complement the main prompt, offering further context or detail.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
- **`style_prompt`**
    - Specifies a style or tone for the text generation, influencing the mood or character of the output.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
- **`negative_main_prompt`**
    - Captures negative text prompts to avoid certain topics or attributes in the generation process.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
- **`negative_secondary_prompt`**
    - Additional negative prompts that help refine the filtering process by excluding undesired elements.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
- **`negative_style_prompt`**
    - Defines a style or tone to be avoided in the text generation, ensuring the output does not carry undesired characteristics.
    - Comfy dtype: `SRG_PROMPT_TEXT`
    - Python dtype: `str`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - A data stream that includes the processed or transformed inputs, ready for further use or generation tasks.
    - Python dtype: `Dict[str, Any]`
- **`prompts`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - A collection of prompts, both positive and negative, formatted and ready for use in generation tasks.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePromptAdapterV2:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
                "main_prompt": ("SRG_PROMPT_TEXT",),
                "secondary_prompt": ("SRG_PROMPT_TEXT",),
                "style_prompt": ("SRG_PROMPT_TEXT",),
                "negative_main_prompt": ("SRG_PROMPT_TEXT",),
                "negative_secondary_prompt": ("SRG_PROMPT_TEXT",),
                "negative_style_prompt": ("SRG_PROMPT_TEXT",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM", "SRG_DATA_STREAM",)
    RETURN_NAMES = ("data", UI.S_PROMPTS,)
    FUNCTION = "get_value"

    CATEGORY = UI.CATEGORY_UI_PROMPTING

    @staticmethod
    def create_dict(main_prompt=None, secondary_prompt=None, style_prompt=None,
                    negative_main_prompt=None, negative_secondary_prompt=None, negative_style_prompt=None):
        return {
            UI.F_MAIN_PROMPT: main_prompt,
            UI.F_SECONDARY_PROMPT: secondary_prompt,
            UI.F_STYLE_PROMPT: style_prompt,
            UI.F_NEGATIVE_MAIN_PROMPT: negative_main_prompt,
            UI.F_NEGATIVE_SECONDARY_PROMPT: negative_secondary_prompt,
            UI.F_NEGATIVE_STYLE_PROMPT: negative_style_prompt,
        }

    def get_value(self, main_prompt=None, secondary_prompt=None, style_prompt=None,
                  negative_main_prompt=None, negative_secondary_prompt=None, negative_style_prompt=None, data=None):
        if data is None:
            data = {}

        data[UI.S_PROMPTS] = self.create_dict(
            main_prompt,
            secondary_prompt,
            style_prompt,
            negative_main_prompt,
            negative_secondary_prompt,
            negative_style_prompt
        )

        return (data, data[UI.S_PROMPTS],)

```
