---
tags:
- ControlNet
---

# ControlNet Names
## Documentation
- Class name: `easy controlnetNames`
- Category: `EasyUse/Util`
- Output node: `False`

This node is designed to list available control net names, facilitating the selection process for users by providing a straightforward way to access and choose from the existing control nets within the system.
## Input types
### Required
- **`controlnet_name`**
    - Specifies the name of the control net to be listed. This parameter is crucial for identifying and selecting the appropriate control net from the available options.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`controlnet_name`**
    - Comfy dtype: `*`
    - Returns the name of the selected control net, making it easier for users to identify and use the desired control net in their operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class setControlName:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                "controlnet_name": (folder_paths.get_filename_list("controlnet"),),
            }
        }

    RETURN_TYPES = (AlwaysEqualProxy('*'),)
    RETURN_NAMES = ("controlnet_name",)
    FUNCTION = "set_name"
    CATEGORY = "EasyUse/Util"

    def set_name(self, controlnet_name):
        return (controlnet_name,)

```
