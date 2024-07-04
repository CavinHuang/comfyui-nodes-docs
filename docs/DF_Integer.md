
# Documentation
- Class name: DF_Integer
- Category: Derfuu_Nodes/Variables
- Output node: False

DF_Integer 节点旨在通过向下取整的方式将浮点数转换为整数。它作为一个基础工具，为需要整数值的操作（如索引或离散数学）提供支持，确保数值输入被适当格式化以适应这些场景。

# Input types
## Required
- Value
    - 'Value' 参数接受一个浮点数，并将其向下取整到最接近的整数，便于需要使用整数的操作。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int
    - 输出是输入浮点数的整数表示，通过向下取整到最接近的整数得到。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [Image Resize](../../was-node-suite-comfyui/Nodes/Image Resize.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)



## Source code
```python
class IntegerNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(step=1)
            },
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = TREE_VARIABLE
    FUNCTION = "get_value"

    def get_value(self, Value: float):
        return (int(Value),)

```
