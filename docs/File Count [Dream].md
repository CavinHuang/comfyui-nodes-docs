
# Documentation
- Class name: File Count [Dream]
- Category: ✨ Dream/🎥 animation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点用于统计指定目录中匹配给定模式（如文件扩展名）的文件数量。它旨在通过提供一种快速量化项目或数据集中相关文件的方法，来促进文件管理和组织任务。

# Input types
## Required
- directory_path
    - 指定要统计文件的目录路径。这个路径对于节点定位和评估所需位置的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- patterns
    - 定义用于匹配目录中文件的文件模式（例如'*.jpg'，'*.png'）。这允许筛选和计数特定类型的文件，提高了节点在管理和组织文件方面的实用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- TOTAL
    - 给定目录中匹配指定模式的文件总数。这个输出提供了一个直观的指标来评估相关文件的数量。
    - Comfy dtype: INT
    - Python dtype: int


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
