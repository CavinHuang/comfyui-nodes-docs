# Documentation
- Class name: `LoadImagesFromDirectory`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/deprecated`
- Output node: `False`

此节点旨在从指定目录加载图像，处理各种图像格式，并可选择性地应用诸如EXIF方向校正和转换为一致的颜色空间等变换。它支持加载有限数量的图像，还可以为具有透明度的图像生成掩码，使其适用于需要图像和掩码输入的任务。

## Input types
### Required
- **`directory`**
    - 要从中加载图像的目录路径。此参数至关重要，因为它决定了图像处理的来源。
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image_load_cap`**
    - 限制从目录中加载的图像数量，从而控制处理的数据量。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_index`**
    - 指定从目录中排序后的文件列表中加载的第一个图像的索引，允许选择性地加载图像。
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - 一批加载的图像，预处理后转换为张量。
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - 对应于加载图像的一批掩码，适用于分割任务。
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - 成功从目录加载的图像总数。
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown

## Source code
```python
class LoadImagesFromDirectory:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": ""}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "start_index": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "load_images"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/deprecated"

    def load_images(self, directory: str, image_load_cap: int = 0, start_index: int = 0):
        if not os.path.isdir(directory):
            raise FileNotFoundError(f"Directory '{directory} cannot be found.'")
        dir_files = os.listdir(directory)
        if len(dir_files) == 0:
            raise FileNotFoundError(f"No files in directory '{directory}'.")

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
            if os.path.isdir(image_path):
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
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            images.append(image)
            masks.append(mask)
            image_count += 1
        
        if len(images) == 0:
            raise FileNotFoundError(f"No images could be loaded from directory '{directory}'.")

        return (torch.cat(images, dim=0), torch.stack(masks, dim=0), image_count)
```