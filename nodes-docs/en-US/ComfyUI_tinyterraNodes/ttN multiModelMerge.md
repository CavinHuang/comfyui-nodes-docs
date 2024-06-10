---
tags:
- ModelMerge
---

# multiModelMerge
## Documentation
- Class name: `ttN multiModelMerge`
- Category: `ttN`
- Output node: `False`

The node `ttN_multiModelMerge` is designed to facilitate the merging of multiple models and/or CLIP models based on specified configurations and interpolation ratios. It abstracts the complexities involved in model merging, allowing for flexible integration and manipulation of model attributes to achieve desired outcomes.
## Input types
### Required
- **`ckpt_A_name`**
    - This parameter specifies the name of the first checkpoint file to be merged. It is crucial for identifying the primary model whose attributes will be combined with another model. The choice of checkpoint directly influences the base characteristics of the merged model, impacting its performance and capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`config_A_name`**
    - This parameter indicates the configuration name associated with the first model. It plays a key role in determining how the model's attributes are to be merged and manipulated. The configuration settings define the operational parameters of the model, affecting the merging process's outcome by dictating how attributes are integrated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_B_name`**
    - This parameter specifies the name of the second checkpoint file to be merged. It serves as the secondary source of model attributes that will be integrated into the primary model. The selection of this checkpoint influences the additional capabilities and features that will be added to the merged model, shaping its final form.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`config_B_name`**
    - This parameter indicates the configuration name associated with the second model. It is essential for guiding the merging process and ensuring the desired outcome is achieved. The configuration details provide a blueprint for how the second model's attributes are to be combined with the first, affecting the merged model's functionality and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_C_name`**
    - Specifies the name of the third checkpoint file, if applicable, for merging additional model attributes. Including a third model can introduce new features or capabilities, further enhancing the merged model's complexity and utility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`config_C_name`**
    - Indicates the configuration name for the third model, guiding its integration into the merge process. The configuration of the third model dictates how its attributes are to be merged, potentially introducing new functionalities or enhancing existing ones in the combined model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_interpolation`**
    - Determines the interpolation ratio for merging model attributes, allowing for fine-tuned control over the merge outcome. This ratio balances the influence of each model's attributes in the final merged model, enabling precise customization of the resulting model's characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`model_multiplier`**
    - A multiplier affecting the strength of the second model's attributes in the merge. This parameter allows for adjusting the dominance of the second model's features in the merged model, enabling a tailored approach to model integration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_interpolation`**
    - Specifies the interpolation ratio for merging CLIP model attributes, enabling precise control over their integration. This ratio determines the balance between the CLIP models' features in the merged output, allowing for customized adjustments to the final CLIP model's capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`clip_multiplier`**
    - Affects the strength of the second CLIP model's attributes in the merge. Adjusting this multiplier enables the fine-tuning of how the second CLIP model's features are represented in the merged model, offering control over the integration process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`save_model`**
    - A boolean indicating whether the merged model should be saved to disk. Choosing to save the model affects the workflow by providing a tangible output that can be used in subsequent processes or for further analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`save_prefix`**
    - The prefix for the filename when saving the merged model, providing a means to organize and identify saved models. This parameter influences the ease of model management and retrieval, affecting how the merged models are cataloged and accessed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model_A_override`**
    - Allows for overriding specific attributes of the first model, offering customization of the merge process. This capability enables the modification of the base model's characteristics, allowing for a more tailored merged model that meets specific requirements.
    - Comfy dtype: `MODEL`
    - Python dtype: `bool`
- **`model_B_override`**
    - Enables overriding attributes of the second model, further customizing the merge. This feature provides the flexibility to alter the second model's contribution to the merged model, enabling adjustments to achieve the desired outcome.
    - Comfy dtype: `MODEL`
    - Python dtype: `bool`
- **`model_C_override`**
    - Permits the overriding of attributes for the third model, if present, tailoring the merge to specific needs. This option allows for the customization of the third model's influence on the merged model, facilitating a more precise integration of model attributes.
    - Comfy dtype: `MODEL`
    - Python dtype: `bool`
- **`clip_A_override`**
    - Allows for specific attributes of the first CLIP model to be overridden, customizing the integration. This flexibility enables adjustments to the first CLIP model's contribution to the merged CLIP model, allowing for a tailored approach to merging CLIP attributes.
    - Comfy dtype: `CLIP`
    - Python dtype: `bool`
- **`clip_B_override`**
    - Enables overriding attributes of the second CLIP model, allowing for tailored integration. This option offers the ability to modify how the second CLIP model's features are incorporated into the merged model, providing control over the final CLIP model's characteristics.
    - Comfy dtype: `CLIP`
    - Python dtype: `bool`
- **`clip_C_override`**
    - Permits overriding attributes of the third CLIP model, if used, for customized integration. This feature allows for the precise adjustment of the third CLIP model's influence on the merged model, enabling a more customized approach to CLIP model merging.
    - Comfy dtype: `CLIP`
    - Python dtype: `bool`
- **`optional_vae`**
    - Specifies whether an optional VAE model is included in the merge, adding to the flexibility of the process. Including a VAE model can introduce additional capabilities or enhance the merged model's performance, offering further customization options.
    - Comfy dtype: `VAE`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting model after merging the specified models with the given ratio. It embodies the combined characteristics and capabilities of both input models.
    - Python dtype: `comfy.model_base.Model`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The resulting CLIP model after merging, if applicable. It represents the integrated features and functionalities from the input CLIP models.
    - Python dtype: `comfy.model_base.CLIP`
- **`vae`**
    - Comfy dtype: `VAE`
    - The resulting VAE model after merging, if applicable. It signifies the amalgamation of VAE model attributes from the input models.
    - Python dtype: `comfy.model_base.VAE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_multiModelMerge:
    version = '1.0.1'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "ckpt_A_name": (folder_paths.get_filename_list("checkpoints"), ),
                    "config_A_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                    "ckpt_B_name": (["None",] + folder_paths.get_filename_list("checkpoints"), ),
                    "config_B_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                    "ckpt_C_name": (["None",] + folder_paths.get_filename_list("checkpoints"), ),
                    "config_C_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),

                    "model_interpolation": (MODEL_INTERPOLATIONS,),
                    "model_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    
                    "clip_interpolation": (CLIP_INTERPOLATIONS,),
                    "clip_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),

                    "save_model": (["True", "False"],{"default": "False"}),
                    "save_prefix": ("STRING", {"default": "checkpoints/ComfyUI"}),
                },
                "optional": {
                    "model_A_override": ("MODEL",),
                    "model_B_override": ("MODEL",),
                    "model_C_override": ("MODEL",),
                    "clip_A_override": ("CLIP",),
                    "clip_B_override": ("CLIP",),
                    "clip_C_override": ("CLIP",),
                    "optional_vae": ("VAE",),
                },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "ttNnodeVersion": ttN_multiModelMerge.version, "my_unique_id": "UNIQUE_ID"},
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "VAE",)
    RETURN_NAMES = ("model", "clip", "vae",)
    FUNCTION = "mergificate"

    CATEGORY = "ttN"

    def mergificate(self, ckpt_A_name, config_A_name, ckpt_B_name, config_B_name, ckpt_C_name, config_C_name,
                model_interpolation, model_multiplier, clip_interpolation, clip_multiplier, save_model, save_prefix,
                model_A_override=None, model_B_override=None, model_C_override=None,
                clip_A_override=None, clip_B_override=None, clip_C_override=None,
                optional_vae=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        
        def required_assets(model_interpolation, clip_interpolation):
            required = set(["model_A"])
            
            if clip_interpolation in [A_ONLY, B_ONLY, C_ONLY]:
                required.add(f"clip_{clip_interpolation[0]}")
            elif clip_interpolation in [WEIGHTED_SUM, ADD_DIFFERENCE]:
                required.update([f"clip_{letter}" for letter in ABC if letter in clip_interpolation])
            elif clip_interpolation == FOLLOW:
                required.add("clip_A")
            
            if model_interpolation in [WEIGHTED_SUM, ADD_DIFFERENCE]:
                letters = [letter for letter in ABC if letter in model_interpolation]
                required.update([f"model_{letter}" for letter in letters])
                if clip_interpolation == FOLLOW:
                    required.update([f"clip_{letter}" for letter in letters])
            
            return sorted(list(required))

        def _collect_letter(letter, required_list, model_override, clip_override, ckpt_name, config_name = None):
            model, clip, loaded_clip = None, None, None
            config_name = config_name
            
            if f'model_{letter}' in required_list:
                if model_override not in [None, "None"]:
                    model = model_override
                else:
                    if ckpt_name not in [None, "None"]:
                        model, loaded_clip, _ = loader.load_checkpoint(ckpt_name, config_name)
                    else:
                        e = f"Checkpoint name or model override not provided for model_{letter}.\nUnable to merge models using the following interpolation: {model_interpolation}"
                        ttNl(e).t(f'multiModelMerge [{my_unique_id}]').error().p().interrupt(e)


            
            if f'clip_{letter}' in required_list:
                if clip_override is not None:
                    clip = clip_override
                elif loaded_clip is not None:
                    clip = loaded_clip
                elif ckpt_name not in [None, "None"]:
                    _, clip, _ = loader.load_checkpoint(ckpt_name, config_name)
                else:
                    e = f"Checkpoint name or clip override not provided for clip_{letter}.\nUnable to merge clips using the following interpolation: {clip_interpolation}"
                    ttNl(e).t(f'multiModelMerge [{my_unique_id}]').error().p().interrupt(e)
            
            return model, clip


        def merge(base_model, base_strength, patch_model, patch_strength):
            m = base_model.clone()
            kp = patch_model.get_key_patches("diffusion_model.")
            for k in kp:
                m.add_patches({k: kp[k]}, patch_strength, base_strength)
            return m
        
        def clip_merge(base_clip, base_strength, patch_clip, patch_strength):
            m = base_clip.clone()
            kp = patch_clip.get_key_patches()
            for k in kp:
                if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                    continue
                m.add_patches({k: kp[k]}, patch_strength, base_strength)
            return m

        def _add_assets(a1, a2, is_clip=False, multiplier=1.0, weighted=False):
            if is_clip:
                if weighted:
                    return clip_merge(a1, (1.0 - multiplier), a2, multiplier)
                else:
                    return clip_merge(a1, 1.0, a2, multiplier)
            else:
                if weighted:
                    return merge(a1, (1.0 - multiplier), a2, multiplier)
                else:
                    return merge(a1, 1.0, a2, multiplier)
        
        def _subtract_assets(a1, a2, is_clip=False, multiplier=1.0):
            if is_clip:
                    return clip_merge(a1, 1.0, a2, -multiplier)
            else:
                    return merge(a1, 1.0, a2, -multiplier)
        
        required_list = required_assets(model_interpolation, clip_interpolation)
        model_A, clip_A = _collect_letter("A", required_list, model_A_override, clip_A_override, ckpt_A_name, config_A_name)
        model_B, clip_B = _collect_letter("B", required_list, model_B_override, clip_B_override, ckpt_B_name, config_B_name)
        model_C, clip_C = _collect_letter("C", required_list, model_C_override, clip_C_override, ckpt_C_name, config_C_name)
        
        if (model_interpolation == A_ONLY):
            model = model_A
        if (model_interpolation == WEIGHTED_SUM):
            model = _add_assets(model_A, model_B, False, model_multiplier, True)
        if (model_interpolation == ADD_DIFFERENCE):
            model = _add_assets(model_A, _subtract_assets(model_B, model_C), False, model_multiplier)
        
        if (clip_interpolation == FOLLOW):
            clip_interpolation = model_interpolation
        if (clip_interpolation == A_ONLY):
            clip = clip_A
        if (clip_interpolation == B_ONLY):
            clip = clip_B
        if (clip_interpolation == C_ONLY):
            clip = clip_C
        if (clip_interpolation == WEIGHTED_SUM):
            clip = _add_assets(clip_A, clip_B, True, clip_multiplier, True)
        if (clip_interpolation == ADD_DIFFERENCE):
            clip = _add_assets(clip_A, _subtract_assets(clip_B, clip_C, True), True, clip_multiplier)
        

        if optional_vae not in ["None", None]:
            vae_sd = optional_vae.get_sd()
            vae = optional_vae
        else:
            vae_sd = {}
            vae = None

        if save_model == "True":
            full_output_folder, filename, counter, subfolder, save_prefix = folder_paths.get_save_image_path(save_prefix, folder_paths.get_output_directory())

            prompt_info = ""
            if prompt is not None:
                prompt_info = json.dumps(prompt)

            metadata = {}

            enable_modelspec = True
            if isinstance(model.model, comfy.model_base.SDXL):
                metadata["modelspec.architecture"] = "stable-diffusion-xl-v1-base"
            elif isinstance(model.model, comfy.model_base.SDXLRefiner):
                metadata["modelspec.architecture"] = "stable-diffusion-xl-v1-refiner"
            else:
                enable_modelspec = False

            if enable_modelspec:
                metadata["modelspec.sai_model_spec"] = "1.0.0"
                metadata["modelspec.implementation"] = "sgm"
                metadata["modelspec.title"] = "{} {}".format(filename, counter)

            if model.model.model_type == comfy.model_base.ModelType.EPS:
                metadata["modelspec.predict_key"] = "epsilon"
            elif model.model.model_type == comfy.model_base.ModelType.V_PREDICTION:
                metadata["modelspec.predict_key"] = "v"

            if not args.disable_metadata:
                metadata["prompt"] = prompt_info
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata[x] = json.dumps(extra_pnginfo[x])

            output_checkpoint = f"{filename}_{counter:05}_.safetensors"
            output_checkpoint = os.path.join(full_output_folder, output_checkpoint)

            comfy.model_management.load_models_gpu([model, clip.load_model()])
            sd = model.model.state_dict_for_saving(clip.get_sd(), vae_sd)
            comfy.utils.save_torch_file(sd, output_checkpoint, metadata=metadata)

        return (model, clip, vae)

```
