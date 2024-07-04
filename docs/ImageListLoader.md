
# Documentation
- Class name: ImageListLoader
- Category: List Stuff
- Output node: False

ImageListLoader节点旨在从指定源加载图像列表，便于在批处理或图像分析工作流程中处理和操作多个图像。

# Input types
## Required
- folder_path
    - 指定要从中加载图像的目录路径。这个输入对于定位节点将处理的图像源至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- file_filter
    - 定义用于过滤要加载的图像的文件模式，如'*.png'。这允许根据文件类型或命名约定选择性地加载图像。
    - Comfy dtype: STRING
    - Python dtype: str
- sort_method
    - 确定加载图像的排序方法，可以是'numerical'（数字）或'alphabetical'（字母）。这会影响图像的处理顺序，对于需要特定顺序的工作流程至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- Images
    - 将加载的图像作为列表输出，使它们可用于进一步处理或分析。这对于需要同时操作多个图像的工作流程至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageListLoader:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "folder_path": ("STRING", {}),
                "file_filter": ("STRING", {"default": "*.png"}),
                "sort_method": (["numerical", "alphabetical"], {"default": "numerical"}),
            },
        }

    RELOAD_INST = True
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("Images",)
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "load_images"

    CATEGORY = "List Stuff"

    @staticmethod
    def numerical_sort(file_name: Path) -> int:
        subbed = re.sub("\D", "", str(file_name))
        if subbed == "":
            return 0
        return int(subbed)
    
    
    @staticmethod
    def alphabetical_sort(file_name: Path) -> str:
        return str(file_name)

    def load_images(
        self, folder_path: str, file_filter: str, sort_method: str
    ) -> Tuple[List[Tensor]]:
        folder = Path(folder_path)
    
        if not folder.is_dir():
            raise Exception(f"Folder path {folder_path} does not exist.")

        sort_method_impl: Callable[[str], Union[SupportsDunderGT, SupportsDunderLT]]
        if sort_method == "numerical":
            sort_method_impl = self.numerical_sort
        elif sort_method == "alphabetical":
            sort_method_impl = self.alphabetical_sort
        else:
            raise ValueError(f"Unknown sort method {sort_method}")

        files = sorted(folder.glob(file_filter), key=sort_method_impl)
        images = [pil2tensor(Image.open(file)) for file in files]
    
        return (images,)

```
