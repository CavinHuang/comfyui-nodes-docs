# 📂 IG Folder
## Documentation
- Class name: `IG Folder`
- Category: `🐓 IG Nodes/IO`
- Output node: `False`

The IG Folder node is designed to construct directory paths based on a specified parent directory and folder name. It abstracts the complexity of path manipulation, providing a straightforward way to generate paths for input or output operations within a file system.
## Input types
### Required
- **`folder_parent`**
    - Specifies the parent directory type, which can be either an input or output folder, influencing the base path for the resulting directory path.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`folder_name`**
    - Defines the name of the folder to be appended to the parent directory path, allowing for dynamic directory creation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the fully constructed directory path as a string, ready for use in file system operations.
    - Python dtype: `str`
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
