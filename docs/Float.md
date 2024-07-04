
# Documentation
- Class name: Float
- Category: Logic
- Output node: False

Float节点专门用于处理数值输入，特别是浮点数，允许在逻辑运算或计算中精确控制小数值。

# Input types
## Required
- value
    - 定义要处理的浮点数。这个输入对于确定节点的操作至关重要，影响着计算的精度和结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - 输出处理后的浮点数，保持输入中指定的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - ezMath
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Reroute
    - workflow/IP Adapter full bundle



## Source code
```python
class Float:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("FLOAT", {"default": 0, "step": 0.01})},
        }

    RETURN_TYPES = ("FLOAT",)

    RETURN_NAMES = ("FLOAT",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
