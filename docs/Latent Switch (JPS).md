
# Documentation
- Class name: Latent Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

Latent Switch节点旨在根据给定的选择索引从多个提供的潜在表示中选择并输出其中一个。它实现了潜在输入之间的动态切换，使得在生成模型中灵活操作潜在空间成为可能。

# Input types
## Required
- select
    - 根据其数值索引确定输出哪个潜在表示。这个选择驱动了节点的核心功能，即从可用的潜在输入中进行选择。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- latent_i
    - 可供选择输出的潜在表示选项之一。具体使用哪个潜在输入由'select'参数决定。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- latent_out
    - 基于输入选择索引选定的潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Latent_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent_out",)
    FUNCTION = "get_latent"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "latent_1": ("LATENT",),
                "latent_2": ("LATENT",),
                "latent_3": ("LATENT",),
                "latent_4": ("LATENT",),
                "latent_5": ("LATENT",),
            }
        }

    def get_latent(self,select,latent_1=None,latent_2=None,latent_3=None,latent_4=None,latent_5=None,):
        
        latent_out = latent_1

        if (select == 2):
            latent_out = latent_2
        elif (select == 3):
            latent_out = latent_3
        elif (select == 4):
            latent_out = latent_4
        elif (select == 5):
            latent_out = latent_5

        return (latent_out,)

```
