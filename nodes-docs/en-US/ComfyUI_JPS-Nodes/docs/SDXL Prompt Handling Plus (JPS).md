---
tags:
- Prompt
- PromptStyling
---

# SDXL Prompt Handling Plus (JPS)
## Documentation
- Class name: `SDXL Prompt Handling Plus (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

This node is designed to enhance the process of handling and refining text prompts for generative models, incorporating advanced techniques to manipulate and optimize prompts for improved clarity, creativity, or specificity in generated outputs. It aims to provide a more nuanced and effective approach to prompt engineering, leveraging additional parameters and methods to fine-tune the interaction with the generative model.
## Input types
### Required
- **`handling`**
    - Specifies the method for handling and combining the positive and negative prompts, offering various strategies to tailor the prompt processing according to specific needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pos_g`**
    - Represents the global positive prompt input that the node will process, playing a crucial role in guiding the generative model towards producing desired outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pos_l`**
    - Serves as the local positive prompt input, providing additional context or emphasis to refine the output further.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pos_g`**
    - Comfy dtype: `STRING`
    - The processed global positive prompt, optimized for clarity and effectiveness in guiding the generative model.
    - Python dtype: `str`
- **`pos_l`**
    - Comfy dtype: `STRING`
    - The refined local positive prompt, tailored to add specific context or emphasis to the generated output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Prompt_Handling_Plus:
    handling = ["Copy to Both if Empty","Use Positive_G + Positive_L","Copy Positive_G to Both","Copy Positive_L to Both","Ignore Positive_G Input", "Ignore Positive_L Input", "Combine Positive_G + Positive_L", "Combine Positive_L + Positive_G",]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "handling": (s.handling,),
                "pos_g": ("STRING", {"multiline": True, "placeholder": "Prompt Text pos_g", "dynamicPrompts": True}),
                "pos_l": ("STRING", {"multiline": True, "placeholder": "Prompt Text pos_l", "dynamicPrompts": True}),
            },
        }
    
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos_g","pos_l",)
    FUNCTION = "pick_handling"

    CATEGORY="JPS Nodes/Text"

    def pick_handling(self,handling,pos_g,pos_l):
        
        if(handling == "Copy Positive_G to Both"):
            pos_l = pos_g
        elif(handling == "Copy Positive_L to Both"):
            pos_g = pos_l
        elif(handling == "Ignore Positive_G Input"):
            pos_g = ''
        elif(handling == "Ignore Positive_L Input"):
            pos_l = ''
        elif(handling == "Combine Positive_G + Positive_L"):
            combine = pos_g + ' . ' + pos_l
            pos_g = combine
            pos_l = combine
        elif(handling == "Combine Positive_L + Positive_G"):
            combine = pos_l + ' . ' + pos_g
            pos_g = combine
            pos_l = combine
        elif(handling == "Copy to Both if Empty" and pos_l == ''):
            pos_l = pos_g
        elif(handling == "Copy to Both if Empty" and pos_g == ''):
            pos_g = pos_l

        return(pos_g,pos_l,)

```
