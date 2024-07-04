
# Documentation
- Class name: ListStringToFloatNode
- Category: Custom
- Output node: False

ListStringToFloatNode旨在将字符串形式的列表转换为浮点数，通过对列表元素执行特定操作（如求和）来实现。它可以处理直接的浮点值和以字符串形式封装的浮点数列表，为基于字符串输入格式的数值数据处理提供了一个多功能工具。

# Input types
## Required
- input_data
    - 表示输入的字符串，可以是直接的浮点值或浮点数列表的字符串表示。这个输入对节点的操作至关重要，因为它决定了要执行的转换和计算类型。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output_float
    - 对输入数据进行转换和计算后的结果，以单个浮点值的形式提供。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ListStringToFloatNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": { "input_data": ("STRING", {"default": "[]"}) },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("output_float",)
    FUNCTION = "process_input"
    CATEGORY = "Custom"

    def process_input(self, input_data):
        # Attempt to evaluate the string input as a list
        try:
            # Convert string to list if it's not a list
            if isinstance(input_data, str):
                input_data = ast.literal_eval(input_data)
            
            # Example operation: calculate the sum of elements if it's a list
            if isinstance(input_data, list):
                result = sum(input_data)
            else:
                result = float(input_data)
        except:
            # Handle errors or unexpected input types
            result = 0.0

        return (result,)

```
