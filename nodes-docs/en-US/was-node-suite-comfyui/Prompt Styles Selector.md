---
tags:
- Prompt
- PromptStyling
---

# Prompt Styles Selector
## Documentation
- Class name: `Prompt Styles Selector`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to select and load specific styles for prompts from a predefined list. It allows for the dynamic customization of text generation by applying different stylistic templates, enhancing the versatility and creativity of text outputs.
## Input types
### Required
- **`style`**
    - The 'style' parameter specifies the stylistic template to be applied to the text generation process. It plays a crucial role in determining the thematic and stylistic direction of the generated text, thereby affecting the overall output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`positive_string`**
    - Comfy dtype: `STRING`
    - The 'positive_string' output represents the main prompt text associated with the selected style, which is used to guide the text generation process in a positive direction.
    - Python dtype: `str`
- **`negative_string`**
    - Comfy dtype: `STRING`
    - The 'negative_string' output represents the negative prompt text associated with the selected style, which is used to steer the text generation process away from certain themes or concepts.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Prompt_Styles_Selector:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        style_list = []
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, "r") as f:
                if len(f.readlines()) != 0:
                    f.seek(0)
                    data = f.read()
                    styles = json.loads(data)
                    for style in styles.keys():
                        style_list.append(style)
        if not style_list:
            style_list.append("None")
        return {
            "required": {
                "style": (style_list,),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("positive_string", "negative_string")
    FUNCTION = "load_style"

    CATEGORY = "WAS Suite/Text"

    def load_style(self, style):

        styles = {}
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, 'r') as data:
                styles = json.load(data)
        else:
            cstr(f"The styles file does not exist at `{STYLES_PATH}`. Unable to load styles! Have you imported your AUTOMATIC1111 WebUI styles?").error.print()

        if styles and style != None or style != 'None':
            prompt = styles[style]['prompt']
            negative_prompt = styles[style]['negative_prompt']
        else:
            prompt = ''
            negative_prompt = ''

        return (prompt, negative_prompt)

```
