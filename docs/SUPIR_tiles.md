
# Documentation
- Class name: SUPIR_tiles
- Category: SUPIR
- Output node: False

SUPIR_tiles 节点专门用于图像分块处理。该过程将大型图像分割成更小、更易管理的块或瓦片。这一功能在 SUPIR 框架中对于高效处理大型图像至关重要，它允许对每个瓦片进行单独的详细处理和分析，然后再将它们重新组装成原始图像格式。该节点支持预览分块效果等操作，并可能为每个瓦片生成描述，从而实现更精细化的图像分析和操作方法。

# Input types
## Required
- image
    - 需要进行分块处理的输入图像。这个参数至关重要，因为它决定了将被分割成小块进行处理的源图像，直接影响分块操作的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- tile_size
    - 定义每个瓦片的大小。瓦片大小是决定图像如何被分割成瓦片的关键因素，影响生成的瓦片数量和每个瓦片的分辨率，从而影响处理和分析的精细度。
    - Comfy dtype: INT
    - Python dtype: int
- tile_stride
    - 指定分块的步幅。瓦片步幅影响瓦片之间的重叠或间隔程度，在分块过程中扮演重要角色，可能影响图像分析的全面性和冗余度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image_tiles
    - 生成的图像瓦片集。这个输出是原始图像的较小分割部分的集合，每个部分都经过单独处理。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- tile_size
    - 分块处理中使用的瓦片大小。这个输出确认了用于将图像分割成瓦片的尺寸，提供了分析精细度的洞察。
    - Comfy dtype: INT
    - Python dtype: int
- tile_stride
    - 分块处理中使用的步幅。这个输出表示瓦片之间的间隔或重叠程度，提供了分块模式和覆盖范围的详细信息。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_tiles:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "tile_size": ("INT", {"default": 512, "min": 64, "max": 8192, "step": 64}),
            "tile_stride": ("INT", {"default": 256, "min": 64, "max": 8192, "step": 64}),
          
            }
        }

    RETURN_TYPES = ("IMAGE", "INT", "INT",)
    RETURN_NAMES = ("image_tiles", "tile_size", "tile_stride",)
    FUNCTION = "tile"
    CATEGORY = "SUPIR"
    DESCRIPTION = """
Tiles the image with same function as the Tiled samplers use.  
Useful for previewing the tiling and generating captions per tile (WIP feature)
"""

    def tile(self, image, tile_size, tile_stride):

        def _sliding_windows(h: int, w: int, tile_size: int, tile_stride: int):
            hi_list = list(range(0, h - tile_size + 1, tile_stride))
            if (h - tile_size) % tile_stride != 0:
                hi_list.append(h - tile_size)

            wi_list = list(range(0, w - tile_size + 1, tile_stride))
            if (w - tile_size) % tile_stride != 0:
                wi_list.append(w - tile_size)

            coords = []
            for hi in hi_list:
                for wi in wi_list:
                    coords.append((hi, hi + tile_size, wi, wi + tile_size))
            return coords

        image = image.permute(0, 3, 1, 2)
        _, _, h, w = image.shape

        tiles_iterator = _sliding_windows(h, w, tile_size, tile_stride)

        tiles = []
        for hi, hi_end, wi, wi_end in tiles_iterator:
            tile = image[:, :, hi:hi_end, wi:wi_end]
            
            tiles.append(tile)
        out = torch.cat(tiles, dim=0).to(torch.float32).permute(0, 2, 3, 1)
        print(out.shape)
        print("len(tiles): ", len(tiles))
        
        return (out, tile_size, tile_stride,)

```
