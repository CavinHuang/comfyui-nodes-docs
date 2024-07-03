
# Documentation
- Class name: DF_Float
- Category: Derfuu_Nodes/Variables
- Output node: False

DF_Float节点设计用于直接传递浮点值而不进行任何修改，作为节点网络中数值数据操作的基本构建块。

# Input types
## Required
- Value
    - 接受一个浮点值作为输入，该值会被直接传递而不做任何修改。这个参数对节点的操作至关重要，因为它决定了将要输出的确切值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出与输入接收到的相同浮点值，确保数值数据的直接传递。
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
class FloatNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    CATEGORY = TREE_VARIABLE
    FUNCTION = "get_value"

    def get_value(self, Value):
        return (Value,)

```
