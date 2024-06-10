---
tags:
- ModelMerge
---

# ⛏️ CR Model Merge Stack
## Documentation
- Class name: `CR Model Merge Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/⛏️ Model Merge`
- Output node: `False`

This node is designed to facilitate the merging of multiple models into a single, cohesive model stack. It allows for the integration of various models by applying specified merging methods, normalization of ratios, and weighting factors to achieve a balanced and effective combination of model features.
## Input types
### Required
- **`switch_1`**
    - Activates or deactivates the inclusion of the first model in the merging process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name1`**
    - The name of the checkpoint file for the first model. This is used to identify and load the specific model to be merged.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_ratio1`**
    - Specifies the contribution ratio of the first model in the merged output. This affects how prominently the model's features are represented.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_ratio1`**
    - Determines the contribution ratio of the CLIP model associated with the first model in the merged output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_2`**
    - Activates or deactivates the inclusion of the second model in the merging process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name2`**
    - The name of the checkpoint file for the second model. This is used to identify and load the specific model to be merged.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_ratio2`**
    - Specifies the contribution ratio of the second model in the merged output. This affects how prominently the model's features are represented.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_ratio2`**
    - Determines the contribution ratio of the CLIP model associated with the second model in the merged output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_3`**
    - Activates or deactivates the inclusion of the third model in the merging process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ckpt_name3`**
    - The name of the checkpoint file for the third model. This is used to identify and load the specific model to be merged.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model_ratio3`**
    - Specifies the contribution ratio of the third model in the merged output. This affects how prominently the model's features are represented.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_ratio3`**
    - Determines the contribution ratio of the CLIP model associated with the third model in the merged output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`model_stack`**
    - An optional stack of models that can be included in the merge process. This allows for the integration of additional models beyond the primary three specified.
    - Comfy dtype: `MODEL_STACK`
    - Python dtype: `List[Tuple[str, float, float]]`
## Output types
- **`MODEL_STACK`**
    - Comfy dtype: `MODEL_STACK`
    - The resulting merged model stack, which combines the features of the input models according to the specified merge method, normalization, and weighting.
    - Python dtype: `List[Tuple[str, float, float]]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation on how to use the node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Apply Model Merge](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply Model Merge.md)



## Source code
```python
class CR_ModelMergeStack:
    
    @classmethod
    def INPUT_TYPES(cls):
    
        checkpoint_files = ["None"] + folder_paths.get_filename_list("checkpoints")
        
        return {"required": {"switch_1": (["Off","On"],),
                             "ckpt_name1": (checkpoint_files,),
                             "model_ratio1": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                             "clip_ratio1": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                             #
                             "switch_2": (["Off","On"],),
                             "ckpt_name2": (checkpoint_files,),
                             "model_ratio2": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                             "clip_ratio2": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                             #
                             "switch_3": (["Off","On"],),
                             "ckpt_name3": (checkpoint_files,),
                             "model_ratio3": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                             "clip_ratio3": ("FLOAT", {"default": 1.0, "min": -100.0, "max": 100.0, "step": 0.01}),
                            },      
                "optional":{
                             "model_stack": ("MODEL_STACK",),
                },
        }

    RETURN_TYPES = ("MODEL_STACK", "STRING", )
    RETURN_NAMES = ("MODEL_STACK", "show_help", )
    FUNCTION = "list_checkpoints"
    CATEGORY = icons.get("Comfyroll/Model Merge")

    def list_checkpoints(self, switch_1, ckpt_name1, model_ratio1, clip_ratio1, switch_2, ckpt_name2, model_ratio2, clip_ratio2, switch_3, ckpt_name3, model_ratio3, clip_ratio3, model_stack=None):
    
        # Initialise the list
        model_list = list()
    
        if model_stack is not None:
            model_list.extend([l for l in model_stack if l[0] != "None"])
        
        if ckpt_name1 != "None" and  switch_1 == "On":
            model_list.extend([(ckpt_name1, model_ratio1, clip_ratio1)]),

        if ckpt_name2 != "None" and  switch_2 == "On":
            model_list.extend([(ckpt_name2, model_ratio2, clip_ratio2)]),

        if ckpt_name3 != "None" and  switch_3 == "On":
            model_list.extend([(ckpt_name3, model_ratio3, clip_ratio3)]),

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Model-Merge-Nodes#cr-model-stack"
        
        return (model_list, show_help, )

```
