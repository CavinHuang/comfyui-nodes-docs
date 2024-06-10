---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
- ModelSwitching
---

# CR Model List (Legacy)
## Documentation
- Class name: `CR Model List`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

The CR Model List node is designed to manage and organize models within a list structure, facilitating the selection and application of different models in a dynamic and flexible manner. It supports operations such as adding, removing, or selecting models from the list, enabling users to efficiently handle multiple models for various tasks or experiments.
## Input types
### Required
- **`ckpt_name1`**
    - Specifies the first checkpoint name for model selection. It plays a crucial role in defining the initial model to be included in the model list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias1`**
    - Provides an alias for the first checkpoint, allowing for easier identification and management within the model list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ckpt_name2`**
    - Specifies the second checkpoint name for model selection, further expanding the model list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias2`**
    - Provides an alias for the second checkpoint, facilitating better organization and retrieval of models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ckpt_name3`**
    - Specifies the third checkpoint name for model selection, adding to the diversity of the model list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias3`**
    - Provides an alias for the third checkpoint, enhancing the manageability of the model list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ckpt_name4`**
    - Specifies the fourth checkpoint name for model selection, contributing to the comprehensive nature of the model list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias4`**
    - Provides an alias for the fourth checkpoint, aiding in the systematic organization of models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`ckpt_name5`**
    - Specifies the fifth checkpoint name for model selection, completing the set of primary models for the list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alias5`**
    - Provides an alias for the fifth checkpoint, ensuring a well-structured and accessible model list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model_list`**
    - This optional parameter allows users to input a pre-existing list of models to be managed within the node. It is crucial for integrating additional models into the node's functionality, directly affecting its operation.
    - Comfy dtype: `MODEL_LIST`
    - Python dtype: `List[str]`
## Output types
- **`MODEL_LIST`**
    - Comfy dtype: `MODEL_LIST`
    - Outputs the list of models that are currently managed within the node, allowing for further manipulation or selection.
    - Python dtype: `List[str]`
- **`show_text`**
    - Comfy dtype: `STRING`
    - Provides textual information or feedback related to the operations performed on the model list, enhancing user interaction and understanding.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ModelList:

    @classmethod
    def INPUT_TYPES(cls):
    
        checkpoint_files = ["None"] + folder_paths.get_filename_list("checkpoints")
        
        return {"required": {
                    "ckpt_name1": (checkpoint_files,),
                    "alias1": ("STRING", {"multiline": False, "default": ""}),
                    "ckpt_name2": (checkpoint_files,),
                    "alias2": ("STRING", {"multiline": False, "default": ""}),
                    "ckpt_name3": (checkpoint_files,),
                    "alias3": ("STRING", {"multiline": False, "default": ""}),
                    "ckpt_name4": (checkpoint_files,),
                    "alias4": ("STRING", {"multiline": False, "default": ""}),                    
                    "ckpt_name5": (checkpoint_files,),
                    "alias5": ("STRING", {"multiline": False, "default": ""}),                    
                },
                "optional": {"model_list": ("MODEL_LIST",)
                },
        }

    RETURN_TYPES = ("MODEL_LIST", "STRING", )
    RETURN_NAMES = ("MODEL_LIST", "show_text", )
    FUNCTION = "model_list"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def model_list(self, ckpt_name1, alias1, ckpt_name2, alias2, ckpt_name3, alias3, ckpt_name4, alias4,
        ckpt_name5, alias5, model_list=None):

        # Initialise the list
        models = list()
        model_text = list()
        
        # Extend the list for each model in the stack
        if model_list is not None:
            models.extend([l for l in model_list if l[0] != None]) #"None"
            model_text += "\n".join(map(str, model_list)) + "\n"

        if ckpt_name1 != "None":
            model1_tup = [(alias1, ckpt_name1)]
            models.extend(model1_tup),        
            model_text += "\n".join(map(str, model1_tup)) + "\n"

        if ckpt_name2 != "None":
            model2_tup = [(alias2, ckpt_name2)]
            models.extend(model2_tup),
            model_text += "\n".join(map(str, model2_tup)) + "\n"

        if ckpt_name3 != "None":
            model3_tup = [(alias3, ckpt_name3)]
            models.extend(model3_tup),
            model_text += "\n".join(map(str, model3_tup)) + "\n"

        if ckpt_name4 != "None":
            model4_tup = [(alias4, ckpt_name4)]
            models.extend(model4_tup),
            model_text += "\n".join(map(str, model4_tup)) + "\n"
            
        if ckpt_name5 != "None":
            model5_tup = [(alias5, ckpt_name5)]       
            models.extend(model5_tup),
            model_text += "\n".join(map(str, model5_tup)) + "\n"
            
        #print(f"[TEST] CR Model List: {models}")

        show_text = "".join(model_text)
            
        return (models, show_text, )

```
