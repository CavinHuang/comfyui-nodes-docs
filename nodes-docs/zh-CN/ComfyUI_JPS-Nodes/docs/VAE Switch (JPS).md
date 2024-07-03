
# Documentation
- Class name: VAE Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAE Switch节点旨在根据整数选择输入从多个提供的变分自编码器（VAE）模型中选择并输出一个。它能够在工作流程中实现不同VAE模型之间的动态切换，允许在运行时灵活选择模型。

# Input types
## Required
- select
    - 决定输出哪个VAE模型，每个整数值对应一个特定的VAE模型输入。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- vae_i
    - 代表可供选择输出的通用VAE模型输入。索引'i'可以从1到5不等，允许在多个VAE模型中进行动态选择。
    - Comfy dtype: VAE
    - Python dtype: object

# Output types
- vae_out
    - 根据'select'输入选择的VAE模型。
    - Comfy dtype: VAE
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VAE_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("VAE",)
    RETURN_NAMES = ("vae_out",)
    FUNCTION = "get_vae"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "vae_1": ("VAE",),
                "vae_2": ("VAE",),
                "vae_3": ("VAE",),
                "vae_4": ("VAE",),
                "vae_5": ("VAE",),
            }
        }

    def get_vae(self,select,vae_1=None,vae_2=None,vae_3=None,vae_4=None,vae_5=None,):
        
        vae_out = vae_1

        if (select == 2):
            vae_out = vae_2
        elif (select == 3):
            vae_out = vae_3
        elif (select == 4):
            vae_out = vae_4
        elif (select == 5):
            vae_out = vae_5

        return (vae_out,)

```
