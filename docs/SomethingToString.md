
# Documentation
- Class name: SomethingToString
- Category: KJNodes/text
- Output node: False

SomethingToString 节点提供了一种灵活的方式来将各种输入类型转换为字符串格式，并可选择性地添加前缀或后缀来自定义输出。

# Input types
## Required
- input
    - 用于转换为字符串的主要输入。这个参数是节点操作的核心，因为它决定了将被转换成字符串格式的基础内容。
    - Comfy dtype: *
    - Python dtype: Union[int, float, bool]

## Optional
- prefix
    - 可选的前缀，用于添加到字符串化输入的前面。这允许在输出的开头添加额外的上下文或格式。
    - Comfy dtype: STRING
    - Python dtype: str
- suffix
    - 可选的后缀，用于添加到字符串化输入的后面。这使得可以在输出的末尾进行进一步的自定义或格式化。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 转换过程的结果，可能包含任何指定的前缀或后缀，格式化为字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SomethingToString:
    @classmethod
    
    def INPUT_TYPES(s):
     return {
        "required": {
        "input": (any, {}),
    },
    "optional": {
        "prefix": ("STRING", {"default": ""}),
        "suffix": ("STRING", {"default": ""}),
    }
    }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "stringify"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Converts any type to a string.
"""

    def stringify(self, input, prefix="", suffix=""):
        if isinstance(input, (int, float, bool)):   
            stringified = str(input)
            if prefix:  # Check if prefix is not empty
                stringified = prefix + stringified  # Add the prefix
            if suffix:  # Check if suffix is not empty
                stringified = stringified + suffix  # Add the suffix
        else:
            return
        return (stringified,)

```
