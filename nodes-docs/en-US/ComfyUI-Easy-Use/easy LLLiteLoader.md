---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLLLite
## Documentation
- Class name: `easy LLLiteLoader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy LLLiteLoader` node is designed to simplify the process of loading and integrating LLLite models into a user's workflow. It abstracts the complexities involved in handling model files, setting up the necessary configurations, and ensuring compatibility with the broader system, thereby making it easier for users to leverage LLLite models for their specific tasks.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded, focusing on the selection from a predefined list of available models, which is essential for the loading process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`model_name`**
    - Determines the specific name of the model to be loaded, allowing for precise identification and retrieval of the model file.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cond_image`**
    - Indicates the conditional image to be used in conjunction with the model, affecting the model's output based on the provided image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`strength`**
    - Defines the strength of the effect to be applied by the model, allowing users to control the intensity of the model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - Specifies the number of steps to be used in the model's processing, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_percent`**
    - Sets the starting percentage for the model's processing, allowing for partial application of the model's effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Determines the ending percentage for the model's processing, enabling fine-tuning of the model's application range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Outputs the loaded model, ready for use in the user's workflow, encapsulating the model's functionalities and configurations.
    - Python dtype: `Any`
- **`ui`**
    - Provides a user interface component that reflects the outcome of the loading process, including any relevant model information or error messages.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLLiteLoader:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "lllite" in file]

        return {
            "required": {
                "model": ("MODEL",),
                "model_name": (get_file_list(folder_paths.get_filename_list("controlnet")),),
                "cond_image": ("IMAGE",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "steps": ("INT", {"default": 0, "min": 0, "max": 200, "step": 1}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "end_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 100.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_lllite"
    CATEGORY = "EasyUse/Loaders"

    def load_lllite(self, model, model_name, cond_image, strength, steps, start_percent, end_percent):
        # cond_image is b,h,w,3, 0-1

        model_path = os.path.join(folder_paths.get_full_path("controlnet", model_name))

        model_lllite = model.clone()
        patch = load_control_net_lllite_patch(model_path, cond_image, strength, steps, start_percent, end_percent)
        if patch is not None:
            model_lllite.set_model_attn1_patch(patch)
            model_lllite.set_model_attn2_patch(patch)

        return (model_lllite,)

```
