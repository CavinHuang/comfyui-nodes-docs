---
tags:
- LoRA
---

# 💊 CR Apply LoRA Stack
## Documentation
- Class name: `CR Apply LoRA Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/💊 LoRA`
- Output node: `False`

The CR_ApplyLoRAStack node is designed to apply a stack of LoRA (Low-Rank Adaptation) modifications to a given model and clip, enhancing or altering their functionalities based on the specified LoRA parameters. It allows for dynamic customization of models through LoRA, facilitating fine-tuned adjustments and optimizations.
## Input types
### Required
- **`model`**
    - The model to which the LoRA modifications will be applied. It serves as the base for the adaptations, determining the initial state before any LoRA adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip to which the LoRA modifications will be applied, alongside the model. It represents another aspect of the system that can be adjusted using LoRA parameters for enhanced performance or functionality.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_stack`**
    - A list of LoRA modifications to be applied to the model and clip. Each item in the list specifies a LoRA modification, including its name and the strength of its application to the model and clip.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `List[Tuple[str, float, float]]`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model after the application of the LoRA stack, potentially altered or enhanced by the specified LoRA modifications.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The clip after the application of the LoRA stack, potentially altered or enhanced alongside the model by the specified LoRA modifications.
    - Python dtype: `torch.nn.Module`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR_ApplyLoRAStack node and its functionalities.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ApplyLoRAStack:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"model": ("MODEL",),
                            "clip": ("CLIP", ),
                            "lora_stack": ("LORA_STACK", ),
                            }
        }

    RETURN_TYPES = ("MODEL", "CLIP", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "show_help", )
    FUNCTION = "apply_lora_stack"
    CATEGORY = icons.get("Comfyroll/LoRA")

    def apply_lora_stack(self, model, clip, lora_stack=None,):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-apply-lora-stack"

        # Initialise the list
        lora_params = list()
 
        # Extend lora_params with lora-stack items 
        if lora_stack:
            lora_params.extend(lora_stack)
        else:
            return (model, clip, show_help,)

        # Initialise the model and clip
        model_lora = model
        clip_lora = clip

        # Loop through the list
        for tup in lora_params:
            lora_name, strength_model, strength_clip = tup
            
            lora_path = folder_paths.get_full_path("loras", lora_name)
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            
            model_lora, clip_lora = comfy.sd.load_lora_for_models(model_lora, clip_lora, lora, strength_model, strength_clip)  

        return (model_lora, clip_lora, show_help,)

```
