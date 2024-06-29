---
tags:
- Prompt
---

# Text Prompt Combo (JPS)
## Documentation
- Class name: `Text Prompt Combo (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

The Text Prompt Combo node is designed to accept two distinct text inputs, typically representing positive and negative prompt texts, and returns them as is. This node facilitates the combination or juxtaposition of different textual inputs for further processing or generation tasks.
## Input types
### Required
- **`pos`**
    - Represents the positive prompt text, allowing for multiline input and dynamic prompt generation. It plays a crucial role in defining the positive aspect of the content to be generated or processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`neg`**
    - Represents the negative prompt text, also allowing for multiline input and dynamic prompt generation. It is essential for specifying the negative aspect or elements to be excluded in the content generation or processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pos`**
    - Comfy dtype: `STRING`
    - Returns the positive prompt text as provided in the input, facilitating further content generation or processing tasks.
    - Python dtype: `str`
- **`neg`**
    - Comfy dtype: `STRING`
    - Returns the negative prompt text as provided in the input, enabling the exclusion or negation of certain elements in content generation or processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text_Prompt_Combo:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pos": ("STRING", {"multiline": True, "placeholder": "Prompt Text Positive", "dynamicPrompts": True}),
                "neg": ("STRING", {"multiline": True, "placeholder": "Prompt Text Negative", "dynamicPrompts": True}),
            },
        }
    
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos","neg",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Text"

    def give_values(self,pos,neg):
        
        return(pos,neg,)

```
