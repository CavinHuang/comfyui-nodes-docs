
# Documentation
- Class name: JWDatetimeString
- Category: jamesWalker55
- Output node: False

该节点生成当前日期时间的字符串表示，根据指定的模式进行格式化。它简化了日期时间格式化的复杂性，为获取格式化的日期时间字符串提供了一个简单的接口。

# Input types
## Required
- format
    - 指定返回当前日期时间的格式。这允许根据应用程序的需求自定义输出字符串。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出是一个表示当前日期时间的字符串，根据指定的模式进行格式化。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWDatetimeString", "Datetime String")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "format": ("STRING", {"default": "%Y-%m-%dT%H:%M:%S"}),
        }
    }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "execute"

    def execute(self, format: str):
        now = datetime.now()
        return (now.strftime(format),)

    @classmethod
    def IS_CHANGED(cls, *args):
        # This value will be compared with previous 'IS_CHANGED' outputs
        # If inequal, then this node will be considered as modified
        # NaN is never equal to itself
        return float("NaN")

```
