---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
- ModelSwitching
---

# CR Cycle Models (Legacy)
## Documentation
- Class name: `CR Cycle Models`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to cycle through different models sequentially or maintain a single model based on the specified mode. It facilitates dynamic model switching during animation sequences, enhancing the versatility and creativity of the animation process.
## Input types
### Required
- **`mode`**
    - Specifies the cycling mode, such as 'Off' for no cycling or 'Sequential' for cycling through models based on the current frame and interval settings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - The initial model to be used before any cycling occurs. It serves as the default model when the cycling mode is set to 'Off'.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The initial CLIP model to be used alongside the main model, providing additional capabilities or enhancements.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`model_list`**
    - A list of models to cycle through, each defined by its parameters including model alias and checkpoint name.
    - Comfy dtype: `MODEL_LIST`
    - Python dtype: `List[Tuple[str, str]]`
- **`frame_interval`**
    - The interval between frames at which the model cycling occurs, determining the frequency of model switches.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - The number of times the model list is repeated, extending the sequence of models available for cycling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number in the animation sequence, used to determine the active model based on the cycling mode and frame interval.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The current model after cycling, which may be different from the initial model depending on the cycling mode and frame progress.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The current CLIP model after cycling, which may be different from the initial CLIP model depending on the cycling mode and frame progress.
    - Python dtype: `torch.nn.Module`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The current VAE model after cycling, which may be different from the initial VAE model depending on the cycling mode and frame progress.
    - Python dtype: `torch.nn.Module`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A help URL providing additional information about the cycling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleModels:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Off", "Sequential"]

        return {"required": {"mode": (modes,),
                             "model": ("MODEL",),
                             "clip": ("CLIP",),
                             "model_list": ("MODEL_LIST",),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),        
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "show_help", )
    FUNCTION = "cycle_models"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle_models(self, mode, model, clip, model_list, frame_interval, loops, current_frame,):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-models"

        # Initialize the list
        model_params = list()

        # Extend lora_params with the lora_list items
        if model_list:
            for _ in range(loops):
                model_params.extend(model_list)
            #print(f"[Debug] CR Cycle Models:{model_params}")
                
        if mode == "Off":
            return (model, clip, show_help, )               

        elif mode == "Sequential":
            if current_frame == 0:
                return (model, clip, show_help, ) 
            else:    
                # Calculate the index of the current model based on the current_frame and frame_interval
                current_model_index = (current_frame // frame_interval) % len(model_params)
                #print(f"[Debug] CR Cycle Models:{current_model_index}")
                
                # Get the parameters of the current model
                current_model_params = model_params[current_model_index]
                model_alias, ckpt_name = current_model_params
                print(f"[Info] CR Cycle Models: Current model is {ckpt_name}")
                
                # Load the current model
                ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
                out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, 
                embedding_directory=folder_paths.get_folder_paths("embeddings"))
                return (out, show_help, )
        #else:
        #    return (model, clip) 

```
