---
tags:
- Prompt
- PromptStyling
---

# Fans Prompt Styler Negative
## Documentation
- Class name: `Fans Prompt Styler Negative`
- Category: `utils`
- Output node: `False`

This node specializes in applying stylistic transformations to prompts based on predefined styles and structural positioning, enhancing the expressiveness and specificity of negative prompts.
## Input types
### Required
- **`style`**
    - Specifies the stylistic transformation to apply to the prompt, chosen from a predefined list of styles. It determines the thematic or stylistic overlay that will modify the original prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`structure`**
    - Determines the placement of the stylistic transformation in relation to the original prompt, either at the beginning or the end, affecting the prompt's overall structure and emphasis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt`**
    - The original text prompt to which the stylistic and structural transformations will be applied, serving as the base content for modification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`result`**
    - Comfy dtype: `STRING`
    - The transformed prompt, incorporating the selected style and structural positioning to convey a negative sentiment or theme.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansPromptStylerNegative:
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
                "structure": (["Beginning", "End"],{"default":"Beginning"}),               
                "prompt": ("STRING", {"multiline": True, "default": "Input Your Negative Prompt Here"}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("result",)
    FUNCTION = "func"
    OUTPUT_NODE = False
    CATEGORY = "utils"

    def func(self, style, structure, prompt):
        result=""

        if style=="None":
            result=prompt
        else:
            for row in self.styles:
                if row[0] == style:
                    result += row[1]              

            if structure == 'Beginning':
                result =  prompt + ", " + result
            else:
                result =  result + ", " + prompt

        return result,

```
