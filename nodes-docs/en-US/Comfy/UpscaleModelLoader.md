---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Load Upscale Model
## Documentation
- Class name: `UpscaleModelLoader`
- Category: `loaders`
- Output node: `False`

The UpscaleModelLoader node is designed for loading upscale models from a specified directory. It facilitates the retrieval and preparation of upscale models for image upscaling tasks, ensuring that the models are correctly loaded and configured for evaluation.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the upscale model to be loaded. This parameter is crucial for identifying and retrieving the correct model file from the upscale models directory.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`upscale_model`**
    - Comfy dtype: `UPSCALE_MODEL`
    - Returns the loaded and prepared upscale model, ready for use in image upscaling tasks.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - Reroute
    - [LatentPixelScale](../../ComfyUI-Impact-Pack/Nodes/LatentPixelScale.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [PixelKSampleUpscalerProvider](../../ComfyUI-Impact-Pack/Nodes/PixelKSampleUpscalerProvider.md)



## Source code
```python
class UpscaleModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model_name": (folder_paths.get_filename_list("upscale_models"), ),
                             }}
    RETURN_TYPES = ("UPSCALE_MODEL",)
    FUNCTION = "load_model"

    CATEGORY = "loaders"

    def load_model(self, model_name):
        model_path = folder_paths.get_full_path("upscale_models", model_name)
        sd = comfy.utils.load_torch_file(model_path, safe_load=True)
        if "module.layers.0.residual_group.blocks.0.norm1.weight" in sd:
            sd = comfy.utils.state_dict_prefix_replace(sd, {"module.":""})
        out = model_loading.load_state_dict(sd).eval()
        return (out, )

```
