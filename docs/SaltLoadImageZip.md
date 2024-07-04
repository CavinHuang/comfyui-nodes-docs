
# Documentation
- Class name: SaltLoadImageZip
- Category: SALT/Image/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltLoadImageZip节点专门用于从ZIP文件中加载并可选择性地调整图像大小。它支持多种图像格式，并可以将加载的图像连接成单个张量，便于在图像处理工作流程中使用。

# Input types
## Required
- path
    - 指定包含图像的ZIP归档文件的文件路径。这对于定位和访问所需处理的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- resize_images_to_first
    - 决定是否将所有加载的图像调整为与找到的第一张图像尺寸相匹配。这确保了图像尺寸的一致性，这在批处理或将图像用于神经网络时通常是必需的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- images
    - 输出是一个包含已加载（可能已调整大小）图像的张量，可供进一步处理或分析使用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltLoadImageZip:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {}),
                "resize_images_to_first": ("BOOLEAN", {"default": True})
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    CATEGORY = "SALT/Image/Loaders"
    FUNCTION = "load_images"

    def load_images(self, path: str, resize_images_to_first: bool = True):
        supported_formats = ('.png', '.jpg', '.jpeg', '.gif', '.tga', '.tiff', '.webp')
        images = []
        first_image_size = None
        
        with zipfile.ZipFile(path, 'r') as z:
            for file_name in z.namelist():
                if file_name.lower().endswith(supported_formats):
                    with z.open(file_name) as file:
                        image = Image.open(BytesIO(file.read()))
                        if first_image_size is None:
                            first_image_size = image.size
                        if image.size == first_image_size or resize_images_to_first:
                            images.append(image if image.size == first_image_size else self.resize_right(image, first_image_size))

        if not images:
            raise ValueError(f"The input zip `{path}` does not contain any valid images!")

        images = [pil2tensor(img) for img in images]
        images = torch.cat(images, dim=0)

        return (images, )

    def resize_right(self, image, target_size):
        img_ratio = image.width / image.height
        target_ratio = target_size[0] / target_size[1]
        resize_width, resize_height = (
            (target_size[0], round(target_size[0] / img_ratio)) if target_ratio > img_ratio else
            (round(target_size[1] * img_ratio), target_size[1])
        )
        image = image.resize((resize_width, resize_height), Image.Resampling.LANCZOS)
        x_crop, y_crop = (resize_width - target_size[0]) // 2, (resize_height - target_size[1]) // 2
        return image.crop((x_crop, y_crop, x_crop + target_size[0], y_crop + target_size[1]))

```
