
# Documentation
- Class name: Mask Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False
- Repo Ref: [https://github.com/JPS-GER/ComfyUI_JPS-Nodes](https://github.com/JPS-GER/ComfyUI_JPS-Nodes)

Mask Switch节点旨在根据给定的选择索引从多个输入掩码中选择并输出其中一个。它在流程中实现动态掩码切换,为灵活的掩码操作和应用提供了便利。

# Input types
## Required
- select
    - 指定要选择和输出的掩码的索引。这个选择决定了将哪个掩码输入(在多个可能提供的输入中)作为输出传递。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- mask_i
    - 代表任何可选的掩码输入(mask_1到mask_5),这些输入可以被选择用于输出。具体选择哪个掩码取决于'select'索引。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- mask_out
    - 基于输入选择索引选出的掩码输出。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Mask_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask_out",)
    FUNCTION = "get_mask"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "mask_1": ("MASK",),
                "mask_2": ("MASK",),
                "mask_3": ("MASK",),
                "mask_4": ("MASK",),
                "mask_5": ("MASK",),
            }
        }

    def get_mask(self,select,mask_1=None,mask_2=None,mask_3=None,mask_4=None,mask_5=None,):
        
        mask_out = None

        if (select == 1):
            mask_out = mask_1
        if (select == 2):
            mask_out = mask_2
        elif (select == 3):
            mask_out = mask_3
        elif (select == 4):
            mask_out = mask_4
        elif (select == 5):
            mask_out = mask_5

        return (mask_out,)

```
