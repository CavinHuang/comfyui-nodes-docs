---
tags:
- ModelMerge
---

# ⛏️ CR Apply Model Merge
## Documentation
- Class name: `CR Apply Model Merge`
- Category: `🧩 Comfyroll Studio/✨ Essential/⛏️ Model Merge`
- Output node: `False`

This node is designed to merge multiple models and CLIPs based on specified ratios, normalization settings, and merge methods. It supports weighted merging and normalization of ratios to ensure the combined model accurately reflects the desired blend of input models.
## Input types
### Required
- **`model_stack`**
    - A stack of models to be merged, each accompanied by model and CLIP ratios. It's crucial for determining the composition of the final merged model.
    - Comfy dtype: `MODEL_STACK`
    - Python dtype: `List[Tuple[str, float, float]]`
- **`merge_method`**
    - Specifies the method used for merging models, such as weighted merging, affecting how input models are combined.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalise_ratios`**
    - Indicates whether the ratios of models and CLIPs should be normalized, ensuring their sum equals 1 for a balanced merge.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_factor`**
    - A factor used in weighted merging to adjust the influence of each model in the final merge.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The final merged model resulting from the combination of input models according to specified methods and ratios.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The final merged CLIP model resulting from the combination of input CLIP models according to specified methods and ratios.
    - Python dtype: `torch.nn.Module`
- **`model_mix_info`**
    - Comfy dtype: `STRING`
    - Information about the merged models, including names, ratios, and any normalization or weighting adjustments applied.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation on how to use the node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [LoraLoader|pysssss](../../ComfyUI-Custom-Scripts/Nodes/LoraLoader|pysssss.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)
    - [Display Any (rgthree)](../../rgthree-comfy/Nodes/Display Any (rgthree).md)



## Source code
```python
class CR_ApplyModelMerge:

    @classmethod
    def INPUT_TYPES(s):
    
        merge_methods = ["Recursive", "Weighted"]
        
        return {"required": {"model_stack": ("MODEL_STACK",),
                             "merge_method": (merge_methods,),
                             "normalise_ratios": (["Yes","No"],),
                             "weight_factor":("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                            }
        }
        
    RETURN_TYPES = ("MODEL", "CLIP", "STRING", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "model_mix_info", "show_help", )
    FUNCTION = "merge"
    CATEGORY = icons.get("Comfyroll/Model Merge")

    def merge(self, model_stack, merge_method, normalise_ratios, weight_factor):
    
        # Initialise
        sum_clip_ratio = 0
        sum_model_ratio = 0
        model_mix_info = str("Merge Info:\n")
             
        # If no models
        if len(model_stack) == 0:
            print(f"[Warning] Apply Model Merge: No active models selected in the model merge stack")
            return()

        # If only one model
        if len(model_stack) == 1:
            print(f"[Warning] Apply Model Merge: Only one active model found in the model merge stack. At least 2 models are normally needed for merging. The active model will be output.")
            model_name, model_ratio, clip_ratio = model_stack[0]
            ckpt_path = folder_paths.get_full_path("checkpoints", model_name)
            return comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        
        # Calculate ratio sums for normalisation        
        for i, model_tuple in enumerate(model_stack):
            model_name, model_ratio, clip_ratio = model_tuple
            sum_model_ratio += model_ratio                
            sum_clip_ratio += clip_ratio
   
        # Do recursive merge loops
        model_mix_info = model_mix_info + "Ratios are applied using the Recursive method\n\n"
        
        # Loop through the models and compile the merged model
        for i, model_tuple in enumerate(model_stack):
            model_name, model_ratio, clip_ratio = model_tuple
            ckpt_path = folder_paths.get_full_path("checkpoints", model_name)
            merge_model = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
            print(f"Apply Model Merge: Model Name {model_name}, Model Ratio {model_ratio}, CLIP Ratio {clip_ratio}")

            if sum_model_ratio != 1 and normalise_ratios == "Yes":
                print(f"[Warning] Apply Model Merge: Sum of model ratios != 1. Ratios will be normalised")
                # Normalise the ratios  
                model_ratio = round(model_ratio / sum_model_ratio, 2)
                clip_ratio = round(clip_ratio / sum_clip_ratio, 2)
            
            # Weighted merge method
            if merge_method == "Weighted":
                if i == 1:
                    # Reassign extra weight to the second model
                    model_ratio = 1 - weight_factor + (weight_factor * model_ratio)
                    clip_ratio = 1 - weight_factor + (weight_factor * clip_ratio)
                      
            #Clone the first model
            if i == 0: 
                model1 = merge_model[0].clone()
                clip1 = merge_model[1].clone()
                
                model_mix_info = model_mix_info + "Base Model Name: " + model_name
            else:
                # Merge next model
                # Comfy merge logic is flipped for stacked nodes. This is because the first model is effectively model1 and all subsequent models are model2. 
                model2 = merge_model[0].clone()
                kp = model2.get_key_patches("diffusion_model.")
                for k in kp:
                    #model1.add_patches({k: kp[k]}, 1.0 - model_ratio, model_ratio) #original logic
                    model1.add_patches({k: kp[k]}, model_ratio, 1.0 - model_ratio) #flipped logic
                # Merge next clip
                clip2 = merge_model[1].clone()          
                kp = clip2.get_key_patches()
                for k in kp:
                    if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                        continue
                    #clip1.add_patches({k: kp[k]}, 1.0 - clip_ratio, clip_ratio) #original logic
                    clip1.add_patches({k: kp[k]}, clip_ratio, 1.0 - clip_ratio) #flipped logic
            
            # Update model info                
                model_mix_info = model_mix_info + "\nModel Name: " + model_name + "\nModel Ratio: " + str(model_ratio) + "\nCLIP Ratio: " + str(clip_ratio) + "\n"

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Model-Merge-Nodes#cr-apply-model-merge"
                
        return (model1, clip1, model_mix_info, show_help, )

```
