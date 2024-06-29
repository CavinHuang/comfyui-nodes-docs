---
tags:
- Latent
- Normalization
---

# LoadResAdapterNormalization
## Documentation
- Class name: `LoadResAdapterNormalization`
- Category: `KJNodes/experimental`
- Output node: `False`

This node is designed to load and apply ResAdapter normalization weights to a given model. It ensures that the model is compatible with specific normalization standards by patching it with ResAdapter weights, enhancing its performance or compatibility with certain datasets or tasks.
## Input types
### Required
- **`model`**
    - The model to which ResAdapter normalization weights will be applied. This parameter is crucial as it determines the base model that will be enhanced with normalization patches.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`resadapter_path`**
    - The file path to the ResAdapter normalization weights. This parameter is essential for locating and loading the specific normalization weights to be applied to the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The cloned model with applied ResAdapter normalization patches. This output is significant as it represents the enhanced version of the original model, ready for further use or evaluation.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadResAdapterNormalization:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "resadapter_path": (folder_paths.get_filename_list("checkpoints"), )
            } 
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_res_adapter"
    CATEGORY = "KJNodes/experimental"

    def load_res_adapter(self, model, resadapter_path):
        print("ResAdapter: Checking ResAdapter path")
        resadapter_full_path = folder_paths.get_full_path("checkpoints", resadapter_path)
        if not os.path.exists(resadapter_full_path):
            raise Exception("Invalid model path")
        else:
            print("ResAdapter: Loading ResAdapter normalization weights")
            prefix_to_remove = 'diffusion_model.'
            model_clone = model.clone()
            norm_state_dict = comfy.utils.load_torch_file(resadapter_full_path)
            new_values = {key[len(prefix_to_remove):]: value for key, value in norm_state_dict.items() if key.startswith(prefix_to_remove)}
            print("ResAdapter: Attempting to add patches with ResAdapter weights")
            try:
                for key in model.model.diffusion_model.state_dict().keys():
                    if key in new_values:
                        original_tensor = model.model.diffusion_model.state_dict()[key]
                        new_tensor = new_values[key].to(model.model.diffusion_model.dtype)
                        if original_tensor.shape == new_tensor.shape:
                            model_clone.add_object_patch(f"diffusion_model.{key}.data", new_tensor)
                        else:
                            print("ResAdapter: No match for key: ",key)
            except:
                raise Exception("Could not patch model, this way of patching was added to ComfyUI on March 3rd 2024, is your ComfyUI up to date?")
            print("ResAdapter: Added resnet normalization patches")
            return (model_clone, )

```
