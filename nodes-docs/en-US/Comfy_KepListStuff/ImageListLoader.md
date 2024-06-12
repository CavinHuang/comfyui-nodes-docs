---
tags:
- Image
- ImageListLoader
---

# Image List Loader
## Documentation
- Class name: `ImageListLoader`
- Category: `List Stuff`
- Output node: `False`

The ImageListLoader node is designed to load a list of images from a specified source, facilitating the handling and manipulation of multiple images in a batch processing or image analysis workflow.
## Input types
### Required
- **`folder_path`**
    - Specifies the directory path from which images will be loaded. This input is essential for locating the source of images that the node will process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_filter`**
    - Defines the file pattern to filter the images to be loaded, such as '*.png'. This allows for selective loading of images based on their file type or naming convention.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`sort_method`**
    - Determines the sorting method for the loaded images, either 'numerical' or 'alphabetical'. This affects the order in which images are processed and is crucial for workflows requiring a specific sequence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`Images`**
    - Comfy dtype: `IMAGE`
    - Outputs the loaded images as a list, making them available for further processing or analysis. This is essential for workflows that require manipulation of multiple images simultaneously.
    - Python dtype: `List[torch.Tensor]`
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
