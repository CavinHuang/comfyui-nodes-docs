---
tags:
- Prompt
- PromptStyling
---

# Fans Prompt Styler Positive
## Documentation
- Class name: `Fans Prompt Styler Positive`
- Category: `utils`
- Output node: `False`

This node is designed to modify and enhance text prompts based on a selection of positive styles. It allows for the dynamic integration of stylistic elements into user-defined prompts, aiming to tailor the output text to specific aesthetic or thematic preferences.
## Input types
### Required
- **`style`**
    - The 'style' parameter allows users to select a specific style from a predefined list to apply to their prompt. This choice determines the stylistic transformation that the prompt will undergo, impacting the overall tone and presentation of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt`**
    - The 'prompt' parameter accepts a user-defined text input that serves as the base content for stylistic enhancement. This input is crucial as it forms the foundation upon which the selected style is applied, directly influencing the final output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`result`**
    - Comfy dtype: `STRING`
    - The 'result' output is the transformed prompt text, incorporating the selected style to modify the original input according to the user's aesthetic or thematic preferences.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansPromptStylerPositive:
    styles = None

    def __init__(self):
        pass
    
    def handle_prompt_change(self, value):
        print("New prompt value:", value)
    
    @classmethod
    def INPUT_TYPES(cls):
        if not os.path.exists(csv_file_path):
            cls.styles = [["No Styles.csv", "", ""]]
        else:
            with open(csv_file_path, "r") as f:
                reader = csv.reader(f, dialect='excel')
                cls.styles = [row for row in reader if len(row) == 2 and row[1] != "prompt" and row[0] != "None"]

        cls.styles.insert(0, ["None", "", ""])
        style_names = [row[0] for row in cls.styles]

        return {
            "required": {
                "style": (style_names, {"default": style_names[0]}),
                "prompt": ("STRING", {"multiline": True, "default": "Input Your Prompt Here"}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("result",)
    FUNCTION = "func"
    OUTPUT_NODE = False
    CATEGORY = "utils"

    def func(self, style, prompt):
        result=""

        if style=="None":
            result=prompt
        else:
            for row in self.styles:
                if row[0] == style:
                    result += row[1]              

            if "{prompt}" not in result:
                result =  prompt + " " + result
            else:
                result = result.replace("{prompt}", prompt)

        return result,

```
