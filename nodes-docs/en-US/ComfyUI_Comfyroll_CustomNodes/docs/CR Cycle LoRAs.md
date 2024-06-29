---
tags:
- LoRA
---

# CR Cycle LoRAs (Legacy)
## Documentation
- Class name: `CR Cycle LoRAs`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to cycle through a predefined list of LoRA (Low-Rank Adaptation) parameters sequentially or based on a schedule, applying them to a model and clip at specified intervals. It enables dynamic modification of model behaviors over time or frames, enhancing the versatility and customization of generative processes.
## Input types
### Required
- **`mode`**
    - The 'mode' input determines the cycling strategy for applying LoRA parameters, either sequentially or based on a specific schedule, influencing the dynamic adaptation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - The 'model' input represents the generative model to which the LoRA parameters will be applied, serving as a base for modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The 'clip' input signifies the CLIP model that will be modified alongside the generative model, using the specified LoRA parameters.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_list`**
    - The 'lora_list' input contains the predefined list of LoRA parameters to cycle through, dictating the specific adaptations to apply.
    - Comfy dtype: `LORA_LIST`
    - Python dtype: `List[Tuple[str, str, float, float]]`
- **`frame_interval`**
    - The 'frame_interval' input specifies the interval between each LoRA parameter application, controlling the pace of modifications.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - The 'loops' input indicates the number of times the cycling process should repeat, affecting the overall duration of the adaptation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The 'current_frame' input is used to determine the current position in the cycling schedule, guiding the selection of LoRA parameters.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The 'MODEL' output refers to the modified generative model after the application of the current LoRA parameters.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The 'CLIP' output signifies the modified CLIP model after the application of the current LoRA parameters.
    - Python dtype: `torch.nn.Module`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output provides a URL to documentation or further information regarding the applied LoRA parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleLoRAs:

    @classmethod
    def INPUT_TYPES(s):
        
        modes = ["Off", "Sequential"]
    
        return {"required": {"mode": (modes,),
                             "model": ("MODEL",),
                             "clip": ("CLIP",),
                             "lora_list": ("LORA_LIST",),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),                             
                },
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "show_help", )
    FUNCTION = "cycle"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle(self, mode, model, clip, lora_list, frame_interval, loops, current_frame):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-loras"

        # Initialize the list
        lora_params = list()

        # Extend lora_params with lora_list items
        if lora_list:
            for _ in range(loops):
                lora_params.extend(lora_list)
            #print(f"[Debug] CR Cycle LoRAs:{lora_params}")            
        else:
            return (model, clip, show_help, )

        if mode == "Sequential":
            # Calculate the index of the current LoRA based on the current_frame and frame_interval
            current_lora_index = (current_frame // frame_interval) % len(lora_params)
            #print(f"[Debug] CR Cycle LoRAs:{current_lora_index}")
            
            # Get the parameters of the current LoRA
            current_lora_params = lora_params[current_lora_index]
            lora_alias, lora_name, model_strength, clip_strength = current_lora_params
            
            # Load the current LoRA
            lora_path = folder_paths.get_full_path("loras", lora_name)
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            print(f"[Info] CR_CycleLoRAs: Current LoRA is {lora_name}")

            # Apply the current LoRA to the model and clip
            model_lora, clip_lora = comfy.sd.load_lora_for_models(
            model, clip, lora, model_strength, clip_strength)
            return (model_lora, clip_lora, show_help, )
        else:
            return (model, clip, show_help, )

```
