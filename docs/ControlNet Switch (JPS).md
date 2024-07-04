
# Documentation
- Class name: ControlNet Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ControlNet Switch 节点旨在根据给定的选择输入动态选择多个控制网络配置之间的一个。它在处理流程中实现了对控制网络的灵活操作，允许有条件地应用不同的控制网络设置。

# Input types
## Required
- select
    - 指定要输出的控制网络的索引。这个输入决定了应用哪一个控制网络配置，从而实现配置之间的动态切换。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- ctrlnet_i
    - 代表一个通用的控制网络配置选项，其中 'i' 可以从 1 到 5 不等，表示基于 'select' 输入可选择的控制网络配置。
    - Comfy dtype: CONTROL_NET
    - Python dtype: CONTROL_NET

# Output types
- ctrlnet_out
    - 输出选定的控制网络配置，便于在后续处理步骤中应用。
    - Comfy dtype: CONTROL_NET
    - Python dtype: CONTROL_NET


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNet_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("CONTROL_NET",)
    RETURN_NAMES = ("ctrlnet_out",)
    FUNCTION = "get_ctrlnet"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "ctrlnet_1": ("CONTROL_NET",),
                "ctrlnet_2": ("CONTROL_NET",),
                "ctrlnet_3": ("CONTROL_NET",),
                "ctrlnet_4": ("CONTROL_NET",),
                "ctrlnet_5": ("CONTROL_NET",),
            }
        }

    def get_ctrlnet(self,select,ctrlnet_1=None,ctrlnet_2=None,ctrlnet_3=None,ctrlnet_4=None,ctrlnet_5=None,):
        
        ctrlnet_out = ctrlnet_1

        if (select == 2):
            ctrlnet_out = ctrlnet_2
        elif (select == 3):
            ctrlnet_out = ctrlnet_3
        elif (select == 4):
            ctrlnet_out = ctrlnet_4
        elif (select == 5):
            ctrlnet_out = ctrlnet_5

        return (ctrlnet_out,)

```
