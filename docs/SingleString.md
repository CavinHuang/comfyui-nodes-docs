
# Documentation
- Class name: SingleString
- Category: String
- Output node: False
- Repo Ref: https://github.com/klinter-com/ComfyUI-KLI

SingleString节点的设计目的是在管道中直接传递单个字符串输入，不对其进行任何修改。它充当了字符串数据的简单传递通道。

# Input types
## Required
- string
    - 代表要传递的字符串输入。这个参数对节点的操作至关重要，因为它直接影响输出——输入的字符串会原封不动地被返回。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出是未经改变的输入字符串，展示了该节点作为简单传递机制的功能。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SingleString:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": '', "multiline": True}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "passtring"

    CATEGORY = "String"

    def passtring(self, string):
        return (string, )

```
