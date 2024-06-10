---
tags:
- Prompt
- PromptStyling
---

# Prompt Multiple Styles Selector
## Documentation
- Class name: `Prompt Multiple Styles Selector`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to select and concatenate multiple style prompts from a predefined set, allowing for the generation of complex and nuanced text prompts based on user-selected styles.
## Input types
### Required
- **`style1`**
    - The first style to be included in the prompt generation. Its selection influences the overall theme and direction of the generated prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style2`**
    - The second style to be included, further refining and adding to the theme initiated by the first style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style3`**
    - The third style selection, adding another layer of nuance to the prompt generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style4`**
    - The fourth and final style choice, completing the composition of the prompt with its unique characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`positive_string`**
    - Comfy dtype: `STRING`
    - The concatenated positive prompt generated from the selected styles.
    - Python dtype: `str`
- **`negative_string`**
    - Comfy dtype: `STRING`
    - The concatenated negative prompt generated from the selected styles, used for refining the generation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Prompt_Multiple_Styles_Selector:
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
                "style1": (style_list,),
                "style2": (style_list,),
                "style3": (style_list,),
                "style4": (style_list,),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("positive_string", "negative_string")
    FUNCTION = "load_style"

    CATEGORY = "WAS Suite/Text"

    def load_style(self, style1, style2, style3, style4):
        styles = {}
        if os.path.exists(STYLES_PATH):
            with open(STYLES_PATH, 'r') as data:
                styles = json.load(data)
        else:
            cstr(f"The styles file does not exist at `{STYLES_PATH}`. Unable to load styles! Have you imported your AUTOMATIC1111 WebUI styles?").error.print()
            return ('', '')

        # Check if the selected styles exist in the loaded styles dictionary
        selected_styles = [style1, style2, style3, style4]
        for style in selected_styles:
            if style not in styles:
                print(f"Style '{style}' was not found in the styles file.")
                return ('', '')

        prompt = ""
        negative_prompt = ""

        # Concatenate the prompts and negative prompts of the selected styles
        for style in selected_styles:
            prompt += styles[style]['prompt'] + " "
            negative_prompt += styles[style]['negative_prompt'] + " "

        return (prompt.strip(), negative_prompt.strip())

```
