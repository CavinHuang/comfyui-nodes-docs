
# Documentation
- Class name: IG Load Images
- Category: 🐓 IG Nodes/IO
- Output node: False
- Repo Ref: https://github.com/goyalayush0610/ComfyUI-Image-Generator

IG Load Images节点设计用于高效地从指定文件夹加载多个图像。它提供了限制加载图像数量、跳过初始图像和按指定间隔选择图像的选项。这一功能对于管理和预处理大型图像数据集以进行进一步分析或处理非常重要。

# Input types
## Required
- folder
    - 指定要从中加载图像的目录。这是一个必需的输入，用于确定图像的来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- image_load_cap
    - 限制从文件夹加载的图像数量。如果设置为0，则不限制。
    - Comfy dtype: INT
    - Python dtype: int
- skip_first_images
    - 从文件夹开头跳过指定数量的图像。用于从某个特定点开始加载过程。
    - Comfy dtype: INT
    - Python dtype: int
- select_every_nth
    - 从文件夹中每隔n个图像加载一个，允许按固定间隔有选择地加载图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从指定文件夹加载的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 与加载的图像相关联的蒙版（如果可用）。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- int
    - 从文件夹加载的图像总数。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_LoadImagesFromFolder:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "folder": ("STRING", {"forceInput": True}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "step": 1}),
                "skip_first_images": ("INT", {"default": 0, "min": 0, "step": 1}),
                "select_every_nth": ("INT", {"default": 1, "min": 1, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "main"

    CATEGORY = TREE_IO

    def main(self, folder: str, **kwargs):
        return load_images(folder, **kwargs)
    
    @classmethod
    def IS_CHANGED(s, folder: str, **kwargs):
        return is_changed_load_images(folder, **kwargs)

    # @classmethod
    # def VALIDATE_INPUTS(s, folder: str, **kwargs):
    #     return validate_load_images(folder, **kwargs)

```
