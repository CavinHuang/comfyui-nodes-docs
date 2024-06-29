---
tags:
- Face
---

# Load Instance PositionNet Model
## Documentation
- Class name: `LoadInstancePositionNetModel`
- Category: `instance/loaders`
- Output node: `False`

This node is designed to load the PositionNet model, a component of the instance diffusion framework, by reading a specified model file and applying necessary configurations. It facilitates the initialization of PositionNet with predefined parameters and the option to include segmentation information, thereby preparing the model for subsequent instance-based processing tasks.
## Input types
### Required
- **`model_filename`**
    - Specifies the filename of the PositionNet model to be loaded. This parameter is crucial for identifying and retrieving the correct model file from a predefined directory.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_segs`**
    - Determines whether segmentation information should be utilized in the PositionNet model configuration. This boolean flag allows for flexible adaptation of the model based on the presence of segmentation data.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`positionnet`**
    - Comfy dtype: `POSITIONNET`
    - The loaded PositionNet model, ready for use in instance-based processing tasks. This output encapsulates the model initialized with the specified configurations.
    - Python dtype: `torch.nn.Module`
- **`fusers`**
    - Comfy dtype: `FUSERS`
    - The loaded fusers model, which is part of the instance diffusion framework, ready for integration with other components.
    - Python dtype: `torch.nn.Module`
- **`scaleu`**
    - Comfy dtype: `SCALEU`
    - The loaded ScaleU model, another component of the instance diffusion framework, prepared for use in scaling and processing instances.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadInstancePositionNetNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_POSITIONNET_DIR),),
            "use_segs": ("BOOLEAN", {"default": True}),
        }}

    RETURN_TYPES = ("POSITIONNET", "FUSERS", "SCALEU",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str, use_segs: bool):
        checkpoint = load_checkpoint(
            constants.INSTANCE_POSITIONNET_DIR, model_filename)
        params = get_positionnet_default_params()
        params["use_segs"] = use_segs
        model = prepare_positionnet(checkpoint, params)
        positionnet = {
            'model': model,
        }
        return (positionnet,)

```
