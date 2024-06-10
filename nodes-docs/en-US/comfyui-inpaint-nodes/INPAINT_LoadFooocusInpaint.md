---
tags:
- DepthMap
- Image
- Inpaint
---

# Load Fooocus Inpaint
## Documentation
- Class name: `INPAINT_LoadFooocusInpaint`
- Category: `inpaint`
- Output node: `False`

This node is designed to load specific inpainting models, focusing on initializing and preparing the models for the inpainting process. It abstracts the complexities of loading model weights and configurations, ensuring that the models are ready for use in subsequent inpainting tasks.
## Input types
### Required
- **`head`**
    - Specifies the filename of the head model to be loaded. It is crucial for initializing the inpainting head model with the correct weights for the inpainting process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`patch`**
    - Indicates the filename of the patch model to be loaded. This model is essential for applying localized adjustments or enhancements during the inpainting process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`inpaint_patch`**
    - Comfy dtype: `INPAINT_PATCH`
    - Returns a tuple containing the initialized inpainting head model and the loaded patch model, ready for use in the inpainting process.
    - Python dtype: `Tuple[InpaintHead, dict[str, Tensor]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadFooocusInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "head": (folder_paths.get_filename_list("inpaint"),),
                "patch": (folder_paths.get_filename_list("inpaint"),),
            }
        }

    RETURN_TYPES = ("INPAINT_PATCH",)
    CATEGORY = "inpaint"
    FUNCTION = "load"

    def load(self, head: str, patch: str):
        head_file = folder_paths.get_full_path("inpaint", head)
        inpaint_head_model = InpaintHead()
        sd = torch.load(head_file, map_location="cpu")
        inpaint_head_model.load_state_dict(sd)

        patch_file = folder_paths.get_full_path("inpaint", patch)
        inpaint_lora = comfy.utils.load_torch_file(patch_file, safe_load=True)

        return ((inpaint_head_model, inpaint_lora),)

```
