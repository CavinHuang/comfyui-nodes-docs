---
tags:
- Prompt
- PromptStyling
---

# SDXL Prompt Handling (JPS)
## Documentation
- Class name: `SDXL Prompt Handling (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

This node is designed to process and handle text prompts for image generation tasks, optimizing them for use with the SDXL model. It focuses on refining and structuring input prompts to enhance the clarity and effectiveness of the generated images.
## Input types
### Required
- **`handling`**
    - Specifies the method for handling the combination or selection of positive prompts, offering various strategies to optimize prompt effectiveness.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pos_g`**
    - Represents the global positive prompt, providing a broad thematic or subject matter direction for the image generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pos_l`**
    - Denotes the local positive prompt, offering more specific details or elements to be included in the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pos_g`**
    - Comfy dtype: `STRING`
    - The processed global positive prompt, reflecting the chosen handling strategy and ready for use with the SDXL model.
    - Python dtype: `str`
- **`pos_l`**
    - Comfy dtype: `STRING`
    - The processed local positive prompt, adjusted according to the handling method and tailored for the image generation task.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Prompt_Handling:
    handling = ["Copy to Both if Empty","Use Positive_G + Positive_L","Copy Positive_G to Both","Copy Positive_L to Both","Ignore Positive_G Input", "Ignore Positive_L Input", "Combine Positive_G + Positive_L", "Combine Positive_L + Positive_G",]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "handling": (s.handling,),
                "pos_g": ("STRING", {"default": ""}),
                "pos_l": ("STRING", {"default": ""}),
            },
        }
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos_g","pos_l",)
    FUNCTION = "pick_handling"

    CATEGORY="JPS Nodes/Text"

    def pick_handling(self,handling,pos_g,pos_l,):
        
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
