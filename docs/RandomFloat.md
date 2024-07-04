
# Documentation
- Class name: RandomFloat
- Category: Art Venture/Utils
- Output node: False

RandomFloat节点用于在指定范围内生成一个随机浮点数。它简化了使用PyTorch进行随机数生成的复杂过程，提供了一个简单的接口来获取随机浮点数，可用于各种需要随机行为的应用场景。

# Input types
## Required
- min
    - 指定生成随机浮点数的范围的最小值。它设定了随机数的下限，确保输出不小于这个值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max
    - 定义生成随机浮点数的范围的最大值。它作为上限，保证生成的数字不会超过这个值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 生成的随机浮点数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- string
    - 生成的随机浮点数的字符串表示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilRandomFloat:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("FLOAT", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "random_float"

    @classmethod
    def IS_CHANGED(s, *args, **kwargs):
        return torch.rand(1).item()

    def random_float(self, min: float, max: float):
        num = torch.rand(1).item() * (max - min) + min
        return (num, str(num))

```
