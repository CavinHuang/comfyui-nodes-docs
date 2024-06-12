---
tags:
- Prompt
- PromptComposer
---

# Create Prompt Variant
## Documentation
- Class name: `CreatePromptVariant`
- Category: `OneButtonPrompt`
- Output node: `False`

The CreatePromptVariant node is designed to generate variations of a given text prompt, incorporating a level of randomness or 'insanity' to modify the original prompt in creative ways. It allows for the customization of the generated prompt based on specified parameters, such as the degree of variation and a seed for reproducibility.
## Input types
### Required
- **`prompt_input`**
    - The primary text input for which the variant is to be created. This serves as the base content that will be modified according to the other parameters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`insanitylevel`**
    - Determines the degree of variation from the original prompt. A higher value indicates a greater level of randomness and creativity in the generated prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for the random number generator, ensuring that the prompt variation can be reproduced if the same seed is used again.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The generated variant of the original text prompt, incorporating the specified level of variation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreatePromptVariant:


    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "prompt_input": ("STRING", {"default": '', "multiline": True}),
            },
            "optional": {
                "insanitylevel": ("INT", {
                    "default": 5,
                    "min": 1, #Minimum value
                    "max": 10, #Maximum value
                    "step": 1 #Slider's step
                }),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)

    FUNCTION = "Comfy_OBP_PromptVariant"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_PromptVariant(self, prompt_input, insanitylevel, seed):
        generatedprompt = createpromptvariant(prompt_input, insanitylevel)
        
        print(generatedprompt)
        
        return (generatedprompt,)

```
