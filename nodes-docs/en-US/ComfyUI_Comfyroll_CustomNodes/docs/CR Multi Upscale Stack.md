---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# 🔍 CR Multi Upscale Stack
## Documentation
- Class name: `CR Multi Upscale Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/🔍 Upscale`
- Output node: `False`

This node is designed to create a stack of upscale operations based on specified models and rescale factors. It allows for the dynamic addition of upscale models to a list, enabling a sequence of image upscale transformations to be defined and applied in a modular fashion.
## Input types
### Required
- **`switch_1`**
    - Determines whether the first upscale operation should be included in the stack. It acts as a conditional flag for the inclusion of the first upscale model and its corresponding rescale factor.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_model_1`**
    - Specifies the first upscale model to be potentially included in the stack, contingent on the state of switch_1.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor_1`**
    - Defines the rescale factor associated with the first upscale model, determining the magnitude of the upscale transformation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_2`**
    - Acts as a conditional flag for the inclusion of the second upscale model and its corresponding rescale factor in the stack.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_model_2`**
    - Specifies the second upscale model to be potentially included in the stack, contingent on the state of switch_2.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor_2`**
    - Defines the rescale factor associated with the second upscale model, determining the magnitude of the upscale transformation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_3`**
    - Determines whether the third upscale operation should be included in the stack. It acts as a conditional flag for the inclusion of the third upscale model and its corresponding rescale factor.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_model_3`**
    - Specifies the third upscale model to be potentially included in the stack, contingent on the state of switch_3.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor_3`**
    - Defines the rescale factor associated with the third upscale model, determining the magnitude of the upscale transformation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`upscale_stack`**
    - An optional initial list of upscale operations to be extended with additional models and rescale factors based on the switches. It allows for the accumulation and modular configuration of upscale transformations.
    - Comfy dtype: `UPSCALE_STACK`
    - Python dtype: `list`
## Output types
- **`UPSCALE_STACK`**
    - Comfy dtype: `UPSCALE_STACK`
    - The compiled list of upscale operations, each represented as a tuple of an upscale model and its corresponding rescale factor. This list is dynamically constructed based on the input switches and parameters.
    - Python dtype: `list`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional documentation and help related to the CR Multi Upscale Stack node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Apply Multi Upscale](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply Multi Upscale.md)



## Source code
```python
class CR_MultiUpscaleStack:

    @classmethod
    def INPUT_TYPES(s):
    
        mix_methods = ["Combine", "Average", "Concatenate"]
        up_models = ["None"] + folder_paths.get_filename_list("upscale_models")
        
        return {"required":
                    {
                     "switch_1": (["On","Off"],),              
                     "upscale_model_1": (up_models, ),
                     "rescale_factor_1": ("FLOAT", {"default": 2, "min": 0.01, "max": 16.0, "step": 0.01}),
                     "switch_2": (["On","Off"],),                          
                     "upscale_model_2": (up_models, ),
                     "rescale_factor_2": ("FLOAT", {"default": 2, "min": 0.01, "max": 16.0, "step": 0.01}),
                     "switch_3": (["On","Off"],),                        
                     "upscale_model_3": (up_models, ),
                     "rescale_factor_3": ("FLOAT", {"default": 2, "min": 0.01, "max": 16.0, "step": 0.01}),
                     },
                "optional": {"upscale_stack": ("UPSCALE_STACK",),
                }
        }

    RETURN_TYPES = ("UPSCALE_STACK", "STRING", )
    RETURN_NAMES = ("UPSCALE_STACK", "show_help", )
    FUNCTION = "stack"
    CATEGORY = icons.get("Comfyroll/Upscale")
    
    def stack(self, switch_1, upscale_model_1, rescale_factor_1, switch_2, upscale_model_2, rescale_factor_2, switch_3, upscale_model_3, rescale_factor_3, upscale_stack=None):
    
        # Initialise the list
        upscale_list=list()
        
        if upscale_stack is not None:
            upscale_list.extend([l for l in upscale_stack if l[0] != "None"])
        
        if upscale_model_1 != "None" and  switch_1 == "On":
            upscale_list.extend([(upscale_model_1, rescale_factor_1)]),

        if upscale_model_2 != "None" and  switch_2 == "On":
            upscale_list.extend([(upscale_model_2, rescale_factor_2)]),

        if upscale_model_3 != "None" and  switch_3 == "On":
            upscale_list.extend([(upscale_model_3, rescale_factor_3)]),

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Upscale-Nodes#cr-multi-upscale-stack"
        return (upscale_list, show_help, )

```
