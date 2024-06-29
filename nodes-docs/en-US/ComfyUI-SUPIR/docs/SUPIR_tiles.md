---
tags:
- Image
- Tiled
---

# SUPIR Tiles
## Documentation
- Class name: `SUPIR_tiles`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_tiles node is designed for tiling images, a process that divides a large image into smaller, manageable pieces or tiles. This functionality is essential for handling large images efficiently within the SUPIR framework, enabling detailed processing and analysis of each tile separately before reassembling them into the original image format. It supports operations such as previewing the tiling effect and potentially generating captions for each tile, facilitating a more granular approach to image analysis and manipulation.
## Input types
### Required
- **`image`**
    - The input image to be tiled. This parameter is crucial as it determines the source image that will be divided into smaller tiles for processing, directly impacting the tiling operation's outcome.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`tile_size`**
    - Defines the size of each tile. The tile size is a key factor in determining how the image is segmented into tiles, affecting both the number of tiles generated and the resolution of each tile, thereby influencing the granularity of processing and analysis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_stride`**
    - Specifies the stride for tiling. The tile stride affects how tiles are overlapped or spaced apart, playing a significant role in the coverage and redundancy of the tiling process, which can impact the comprehensiveness of the image analysis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image_tiles`**
    - Comfy dtype: `IMAGE`
    - The resulting set of image tiles. This output is a collection of smaller, segmented pieces of the original image, each processed individually.
    - Python dtype: `List[torch.Tensor]`
- **`tile_size`**
    - Comfy dtype: `INT`
    - The size of the tiles used in the tiling process. This output confirms the dimensions that were applied to segment the image into tiles, providing insight into the granularity of the analysis.
    - Python dtype: `int`
- **`tile_stride`**
    - Comfy dtype: `INT`
    - The stride used for the tiling process. This output indicates the spacing or overlap between tiles, offering details on the tiling pattern and coverage.
    - Python dtype: `int`
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
