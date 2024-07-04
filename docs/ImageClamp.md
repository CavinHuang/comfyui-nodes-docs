# Documentation
- Class name: ImageClamp
- Category: clamp
- Output node: False

ImageClamp节点旨在在数据处理管道中作为过渡或检查点，用于通过原始图像数据而不进行修改。它确保了图像数据符合预期的格式或标准，而不会改变内容。

## Input types
### Required
- **image**
    - 'image'输入类型代表将未经修改地通过节点的图像数据。它用作确保管道中数据符合预期格式或标准的机制。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Output types
- **image**
    - Comfy dtype: IMAGE
    - 输出是未修改的图像数据，确保其在数据处理管道中符合预期的格式或标准。
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: CPU
- Common nodes: unknown


## Source code
```python
class ImageClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, image):
        return (image,)
```