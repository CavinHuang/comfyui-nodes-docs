
# Documentation
- Class name: JWImageSaveToPath
- Category: jamesWalker55
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

JWImageSaveToPath节点设计用于将单个图像保存到指定路径，可选择在图像文件中嵌入额外的元数据，如提示词或其他PNG特定信息。

# Input types
## Required
- path
    - 指定保存图像的文件系统路径。该路径决定了输出图像的位置和文件名。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 要保存的图像数据。这个张量以可处理和保存到指定路径的格式表示图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- overwrite
    - 一个标志，指示是否应覆盖指定路径上的现有文件。如果设置为"true"，现有文件将被新图像替换。
    - Comfy dtype: ['false', 'true']
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
