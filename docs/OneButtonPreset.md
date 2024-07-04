
# Documentation
- Class name: OneButtonPreset
- Category: OneButtonPrompt
- Output node: False

OneButtonPreset节点旨在简化提示词生成任务中应用预设配置的过程。它允许选择和应用预定义或自定义设置，以调整提示词生成的各个方面，如主题、复杂度和风格，从而增强用户以最小努力生成定制内容的能力。

# Input types
## Required
- OneButtonPreset
    - 指定要应用的预设配置。这可以是预定义的预设或自定义配置，通过设置主题、风格和复杂度级别来影响生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- base_model
    - 定义用于提示词生成的底层模型，影响生成内容的风格和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prompt_enhancer
    - 一个可选组件，用于修改生成的提示词以满足特定标准或添加创意元素，进一步定制输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- seed
    - 确定用于生成提示词的随机种子，确保输出的可重复性或变异性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- prompt
    - 基于所选预设配置生成的提示词，包含任何指定的增强或调整。
    - Comfy dtype: STRING
    - Python dtype: str


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
