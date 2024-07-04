
# Documentation
- Class name: IG Path Join
- Category: 🐓 IG Nodes/IO
- Output node: False

IG Path Join 节点旨在将两个字符串路径连接成一个单一的路径字符串，便于在工作流中构建文件和目录路径。

# Input types
## Required
- first
    - 指定要连接的路径的第一部分。它构成了第二部分将要附加到的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- second
    - 定义要连接到第一部分的路径的第二部分。这个添加完成了完整路径的构建。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 由第一个和第二个输入字符串连接而成的完整路径字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_PathJoin:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "first": ("STRING", {"default": '', "multiline": False}),
                "second": ("STRING", {"default": '', "multiline": False}),
            },
        }
    
    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_IO
    def main(self, first, second):
        path = os.path.join(first, second)
        return (path,)

```
