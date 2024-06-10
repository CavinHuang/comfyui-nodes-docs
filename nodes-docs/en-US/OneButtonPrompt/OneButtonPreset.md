---
tags:
- Prompt
- PromptComposer
---

# One Button Preset
## Documentation
- Class name: `OneButtonPreset`
- Category: `OneButtonPrompt`
- Output node: `False`

The OneButtonPreset node is designed to streamline the process of applying preset configurations to a prompt generation task. It allows for the selection and application of predefined or custom settings that adjust various aspects of the prompt generation, such as theme, complexity, and style, enhancing the user's ability to produce tailored content with minimal effort.
## Input types
### Required
- **`OneButtonPreset`**
    - Specifies the preset configuration to be applied. This can be a predefined preset or a custom configuration, influencing the generation process by setting themes, styles, and complexity levels.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`base_model`**
    - Defines the underlying model to be used for prompt generation, affecting the style and quality of the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt_enhancer`**
    - An optional component that modifies the generated prompt to meet specific criteria or add creative elements, further customizing the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Determines the random seed used for generating prompts, ensuring reproducibility or variability in the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The generated prompt based on the selected preset configuration, incorporating any specified enhancements or adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OneButtonPreset:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "OneButtonPreset": (allpresets, {"default": "Standard"}),
            },
            "optional": {
                "base_model":(models, {"default": "SDXL"}),
                "prompt_enhancer":(prompt_enhancers, {"default": "none"}),   
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }


    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)

    FUNCTION = "Comfy_OBP_OneButtonPreset"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_OneButtonPreset(self, OneButtonPreset, seed, base_model, prompt_enhancer):
        # load the stuff
        if(OneButtonPreset == OBPresets.RANDOM_PRESET_OBP):
            selected_opb_preset = OBPresets.get_obp_preset("Standard")
        else:
            selected_opb_preset = OBPresets.get_obp_preset(OneButtonPreset)
        
        insanitylevel=selected_opb_preset["insanitylevel"]
        subject=selected_opb_preset["subject"]
        artist=selected_opb_preset["artist"]
        chosensubjectsubtypeobject=selected_opb_preset["chosensubjectsubtypeobject"]
        chosensubjectsubtypehumanoid=selected_opb_preset["chosensubjectsubtypehumanoid"]
        chosensubjectsubtypeconcept=selected_opb_preset["chosensubjectsubtypeconcept"]
        chosengender=selected_opb_preset["chosengender"]
        imagetype=selected_opb_preset["imagetype"]
        imagemodechance=selected_opb_preset["imagemodechance"]
        givensubject=selected_opb_preset["givensubject"]
        smartsubject=selected_opb_preset["smartsubject"]
        givenoutfit=selected_opb_preset["givenoutfit"]
        prefixprompt=selected_opb_preset["prefixprompt"]
        suffixprompt=selected_opb_preset["suffixprompt"]
        giventypeofimage=selected_opb_preset["giventypeofimage"]
        antistring=selected_opb_preset["antistring"]
        
        generatedprompt = build_dynamic_prompt(insanitylevel=insanitylevel,
                                               forcesubject=subject,
                                               artists=artist,
                                               subtypeobject=chosensubjectsubtypeobject,
                                               subtypehumanoid=chosensubjectsubtypehumanoid,
                                               subtypeconcept=chosensubjectsubtypeconcept,
                                               gender=chosengender,
                                               imagetype=imagetype,
                                               imagemodechance=imagemodechance,
                                               givensubject=givensubject,
                                               smartsubject=smartsubject,
                                               overrideoutfit=givenoutfit,
                                               prefixprompt=prefixprompt,
                                               suffixprompt=suffixprompt,
                                               giventypeofimage=giventypeofimage,
                                               antivalues=antistring,
                                               advancedprompting=False,
                                               hardturnoffemojis=True,
                                               seed=seed,
                                               base_model=base_model,
                                               OBP_preset=OneButtonPreset,
                                               prompt_enhancer=prompt_enhancer,
                                               )
        
        
        return (generatedprompt,)

```
