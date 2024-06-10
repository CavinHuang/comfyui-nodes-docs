# Auto Negative Prompt
## Documentation
- Class name: `AutoNegativePrompt`
- Category: `OneButtonPrompt`
- Output node: `False`

The AutoNegativePrompt node is designed to automatically generate a negative prompt based on a given positive prompt and various parameters. It utilizes dynamic logic to adjust the negativity of the prompt, potentially enhancing it based on the input parameters and the specified base model. This functionality is aimed at creating prompts that can be used to guide or restrict generative models in producing content by specifying what should be avoided.
## Input types
### Required
- **`postive_prompt`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
- **`base_negative`**
    - The base negative prompt to be enhanced or modified based on the other parameters. Acts as a foundational negative context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enhancenegative`**
    - A boolean flag that, when enabled, enhances the base negative prompt by incorporating additional negative elements.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
- **`insanitylevel`**
    - Determines the level of randomness or 'insanity' in the generated negative prompt, affecting its variability and unpredictability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`base_model`**
    - Specifies the base model to influence the style and approach of the negative prompt generation, with options like 'SD1.5', 'SDXL', and 'Stable Cascade'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the generated negative prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`negative_prompt`**
    - Comfy dtype: `STRING`
    - The dynamically generated negative prompt, crafted based on the input positive prompt and other parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AutoNegativePrompt:


    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "postive_prompt": ("STRING", {"default": '', "multiline": True}),
            },
            "optional": {
                "base_negative": ("STRING", {
                    "multiline": True, #True if you want the field to look like the one on the ClipTextEncode node
                    "default": "text, watermark"
                }),
                "enhancenegative": ("INT", {
                    "default": 0, 
                    "min": 0, #Minimum value
                    "max": 1, #Maximum value
                    "step": 1, #Slider's step
                }),
                "insanitylevel": ("INT", {
                    "default": 0,
                    "min": 0, #Minimum value
                    "max": 10, #Maximum value
                    "step": 1 #Slider's step
                }),
                "base_model":(models, {"default": "SDXL"}),
                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("negative_prompt",)

    FUNCTION = "Comfy_OBP_AutoNegativePrompt"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_AutoNegativePrompt(self, postive_prompt, insanitylevel, enhancenegative,base_negative, seed, base_model):
        generatedprompt = build_dynamic_negative(postive_prompt, insanitylevel, enhancenegative, base_negative, base_model=base_model)
        
        print("Generated negative prompt: " + generatedprompt)
        
        return (generatedprompt,)

```
