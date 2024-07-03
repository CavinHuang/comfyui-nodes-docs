
# Documentation
- Class name: RandomInt
- Category: Art Venture/Utils
- Output node: False

RandomInt节点在指定范围内生成一个随机整数。它简化了随机数生成的复杂性，为获取整数提供了一个简单的接口，可用于各种应用，如随机采样或随机过程。

# Input types
## Required
- min
    - 指定生成随机整数的范围的最小值。它设定了随机数生成的下限。
    - Comfy dtype: INT
    - Python dtype: int
- max
    - 定义随机整数生成范围的最大值。它确立了上限，确保生成的数字不会超过这个值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 在指定范围内生成的随机整数。
    - Comfy dtype: INT
    - Python dtype: int
- string
    - 生成的随机整数的字符串表示，便于在需要文本数据的场景中使用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilRandomInt:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "max": ("INT", {"default": 100, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }

    RETURN_TYPES = ("INT", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "random_int"

    @classmethod
    def IS_CHANGED(s, *args, **kwargs):
        return torch.rand(1).item()

    def random_int(self, min: int, max: int):
        num = torch.randint(min, max, (1,)).item()
        return (num, str(num))

```
