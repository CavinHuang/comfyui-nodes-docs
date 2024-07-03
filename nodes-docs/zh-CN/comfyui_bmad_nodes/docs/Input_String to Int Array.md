
# Documentation
- Class name: Input_String to Int Array
- Category: Bmad/api/parseInput
- Output node: False

这个节点旨在将由逗号分隔的整数字符串表示转换为整数数组。它具有处理不同类型输入源的多功能性。

# Input types
## Required
- inStr
    - 包含由逗号分隔的整数的输入字符串，或者整数数组。这个参数允许灵活的输入处理。
    - Comfy dtype: STRING
    - Python dtype: Union[str, List[int]]

# Output types
- int_array
    - 输出是一个整数数组，通过解析输入字符串或直接使用输入数组得到。
    - Comfy dtype: INT_ARRAY
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InputString2IntArray:
    """
    Under the supposition this will be used with RequestInputs, the integers may already come as an array.
    The input is, therefore, polymorphic and both array and string types are accepted as inputs to both allow a valid
    request json and a mock array given via the web UI.

    When using a string: the integers should be separated with commas
    """

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"inStr": ("STRING", {"default": ""})}, }

    RETURN_TYPES = ("INT_ARRAY",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/api/parseInput"

    def convert(self, inStr):
        # not really a str, suppose is a list read from the input json
        if isinstance(inStr, list):
            return (inStr, )

        # otherwise suppose it is a valid string
        return ([int(x) for x in inStr.split(',')],)

```
