---
tags:
- Image
- Tiled
---

# [Inference.Core] Tile
## Documentation
- Class name: `Inference_Core_TilePreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The Tile Preprocessor node is designed to enhance image inputs for further processing by applying a tiling mechanism. This involves detecting and adjusting image tiles to improve the quality and consistency of the input images for subsequent stages in a pipeline, particularly in control networks.
## Input types
### Required
- **`image`**
    - The input image to be processed and enhanced through the tiling mechanism. It serves as the primary data upon which the tile detection and adjustment operations are performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`pyrUp_iters`**
    - Specifies the number of iterations for the pyramid upscaling process, affecting the granularity of the tile adjustment. This parameter plays a crucial role in determining the level of detail and the scale of adjustments applied to the input image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The target resolution for the output image, influencing the final size and detail level after processing. It determines how the image is resized as part of the preprocessing steps.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an enhanced version of the input image, where tiling adjustments have been applied to improve its suitability for further processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Tile_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            pyrUp_iters = ("INT", {"default": 3, "min": 1, "max": 10, "step": 1})
        )
        

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/others"

    def execute(self, image, pyrUp_iters, resolution=512, **kwargs):
        from controlnet_aux.tile import TileDetector

        return (common_annotator_call(TileDetector(), image, pyrUp_iters=pyrUp_iters, resolution=resolution),)

```
