
# Documentation
- Class name: `Largest Int (JPS)`
- Category: `JPS Nodes/Math`
- Output node: `False`

该节点用于确定两个给定值之间的最大和最小整数，并指示第一个整数是否大于第二个整数。它将比较逻辑抽象为一个简单的接口，方便用户使用。

# Input types
## Required
- **`int_a`**
    - 表示要比较的第一个整数。它的值影响较大和较小整数的确定，以及指示它是否大于第二个整数的标志。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`int_b`**
    - 表示要比较的第二个整数。它与第一个整数一起用于确定较大和较小的值，以及设置指示第一个整数是否较大的标志。
    - Comfy dtype: `INT`
    - Python dtype: `int`

# Output types
- **`larger_int`**
    - 两个输入整数中较大的一个。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`smaller_int`**
    - 两个输入整数中较小的一个。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`is_a_larger`**
    - 指示第一个输入整数是否大于第二个的标志。
    - Comfy dtype: `INT`
    - Python dtype: `int`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Math_Largest_Integer:

    def init(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int_a": ("INT", {"default": 1,}),
                "int_b": ("INT", {"default": 1,}),
            }
        }

    RETURN_TYPES = ("INT","INT","INT")
    RETURN_NAMES = ("larger_int","smaller_int","is_a_larger")
    FUNCTION = "get_lrg"

    CATEGORY="JPS Nodes/Math"

    def get_lrg(self,int_a,int_b):
        larger_int = int(int_b)
        smaller_int = int(int_a)
        is_a_larger = int(0)
        if int_a > int_b:
            larger_int = int(int_a)
            smaller_int = int(int_b)
            is_a_larger = int(1)

        return(int(larger_int),int(smaller_int),int(is_a_larger))

```
