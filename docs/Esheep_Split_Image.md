# Documentation
- Class name: EsheepImageSplit
- Category: tests
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点旨在根据指定的列和行将图像分割成网格状的瓦片，便于以更易于管理的方式处理大型图像。通过将图像分解成更小的部分，它增强了工作流程，允许进行更集中的分析和操作。

# Input types
## Required
- images
    - 图像参数至关重要，因为它提供了节点操作的源数据。它是主要的输入，决定了后续的处理和输出瓦片的生成。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- columns
    - 列数决定了图像水平分割的方式，直接影响到生成的瓦片的排列和数量。它是控制图像分割粒度的一个重要参数。
    - Comfy dtype: INT
    - Python dtype: int
- lines
    - 与列数类似，行数决定了图像的垂直分割，影响瓦片的形状和数量。它与列数参数共同定义了网格结构。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出是由输入图像分割生成的瓦片集合。它代表了节点操作的主要结果，以一种可以在下游任务中进一步利用的格式封装了处理后的数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class EsheepImageSplit:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'columns': ('INT', {'default': 2, 'min': 1, 'max': 100, 'step': 1, 'display': 'number'}), 'lines': ('INT', {'default': 3, 'min': 1, 'max': 100, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'execute'
    CATEGORY = 'tests'

    def execute(self, images, columns, lines):
        image = images[0]
        i = 255.0 * image.cpu().numpy()
        pil_image = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
        imgwidth = pil_image.size[0]
        imgheight = pil_image.size[1]
        M = int(imgwidth / columns)
        N = int(imgheight / lines)
        tiles = []
        for i in range(0, imgheight - imgheight % N, N):
            for j in range(0, imgwidth - imgwidth % M, M):
                box = (j, i, j + M, i + N)
                tiles.append(pil_image.crop(box))
        t_tiles = []
        for tile in tiles:
            t_tile = tile.convert('RGB')
            t_tile = np.array(t_tile).astype(np.float32) / 255.0
            t_tile = torch.from_numpy(t_tile)[None,]
            t_tiles.append(t_tile)
        s = t_tiles[0]
        for i in range(1, len(t_tiles)):
            s = torch.cat((s, t_tiles[i]), dim=0)
        return (s,)
```