
# Documentation
- Class name: IPA Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

IPA Switch节点旨在根据给定的选择输入来选择并输出多个IP Adapter配置中的一个。它实现了不同IP Adapter设置之间的动态切换，使得在处理流程中能够灵活适应各种需求。

# Input types
## Required
- select
    - 根据数值选择决定输出哪个IP Adapter配置。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- ipa_i
    - 代表一系列可选的IP Adapter配置（ipa_1到ipa_5）。'i'的范围是1到5，其中ipa_1是必需的，其余是可选的，允许基于'select'进行动态选择。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPADAPTER

# Output types
- IPA_out
    - 被选中的IP Adapter配置。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPADAPTER


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPA_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("IPADAPTER",)
    RETURN_NAMES = ("IPA_out",)
    FUNCTION = "get_ipa"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "ipa_1": ("IPADAPTER",),
                "ipa_2": ("IPADAPTER",),
                "ipa_3": ("IPADAPTER",),
                "ipa_4": ("IPADAPTER",),
                "ipa_5": ("IPADAPTER",),
            }
        }

    def get_ipa(self,select,ipa_1,ipa_2=None,ipa_3=None,ipa_4=None,ipa_5=None,):
        
        ipa_out = ipa_1

        if (select == 2):
            ipa_out = ipa_2
        elif (select == 3):
            ipa_out  = ipa_3
        elif (select == 4):
            ipa_out = ipa_4
        elif (select == 5):
            ipa_out = ipa_5

        return (ipa_out,)

```
