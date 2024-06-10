---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
- ModelSwitching
---

# 📑 CR Load Scheduled Models
## Documentation
- Class name: `CR Load Scheduled Models`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

This node is designed to dynamically load and switch between different models based on a predefined schedule for animation frames. It facilitates the use of various models at specific points in an animation sequence, enhancing the flexibility and diversity of the generated content.
## Input types
### Required
- **`mode`**
    - Specifies the operational mode of the node, which determines how models are loaded and switched during the animation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_frame`**
    - Indicates the current frame number in the animation sequence, used to determine the appropriate model to load based on the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`schedule_alias`**
    - Serves as an identifier to match the schedule with the correct model, enabling the dynamic loading of models as per the animation frame requirements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`default_model`**
    - The default model to be used when no specific model is scheduled for the current frame.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`schedule_format`**
    - Defines the format of the schedule, which influences how the schedule is interpreted and applied to model loading.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`model_list`**
    - A list of models available for scheduling. This allows for the selection of different models to be loaded at specified frames.
    - Comfy dtype: `MODEL_LIST`
    - Python dtype: `list[str]`
- **`schedule`**
    - Defines the timing and model selection for each frame in the animation, dictating which model to load at any given point.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model loaded as per the current frame and schedule.
    - Python dtype: `object`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model loaded, if specified in the schedule.
    - Python dtype: `object`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model loaded, if specified in the schedule.
    - Python dtype: `object`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides help or guidance related to the scheduling and model loading process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadScheduledModels:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Load default Model", "Schedule"]

        return {"required": {"mode": (modes,),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "schedule_alias": ("STRING", {"default": "", "multiline": False}),
                             "default_model": (folder_paths.get_filename_list("checkpoints"), ), 
                             "schedule_format": (["CR", "Deforum"],)
                },
                "optional": {"model_list": ("MODEL_LIST",),
                            "schedule": ("SCHEDULE",) 
                },                
        }
 
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "show_help", )
    FUNCTION = "schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def schedule(self, mode, current_frame, schedule_alias, default_model, schedule_format, model_list=None, schedule=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-load-scheduled-models"

        #model_name = ""
    
        # Load default Model mode
        if mode == "Load default Model":
            ckpt_path = folder_paths.get_full_path("checkpoints", default_model)
            out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
            print(f"[Debug] CR Load Scheduled Models. Loading default model.")    
            return (out[:3], show_help, )
        
        # Get params
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        
        # Handle case where there is no schedule line for a frame 
        if params == "":
            print(f"[Warning] CR Load Scheduled Models. No model specified in schedule for frame {current_frame}. Using default model.")
            ckpt_path = folder_paths.get_full_path("checkpoints", default_model)
            out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
            return (out[:3], show_help, )
        else:
            # Try the params
            try:
                model_alias = str(params)
            except ValueError:
                print(f"[Warning] CR Load Scheduled Models. Invalid params: {params}")
                return()                    

        # Iterate through the model list to get the model name
        for ckpt_alias, ckpt_name in model_list:
            if ckpt_alias == model_alias:
                model_name = ckpt_name
                break  # Exit the loop early once a match is found, ignores any duplicate matches
                
        # Check if a matching model has been found        
        if model_name == "":
            print(f"[Info] CR Load Scheduled Models. No model alias match found for {model_alias}. Frame {current_frame} will produce an error.")
            return()
        else:
            print(f"[Info] CR Load Scheduled Models. Model alias {model_alias} matched to {model_name}")
        
        # Load the new model
        ckpt_path = folder_paths.get_full_path("checkpoints", model_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        print(f"[Info] CR Load Scheduled Models. Loading new checkpoint model {model_name}")
        return (out[:3], show_help, )

```
