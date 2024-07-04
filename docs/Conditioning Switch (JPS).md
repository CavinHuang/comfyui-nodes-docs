
# Documentation
- Class name: Conditioning Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

Conditioning Switch节点旨在根据指定的选择索引来选择并输出多个条件输入中的一个。它能够灵活控制在处理流程中传递哪个条件数据，从而在生成模型或其他计算框架中实现对条件上下文的灵活操作。

# Input types
## Required
- select
    - select参数通过其数值索引决定输出哪个条件输入。它对于控制不同条件上下文在节点中的流动至关重要。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- con_i
    - 表示一系列可选的条件输入（con_1到con_5），其中'i'可以从1到5。这些输入允许基于select参数动态选择条件数据，从而为处理提供多样化的上下文输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING

# Output types
- con_out
    - 根据select参数选择的输出条件数据。它实现了在不同条件上下文之间的动态切换。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Conditioning_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("con_out",)
    FUNCTION = "get_con"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "con_1": ("CONDITIONING",),
                "con_2": ("CONDITIONING",),
                "con_3": ("CONDITIONING",),
                "con_4": ("CONDITIONING",),
                "con_5": ("CONDITIONING",),
            }
        }

    def get_con(self,select,con_1,con_2=None,con_3=None,con_4=None,con_5=None,):
        
        con_out = con_1

        if (select == 2):
            con_out = con_2
        elif (select == 3):
            con_out  = con_3
        elif (select == 4):
            con_out = con_4
        elif (select == 5):
            con_out = con_5

        return (con_out,)

```
