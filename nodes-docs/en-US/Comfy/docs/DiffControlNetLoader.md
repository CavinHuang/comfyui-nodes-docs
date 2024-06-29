---
tags:
- ControlNet
- ControlNetLoader
---

# Load ControlNet Model (diff)
## Documentation
- Class name: `DiffControlNetLoader`
- Category: `loaders`
- Output node: `False`

The DiffControlNetLoader node is designed for loading differential control networks, which are specialized models that can modify the behavior of another model based on control net specifications. This node allows for the dynamic adjustment of model behaviors by applying differential control nets, facilitating the creation of customized model outputs.
## Input types
### Required
- **`model`**
    - The model parameter specifies the base model to which the differential control net will be applied. This allows for the customization of the model's behavior based on the control net's specifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`control_net_name`**
    - The control_net_name parameter identifies the specific differential control net to be loaded and applied to the base model. This enables the selection of the appropriate control net for the desired model behavior modification.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - The output is a differential control net that has been loaded and is ready to be applied to a base model for behavior modification.
    - Python dtype: `ControlNet`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DiffControlNetLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "control_net_name": (folder_paths.get_filename_list("controlnet"), )}}

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "load_controlnet"

    CATEGORY = "loaders"

    def load_controlnet(self, model, control_net_name):
        controlnet_path = folder_paths.get_full_path("controlnet", control_net_name)
        controlnet = comfy.controlnet.load_controlnet(controlnet_path, model)
        return (controlnet,)

```
