
# Documentation
- Class name: FloatToSigmas
- Category: KJNodes/noise
- Output node: False

FloatToSigmas节点将一系列浮点数值转换为sigma张量，这一过程有助于将数值数据转换为适用于神经网络中噪声生成和操作的格式。

# Input types
## Required
- float_list
    - 需要转换为sigma张量的浮点数值列表。这一输入对于定义神经网络处理中将应用的特定噪声级别至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Output types
- SIGMAS
    - 从输入的浮点数值列表派生出的sigma张量，用于神经网络操作中的噪声生成和操作。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FloatToSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {
                     "float_list": ("FLOAT", {"default": 0.0, "forceInput": True}),
                     }
                }
    RETURN_TYPES = ("SIGMAS",)
    RETURN_NAMES = ("SIGMAS",)
    CATEGORY = "KJNodes/noise"
    FUNCTION = "customsigmas"
    DESCRIPTION = """
Creates a sigmas tensor from list of float values.  

"""
    def customsigmas(self, float_list):
        return torch.tensor(float_list, dtype=torch.float32),

```
