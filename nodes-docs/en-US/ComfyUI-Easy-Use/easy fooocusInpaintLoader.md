---
tags:
- DepthMap
- Image
- Inpaint
---

# Load Fooocus Inpaint
## Documentation
- Class name: `easy fooocusInpaintLoader`
- Category: `EasyUse/Inpaint`
- Output node: `False`

The `fooocusInpaintLoader` node is designed to facilitate the loading and application of inpainting models and patches within the ComfyUI framework. It primarily focuses on integrating inpainting capabilities into the model processing pipeline, enabling the enhancement or correction of images by applying learned inpainting patterns.
## Input types
### Required
- **`head`**
    - The `head` parameter represents the inpainting model head that is to be loaded. It plays a crucial role in determining the inpainting behavior and the quality of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`patch`**
    - The `patch` parameter refers to the specific inpainting patch to be applied. This patch modifies the model's behavior, allowing for targeted inpainting based on the provided patch information.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`patch`**
    - Comfy dtype: `INPAINT_PATCH`
    - The output is a tuple containing the inpainting head model and the LoRA patch, ready to be applied to the model for inpainting tasks.
    - Python dtype: `Tuple[torch.nn.Module, dict]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class fooocusInpaintLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "head": (list(FOOOCUS_INPAINT_HEAD.keys()),),
                "patch": (list(FOOOCUS_INPAINT_PATCH.keys()),),
            }
        }

    RETURN_TYPES = ("INPAINT_PATCH",)
    RETURN_NAMES = ("patch",)
    CATEGORY = "EasyUse/Inpaint"
    FUNCTION = "apply"

    def apply(self, head, patch):
        global inpaint_head_model

        head_file = get_local_filepath(FOOOCUS_INPAINT_HEAD[head]["model_url"], INPAINT_DIR)
        if inpaint_head_model is None:
            inpaint_head_model = InpaintHead()
            sd = torch.load(head_file, map_location='cpu')
            inpaint_head_model.load_state_dict(sd)

        patch_file = get_local_filepath(FOOOCUS_INPAINT_PATCH[patch]["model_url"], INPAINT_DIR)
        inpaint_lora = comfy.utils.load_torch_file(patch_file, safe_load=True)

        return ((inpaint_head_model, inpaint_lora),)

```
