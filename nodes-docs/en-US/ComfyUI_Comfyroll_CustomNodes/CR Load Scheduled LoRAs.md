---
tags:
- LoRA
---

# 📑 CR Load Scheduled LoRAs
## Documentation
- Class name: `CR Load Scheduled LoRAs`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

This node is designed to dynamically load and apply LoRA (Low-Rank Adaptation) configurations based on a predefined schedule. It supports loading specific LoRAs for given frames, handling default LoRA settings, and operating in different modes such as 'Off' or 'Load default LoRA'. The node aims to enhance model performance or behavior for animation or image generation tasks by adjusting model and clip strengths according to the scheduled LoRA parameters.
## Input types
### Required
- **`mode`**
    - Specifies the operational mode of the node, which can include 'Off', 'Load default LoRA', or dynamically loading LoRAs based on a schedule. This affects how and whether LoRAs are applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - The model to which the LoRA adjustments will be applied. It is a core component of the node's functionality.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`clip`**
    - The clip to which the LoRA adjustments will be applied, alongside the model.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`current_frame`**
    - The current frame number for which the node is determining which LoRA, if any, to apply. This is crucial for dynamic LoRA loading based on the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`schedule_alias`**
    - An alias for the schedule, potentially used for identifying or categorizing the schedule in a more human-readable form.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`default_lora`**
    - Specifies the default LoRA to be used when no specific LoRA is scheduled for the current frame or when operating in 'Load default LoRA' mode.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - The strength parameter for the model when loading the default LoRA or a scheduled LoRA. It influences the intensity of the applied LoRA on the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - The strength parameter for the clip when loading the default LoRA or a scheduled LoRA. It influences the intensity of the applied LoRA on the clip.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`schedule_format`**
    - Defines the format of the schedule used for loading LoRAs. It can vary, affecting how the schedule is interpreted and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`lora_list`**
    - A list of available LoRAs that can be scheduled. It provides the node with options for dynamic LoRA loading.
    - Comfy dtype: `LORA_LIST`
    - Python dtype: `list`
- **`schedule`**
    - The schedule detailing which LoRA to load at specific frames. It is used when the node is in a mode that requires dynamic LoRA loading based on frame numbers.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model after potentially being modified by the application of a LoRA, based on the node's operational mode and schedule.
    - Python dtype: `object`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The clip after potentially being modified by the application of a LoRA, based on the node's operational mode and schedule.
    - Python dtype: `object`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing help or documentation related to the node's functionality and usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadScheduledLoRAs:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Off", "Load default LoRA", "Schedule"]

        return {"required": {"mode": (modes,),
                             "model": ("MODEL",),
                             "clip": ("CLIP", ),        
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "schedule_alias": ("STRING", {"default": "", "multiline": False}),
                             "default_lora": (folder_paths.get_filename_list("loras"), ),
                             "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),                      
                             "schedule_format": (["CR", "Deforum"],)
                },
                "optional": {"lora_list": ("LORA_LIST",), 
                            "schedule": ("SCHEDULE",) 
                },                
        }
 
    RETURN_TYPES = ("MODEL", "CLIP", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "show_help", )
    FUNCTION = "schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def schedule(self, mode, model, clip, current_frame, schedule_alias, default_lora, strength_model, strength_clip, schedule_format, lora_list=None, schedule=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-load-scheduled-loras"
        #lora_name = ""

        # Off mode
        if mode == "Off":
            print(f"[Info] CR Load Scheduled LoRAs. Disabled.")    
            return (model, clip, show_help, ) 
    
        # Load Default LoRA mode
        if mode == "Load default LoRA":
            if default_lora == None:
                return (model, clip, show_help, )
            if strength_model == 0 and strength_clip == 0:
                return (model, clip, show_help, )                   
            model, clip = LoraLoader().load_lora(model, clip, default_lora, strength_model, strength_clip)  
            print(f"[Info] CR Load Scheduled LoRAs. Loading default LoRA {lora_name}.")    
            return (model, clip, show_help, )           
        
        # Get params
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        
        # Handle case where there is no schedule line for a frame 
        if params == "":
            print(f"[Warning] CR Load Scheduled LoRAs. No LoRA specified in schedule for frame {current_frame}. Using default lora.")
            if default_lora != None:
                model, clip = LoraLoader().load_lora(model, clip, default_lora, strength_model, strength_clip)
            return (model, clip, show_help, )      
        else:
            # Unpack the parameters
            parts = params.split(',')
            if len(parts) == 3:
                s_lora_alias = parts[0].strip()
                s_strength_model = float(parts[1].strip())
                s_strength_clip = float(parts[1].strip())    
            else:
                print(f"[Warning] CR Simple Value Scheduler. Skipped invalid line: {line}")
                return()

        # Iterate through the LoRA list to get the LoRA name
        for l_lora_alias, l_lora_name, l_strength_model, l_strength_clip in lora_list:
            print(l_lora_alias, l_lora_name, l_strength_model, l_strength_clip)
            if l_lora_alias == s_lora_alias:
                print(f"[Info] CR Load Scheduled LoRAs. LoRA alias match found for {s_lora_alias}")
                lora_name = l_lora_name
                break  # Exit the loop early once a match is found, ignores any duplicate matches
    
        # Check if a matching LoRA has been found        
        if lora_name == "":
            print(f"[Info] CR Load Scheduled LoRAs. No LoRA alias match found for {s_lora_alias}. Frame {current_frame}.")
            return()
        else:
            print(f"[Info] CR Load Scheduled LoRAs. LoRA {lora_name}")
            
        # Load the new LoRA
        model, clip = LoraLoader().load_lora(model, clip, lora_name, s_strength_model, s_strength_clip)
        print(f"[Debug] CR Load Scheduled LoRAs. Loading new LoRA {lora_name}")
        return (model, clip, show_help, )

```
