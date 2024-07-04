
# Documentation
- Class name: LoadImageListFromDir __Inspire
- Category: image
- Output node: False

LoadImageListFromDir __Inspire节点旨在从指定目录加载图像列表，便于批量处理或同时分析多个图像。它抽象了从文件系统读取和处理图像文件的复杂性，使图像数据更容易集成到工作流程中。

# Input types
## Required
- directory
    - 指定要从中加载图像的目录路径。这个参数对于确定要处理的图像源至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- image_load_cap
    - 限制从目录加载的图像数量，允许控制资源使用和处理时间。
    - Comfy dtype: INT
    - Python dtype: int
- start_index
    - 确定加载图像的起始索引，实现从较大集合中选择性读取图像。
    - Comfy dtype: INT
    - Python dtype: int
- load_always
    - 一个标志，设置后会强制节点加载图像，不受其他可能阻止加载的条件影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 已加载、处理并准备在工作流程中进一步使用的图像列表。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- mask
    - 与加载的图像对应的蒙版列表，适用于需要图像分割或修改的操作。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImagesFromDirList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": ""}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "step": 1}),
                "start_index": ("INT", {"default": 0, "min": 0, "step": 1}),
                "load_always": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    OUTPUT_IS_LIST = (True, True)

    FUNCTION = "load_images"

    CATEGORY = "image"

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if 'load_always' in kwargs and kwargs['load_always']:
            return float("NaN")
        else:
            return hash(frozenset(kwargs))

    def load_images(self, directory: str, image_load_cap: int = 0, start_index: int = 0, load_always=False):
        if not os.path.isdir(directory):
            raise FileNotFoundError(f"Directory '{directory}' cannot be found.")
        dir_files = os.listdir(directory)
        if len(dir_files) == 0:
            raise FileNotFoundError(f"No files in directory '{directory}'.")

        # Filter files by extension
        valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
        dir_files = [f for f in dir_files if any(f.lower().endswith(ext) for ext in valid_extensions)]

        dir_files = sorted(dir_files)
        dir_files = [os.path.join(directory, x) for x in dir_files]

        # start at start_index
        dir_files = dir_files[start_index:]

        images = []
        masks = []

        limit_images = False
        if image_load_cap > 0:
            limit_images = True
        image_count = 0

        for image_path in dir_files:
            if os.path.isdir(image_path) and os.path.ex:
                continue
            if limit_images and image_count >= image_load_cap:
                break
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]

            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

            images.append(image)
            masks.append(mask)
            image_count += 1

        return images, masks

```
