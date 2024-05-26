# Documentation
- Class name: WAS_Image_Tile_Batch
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Tile_Batch 节点的 `tile_image` 方法旨在将单个图像划分为指定数量的较小图块。它智能地管理划分，以保持纵横比，并确保在图像上平等地分布图块。这种功能特别适用于需要详细查看图像或以更易管理的方式处理大图像的应用。

# Input types
## Required
- image
    - 'image' 参数是节点的主要输入，代表要被划分为图块的图像。它的作用至关重要，因为节点的整个操作都围绕处理这张图像展开。输入图像的质量和特性直接影响输出的图块。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- num_tiles
    - 'num_tiles' 参数决定了输入图像将被划分为的图块总数。它是一个可选参数，默认值为6，允许用户指定平铺过程的粒度。这个参数显著影响输出图块的大小和数量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGES
    - 'IMAGES' 输出参数代表从输入图像生成的图块集合。每个图块都是原始图像的一部分，集合的排列反映了由 'num_tiles' 参数定义的结构。这个输出很重要，因为它是节点处理的直接结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Tile_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'num_tiles': ('INT', {'default': 4, 'max': 64, 'min': 2, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('IMAGES',)
    FUNCTION = 'tile_image'
    CATEGORY = 'WAS Suite/Image/Process'

    def tile_image(self, image, num_tiles=6):
        image = tensor2pil(image.squeeze(0))
        (img_width, img_height) = image.size
        num_rows = int(num_tiles ** 0.5)
        num_cols = (num_tiles + num_rows - 1) // num_rows
        tile_width = img_width // num_cols
        tile_height = img_height // num_rows
        tiles = []
        for y in range(0, img_height, tile_height):
            for x in range(0, img_width, tile_width):
                tile = image.crop((x, y, x + tile_width, y + tile_height))
                tiles.append(pil2tensor(tile))
        tiles = torch.stack(tiles, dim=0).squeeze(1)
        return (tiles,)
```