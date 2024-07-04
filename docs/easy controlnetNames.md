
# Documentation
- Class name: easy controlnetNames
- Category: EasyUse/Util
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在列出可用的控制网络名称，通过提供一种直接的方式来访问和选择系统中现有的控制网络，从而简化用户的选择过程。

# Input types
## Required
- controlnet_name
    - 指定要列出的控制网络的名称。此参数对于从可用选项中识别和选择适当的控制网络至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- controlnet_name
    - 返回所选控制网络的名称，使用户更容易识别并在操作中使用所需的控制网络。
    - Comfy dtype: *
    - Python dtype: str


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
