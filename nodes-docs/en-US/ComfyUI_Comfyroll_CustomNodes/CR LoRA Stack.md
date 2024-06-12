---
tags:
- LoRA
---

# 💊 CR LoRA Stack
## Documentation
- Class name: `CR LoRA Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/💊 LoRA`
- Output node: `False`

The CR LoRA Stack node is designed to create and manage a stack of LoRA (Low-Rank Adaptation) modifications for models. It allows for the sequential application of multiple LoRA modifications to a model, enabling fine-tuned adjustments to model behavior and performance.
## Input types
### Required
- **`switch_1`**
    - Controls whether the first LoRA modification is applied. This switch enables selective application of modifications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name_1`**
    - Specifies the first LoRA modification to be applied. It is crucial for defining the initial step in the sequence of LoRA adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_weight_1`**
    - Determines the weight of the first LoRA modification on the model. This weight influences the extent of the modification's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_1`**
    - Sets the weight of the first LoRA modification on the clip. This weight affects how significantly the clip is modified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_2`**
    - Controls the application of the second LoRA modification, offering more granular control over the adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name_2`**
    - Specifies the second LoRA modification in the sequence. It allows for further customization following the initial modification.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_weight_2`**
    - Determines the weight of the second LoRA modification on the model, further adjusting its behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_2`**
    - Sets the weight of the second LoRA modification on the clip, modifying its characteristics further.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_3`**
    - Enables or disables the third LoRA modification, providing ultimate control over the stack.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name_3`**
    - Defines the third LoRA modification in the stack, extending the customization capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_weight_3`**
    - Specifies the weight of the third LoRA modification on the model, allowing for additional fine-tuning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_3`**
    - Determines the weight of the third LoRA modification on the clip, further influencing its output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`lora_stack`**
    - Allows for the inclusion of an existing LoRA stack to be extended with new modifications. This parameter facilitates the building of complex LoRA sequences.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `list`
## Output types
- **`LORA_STACK`**
    - Comfy dtype: `LORA_STACK`
    - Returns the compiled list of LoRA modifications, ready for application to a model and clip.
    - Python dtype: `list`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to documentation or help related to the LoRA stack node, assisting users in understanding its use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [CR LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR LoRA Stack.md)



## Source code
```python
class CR_LoRAStack:

    @classmethod
    def INPUT_TYPES(cls):
    
        loras = ["None"] + folder_paths.get_filename_list("loras")
        
        return {"required": {
                    "switch_1": (["Off","On"],),
                    "lora_name_1": (loras,),
                    "model_weight_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "switch_2": (["Off","On"],),
                    "lora_name_2": (loras,),
                    "model_weight_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "switch_3": (["Off","On"],),
                    "lora_name_3": (loras,),
                    "model_weight_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                },
                "optional": {"lora_stack": ("LORA_STACK",)
                },
        }

    RETURN_TYPES = ("LORA_STACK", "STRING", )
    RETURN_NAMES = ("LORA_STACK", "show_help", )
    FUNCTION = "lora_stacker"
    CATEGORY = icons.get("Comfyroll/LoRA")

    def lora_stacker(self, lora_name_1, model_weight_1, clip_weight_1, switch_1, lora_name_2, model_weight_2, clip_weight_2, switch_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, lora_stack=None):

        # Initialise the list
        lora_list=list()
        
        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != "None"])
        
        if lora_name_1 != "None" and  switch_1 == "On":
            lora_list.extend([(lora_name_1, model_weight_1, clip_weight_1)]),

        if lora_name_2 != "None" and  switch_2 == "On":
            lora_list.extend([(lora_name_2, model_weight_2, clip_weight_2)]),

        if lora_name_3 != "None" and  switch_3 == "On":
            lora_list.extend([(lora_name_3, model_weight_3, clip_weight_3)]),
           
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-lora-stack"           

        return (lora_list, show_help, )

```
