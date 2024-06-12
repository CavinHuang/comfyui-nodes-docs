---
tags:
- Prompt
- PromptComposer
---

# One Button Prompt
## Documentation
- Class name: `OneButtonPrompt`
- Category: `OneButtonPrompt`
- Output node: `False`

The OneButtonPrompt node is designed to automate and enrich the process of prompt generation for creative content, leveraging a comprehensive set of parameters to tailor prompts to specific themes, styles, and preferences. It facilitates the generation of diverse and dynamic text prompts, incorporating elements such as subject matter, artistic influence, and image type to produce customized and varied outputs.
## Input types
### Required
- **`insanitylevel`**
    - Determines the level of creativity and randomness in the generated prompts, affecting their complexity and uniqueness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`artist`**
    - Specifies the artist or style to influence the prompt, allowing for thematic alignment with certain artistic expressions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`imagetype`**
    - Defines the type of image to be generated, guiding the visual theme of the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`imagemodechance`**
    - Controls the likelihood of selecting a special image generation mode, adding variety to the prompt outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`subject`**
    - Sets the main subject for the prompt, directing the focus of the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_subject`**
    - Allows for a specific subject override, providing direct control over the prompt's main theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`custom_outfit`**
    - Enables specifying an outfit for the subject, adding detail to character or humanoid prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subject_subtype_objects`**
    - Selects a subtype for object-focused prompts, refining the object category.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`subject_subtypes_humanoids`**
    - Chooses a subtype for humanoid subjects, detailing the nature of the character.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`humanoids_gender`**
    - Determines the gender of humanoid subjects, further customizing the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`subject_subtypes_concepts`**
    - Specifies a subtype for conceptual prompts, focusing the abstract theme.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`emojis`**
    - Enables or disables the inclusion of emojis in the prompt, affecting its tone and style.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`base_model`**
    - Selects the base model for prompt generation, influencing the style and complexity of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt_enhancer`**
    - Applies additional enhancements to the prompt, refining its quality and detail.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Sets a seed for random number generation to ensure consistency and reproducibility in prompt generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The primary generated prompt, crafted based on the input parameters and enhancements applied.
    - Python dtype: `str`
- **`prompt_g`**
    - Comfy dtype: `STRING`
    - A variant of the generated prompt, possibly incorporating additional generative elements or modifications.
    - Python dtype: `str`
- **`prompt_l`**
    - Comfy dtype: `STRING`
    - Another variant of the generated prompt, offering an alternative perspective or thematic focus.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode (BlenderNeko Advanced + NSP)](../../was-node-suite-comfyui/Nodes/CLIPTextEncode (BlenderNeko Advanced + NSP).md)
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)
    - [BNK_CLIPTextEncodeAdvanced](../../ComfyUI_ADV_CLIP_emb/Nodes/BNK_CLIPTextEncodeAdvanced.md)
    - DPMagicPrompt
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class OneButtonPrompt:


    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "insanitylevel": ("INT", {
                    "default": 5,
                    "min": 1, #Minimum value
                    "max": 10, #Maximum value
                    "step": 1 #Slider's step
                }),
                },
            "optional": {
                "artist": (artists, {"default": "all"}),
                "imagetype": (imagetypes, {"default": "all"}),
                "imagemodechance": ("INT", {
                    "default": 20,
                    "min": 1, #Minimum value
                    "max": 100, #Maximum value
                    "step": 1 #Slider's step
                }),
                "subject": (subjects, {"default": "all"}),
                "custom_subject": ("STRING", {
                    "multiline": False, #True if you want the field to look like the one on the ClipTextEncode node
                    "default": ""
                }),
                "custom_outfit": ("STRING", {
                    "multiline": False, # This is the overwrite for an outfit, super nice
                    "default": ""
                }),
                "subject_subtype_objects": (subjectsubtypesobject, {"default": "all"}),
                "subject_subtypes_humanoids": (subjectsubtypeshumanoid, {"default": "all"}),
                "humanoids_gender": (genders, {"default": "all"}),
                "subject_subtypes_concepts": (subjectsubtypesconcept, {"default": "all"}),
                "emojis":(emojis, {"default": False}),
                "base_model":(models, {"default": "SDXL"}),
                "prompt_enhancer":(prompt_enhancers, {"default": "none"}),
                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING","STRING", "STRING")
    RETURN_NAMES = ("prompt","prompt_g", "prompt_l")

    FUNCTION = "Comfy_OBP"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP(self, insanitylevel, custom_subject, seed, artist, imagetype, subject, imagemodechance, humanoids_gender, subject_subtype_objects, subject_subtypes_humanoids, subject_subtypes_concepts, emojis, custom_outfit, base_model, prompt_enhancer):
        generatedpromptlist = build_dynamic_prompt(insanitylevel,subject,artist,imagetype,False,"","","",1,"",custom_subject,True,"",imagemodechance, humanoids_gender, subject_subtype_objects, subject_subtypes_humanoids, subject_subtypes_concepts, False, emojis, seed, custom_outfit, True, base_model, "", prompt_enhancer)
        #print(generatedprompt)
        generatedprompt = generatedpromptlist[0]
        prompt_g = generatedpromptlist[1]
        prompt_l = generatedpromptlist[2]

        return (generatedprompt, prompt_g, prompt_l)

```
