
# Documentation
- Class name: Integer Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False
- Repo Ref: https://github.com/jps-yes/JPS_Nodes

Integer Switch (JPS)节点是一个高效的条件选择工具,它能根据特定的选择标准从多个整数输入中选择一个并输出。这个节点通过允许动态选择整数值,在数据流中实现了条件逻辑的功能。

# Input types
## Required
- select
    - select参数决定了要选择并输出哪一个整数输入。选择过程基于这个整数值,从而实现条件逻辑和动态数据流。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- int_i
    - int_i代表一系列可选的整数输入(从int_1到int_5)。每个'int_i'都是根据'select'标准可能被选中的潜在输出。这些输入为节点提供了灵活性,使其能够处理多种可能的情况。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int_out
    - 输出的int_out是根据输入标准选择的整数值。它代表了节点处理后的最终结果,可以被后续节点或流程使用。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Integer_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("int_out",)
    FUNCTION = "get_int"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "int_1": ("INT", {}),
                "int_2": ("INT", {}),
                "int_3": ("INT", {}),
                "int_4": ("INT", {}),
                "int_5": ("INT", {}),
            }
        }

    def get_int(self,select,int_1=None,int_2=None,int_3=None,int_4=None,int_5=None,):
        
        int_out = int_1

        if (select == 2):
            int_out = int_2
        elif (select == 3):
            int_out = int_3
        elif (select == 4):
            int_out = int_4
        elif (select == 5):
            int_out = int_5

        return (int_out,)

```
