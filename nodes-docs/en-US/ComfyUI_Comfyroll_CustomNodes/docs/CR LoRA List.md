---
tags:
- LoRA
---

# CR LoRA List (Legacy)
## Documentation
- Class name: `CR LoRA List`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

The CR LoRA List node is designed to compile and manage lists of LoRA (Layer-wise Relevance Propagation) configurations, facilitating the organization and application of multiple LoRA settings in animation projects. It supports the dynamic addition of LoRA configurations to an existing list, enabling users to efficiently manage and apply various LoRA effects based on specific animation requirements.
## Input types
### Required
- **`lora_name1`**
    - Specifies the first LoRA configuration name to be added to the list, playing a crucial role in defining the initial set of LoRA settings for the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias1`**
    - Provides an alias for the first LoRA configuration, offering a simplified reference to this specific set of LoRA settings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_strength_1`**
    - Determines the strength of the model's influence for the first LoRA configuration, affecting the overall impact of this LoRA setting on the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_strength_1`**
    - Defines the clip strength for the first LoRA configuration, influencing how prominently this particular LoRA setting will affect the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_name2`**
    - Specifies the second LoRA configuration name to be added to the list, allowing for the expansion of LoRA settings within the animation project.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias2`**
    - Provides an alias for the second LoRA configuration, facilitating easier identification and application of this set of LoRA settings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_strength_2`**
    - Determines the strength of the model's influence for the second LoRA configuration, contributing to the diversity of LoRA effects available for the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_strength_2`**
    - Defines the clip strength for the second LoRA configuration, adding another layer of LoRA effect to the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_name3`**
    - Specifies the third LoRA configuration name to be added to the list, further broadening the range of LoRA settings for the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias3`**
    - Provides an alias for the third LoRA configuration, simplifying the management and application of a wider range of LoRA settings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model_strength_3`**
    - Determines the strength of the model's influence for the third LoRA configuration, enhancing the animation with additional LoRA effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_strength_3`**
    - Defines the clip strength for the third LoRA configuration, contributing to the overall variety of LoRA settings in the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`lora_list`**
    - An existing list of LoRA configurations to which new settings can be added, enabling the dynamic management and application of multiple LoRA effects in the animation.
    - Comfy dtype: `lora_LIST`
    - Python dtype: `list`
## Output types
- **`LORA_LIST`**
    - Comfy dtype: `LORA_LIST`
    - A compiled list of LoRA configurations, including any newly added settings, ready for application in animation projects.
    - Python dtype: `list`
- **`show_text`**
    - Comfy dtype: `STRING`
    - A textual representation of the compiled LoRA configurations, providing an overview of the current LoRA settings for reference or documentation purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoRAList:
    
    @classmethod
    def INPUT_TYPES(cls):
    
        lora_files = ["None"] + folder_paths.get_filename_list("loras")
        
        return {"required": {                    
                    "lora_name1": (lora_files,),
                    "alias1": ("STRING", {"multiline": False, "default": ""}),                    
                    "model_strength_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_strength_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    
                    "lora_name2": (lora_files,),
                    "alias2": ("STRING", {"multiline": False, "default": ""}),
                    "model_strength_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_strength_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    
                    "lora_name3": (lora_files,),
                    "alias3": ("STRING", {"multiline": False, "default": ""}),                       
                    "model_strength_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_strength_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),  
                },
                "optional": {"lora_list": ("lora_LIST",)
                },
        }

    RETURN_TYPES = ("LORA_LIST", "STRING", )
    RETURN_NAMES = ("LORA_LIST", "show_text", )
    FUNCTION = "lora_list"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def lora_list(self, lora_name1, model_strength_1, clip_strength_1, alias1,
    lora_name2, model_strength_2, clip_strength_2, alias2,
    lora_name3, model_strength_3, clip_strength_3, alias3, lora_list=None):

        # Initialise the list
        loras = list()
        lora_text = list()
        
        # Extend the list for each lora in the stack
        if lora_list is not None:
            loras.extend([l for l in lora_list if l[0] != None]) #"None"
            lora_text += "\n".join(map(str, lora_list)) + "\n"
        
        if lora_name1 != "None":
            lora1_tup = [(alias1, lora_name1, model_strength_1, clip_strength_1)]
            loras.extend(lora1_tup),
            lora_text += "\n".join(map(str, lora1_tup)) + "\n"
            
        if lora_name2 != "None":
            lora2_tup = [(alias2, lora_name2, model_strength_2, clip_strength_2)]        
            loras.extend(lora2_tup),
            lora_text += "\n".join(map(str, lora2_tup)) + "\n"

        if lora_name3 != "None":
            lora3_tup = [(alias3, lora_name3, model_strength_3, clip_strength_3)]          
            loras.extend(lora3_tup),        
            lora_text += "\n".join(map(str, lora3_tup)) + "\n"
           
        #print(f"[DEBUG] CR Lora List: {lora_text}")

        show_text = "".join(lora_text)
            
        return (loras, show_text, )

```
