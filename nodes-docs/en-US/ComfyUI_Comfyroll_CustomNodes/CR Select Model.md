---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
- ModelSwitching
---

# 🔮 CR Select Model
## Documentation
- Class name: `CR Select Model`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

The CR Select Model node is designed to select and load a specific model based on user input. It facilitates the dynamic selection of models from a predefined list, enabling users to switch between different models for their generative tasks.
## Input types
### Required
- **`ckpt_name1`**
    - Represents the first checkpoint name option for model selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name2`**
    - Represents the second checkpoint name option for model selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name3`**
    - Represents the third checkpoint name option for model selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name4`**
    - Represents the fourth checkpoint name option for model selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name5`**
    - Represents the fifth checkpoint name option for model selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`select_model`**
    - An integer input that determines which model checkpoint to load from the given options.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - unknown
    - Python dtype: `unknown`
- **`VAE`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`ckpt_name`**
    - Comfy dtype: `STRING`
    - The name of the selected model.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [Anything Everywhere3](../../cg-use-everywhere/Nodes/Anything Everywhere3.md)



## Source code
```python
class CR_SelectModel:
    
    @classmethod
    def INPUT_TYPES(cls):
    
        checkpoint_files = ["None"] + folder_paths.get_filename_list("checkpoints")
        
        return {"required": {"ckpt_name1": (checkpoint_files,),
                             "ckpt_name2": (checkpoint_files,),
                             "ckpt_name3": (checkpoint_files,),
                             "ckpt_name4": (checkpoint_files,),
                             "ckpt_name5": (checkpoint_files,),
                             "select_model": ("INT", {"default": 1, "min": 1, "max": 5}),
                            }    
               }


    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "STRING", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "VAE", "ckpt_name", "show_help", )
    FUNCTION = "select_model"
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def select_model(self, ckpt_name1, ckpt_name2, ckpt_name3, ckpt_name4, ckpt_name5, select_model):
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-select-model"
    
        # Initialise the list
        model_list = list()
    
        if select_model == 1:
            model_name = ckpt_name1
        elif select_model == 2:
            model_name = ckpt_name2
        elif select_model == 3:
            model_name = ckpt_name3
        elif select_model == 4:
            model_name = ckpt_name4
        elif select_model == 5:
            model_name = ckpt_name5
            
        if  model_name == "None":
            print(f"CR Select Model: No model selected")
            return()

        ckpt_path = folder_paths.get_full_path("checkpoints", model_name)
        model, clip, vae, clipvision = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True,
                                                     embedding_directory=folder_paths.get_folder_paths("embeddings"))
            
        return (model, clip, vae, model_name, show_help, )

```
