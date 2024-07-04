
# Documentation
- Class name: ImageDirIterator
- Category: cspnodes
- Output node: False

ImageDirIterator节点设计用于遍历指定目录中的图像,并允许通过索引检索图像。这项功能特别适用于需要顺序或随机访问图像集合的应用,例如图像处理流程或机器学习模型的数据加载。

# Input types
## Required
- directory_path
    - 指定包含要遍历的图像的目录路径。这个路径对于定位和访问图像文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- image_index
    - 确定要从目录中排序的图像文件列表中检索的图像索引。该索引使用模运算进行包装,以确保它在可用图像的有效范围内。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 返回指定索引处图像的张量表示,经过预处理并准备好进行进一步处理或作为模型输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDirIterator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {}),
                "image_index": ("INT", {"default": 0})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "get_image_by_index"
    CATEGORY = "cspnodes"

    def get_image_by_index(self, directory_path, image_index):
        # Get list of image files sorted by modification time (most recent first)
        image_files = sorted(
            [os.path.join(directory_path, f) for f in os.listdir(directory_path)
             if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))],
            key=lambda x: os.path.getmtime(x),
            reverse=True
        )

        # Wrap the index around using modulo
        image_index = image_index % len(image_files)

        # Load and preprocess the image
        image = Image.open(image_files[image_index])
        image = ImageOps.exif_transpose(image)  # Correct orientation
        image = image.convert("RGB")  # Ensure image is in RGB format

        # Convert image to tensor
        image_tensor = torch.from_numpy(np.array(image).astype(np.float32) / 255.0)[None,]

        return (image_tensor,)

```
