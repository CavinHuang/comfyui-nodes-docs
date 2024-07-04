
# Documentation
- Class name: IG Folder
- Category: 🐓 IG Nodes/IO
- Output node: False

IG Folder节点用于根据指定的父目录和文件夹名称构建目录路径。它简化了路径操作的复杂性，提供了一种简单直接的方式来生成文件系统内输入或输出操作所需的路径。

# Input types
## Required
- folder_parent
    - 指定父目录类型，可以是输入文件夹或输出文件夹，这会影响生成目录路径的基础路径。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- folder_name
    - 定义要附加到父目录路径的文件夹名称，允许动态创建目录。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 返回完整构建的目录路径字符串，可直接用于文件系统操作。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_Folder:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        folder_type = ["input folder", "output folder"]
        return {
            "required": {
                "folder_parent": (folder_type, ),
                "folder_name": ("STRING", {"default": '', "multiline": False}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_IO

    def main(self, folder_parent, folder_name):
        parent = folder_paths.input_directory if folder_parent == "input folder" else folder_paths.output_directory
        directory = os.path.join(parent, folder_name)
        return (directory,)

```
