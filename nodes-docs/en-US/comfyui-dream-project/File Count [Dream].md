---
tags:
- Counting
---

# 📂 File Count
## Documentation
- Class name: `File Count [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

This node counts the number of files in a specified directory that match given patterns, such as file extensions. It's designed to facilitate file management and organization tasks by providing a quick way to quantify relevant files within a project or dataset.
## Input types
### Required
- **`directory_path`**
    - Specifies the path to the directory where files will be counted. This path is essential for the node to locate and assess the files present in the desired location.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`patterns`**
    - Defines the file patterns (e.g., '*.jpg', '*.png') to match against files in the directory. This allows for filtering and counting files of specific types, enhancing the node's utility in managing and organizing files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`TOTAL`**
    - Comfy dtype: `INT`
    - The total count of files matching the specified patterns within the given directory. This output provides a straightforward metric for assessing the volume of relevant files.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamDirectoryFileCount:
    NODE_NAME = "File Count"
    ICON = "📂"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {"default": '', "multiline": False}),
                "patterns": ("STRING", {"default": '*.jpg|*.png|*.jpeg', "multiline": False}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("TOTAL",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *v):
        return ALWAYS_CHANGED_FLAG

    def result(self, directory_path, patterns):
        if not os.path.isdir(directory_path):
            return (0,)
        total = 0
        for pattern in patterns.split("|"):
            files = list(glob.glob(pattern, root_dir=directory_path))
            total += len(files)
        print("total " + str(total))
        return (total,)

```
