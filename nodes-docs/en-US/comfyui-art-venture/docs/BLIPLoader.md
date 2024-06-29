---
tags:
- Loader
- ModelIO
---

# BLIP Loader
## Documentation
- Class name: `BLIPLoader`
- Category: `Art Venture/Captioning`
- Output node: `False`

The BLIPLoader node is designed to load and initialize the BLIP model for image processing tasks. It encapsulates the complexities of setting up the BLIP model, including loading the pre-trained weights, configuring the model for inference, and ensuring it is ready to process images.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the BLIP model to load. This parameter determines which pre-trained model weights are loaded, affecting the node's performance and the quality of image processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`blip_model`**
    - Comfy dtype: `BLIP_MODEL`
    - Returns an instance of the BLIP model, fully configured and ready for image processing tasks. This model can then be used to perform various image understanding and manipulation tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [BLIPCaption](../../comfyui-art-venture/Nodes/BLIPCaption.md)



## Source code
```python
class BlipLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("blip"),),
            },
        }

    RETURN_TYPES = ("BLIP_MODEL",)
    FUNCTION = "load_blip"
    CATEGORY = "Art Venture/Captioning"

    def load_blip(self, model_name):
        model = load_blip(model_name)
        return (model,)

```
