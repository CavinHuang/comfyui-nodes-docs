---
tags:
- Image
- Tiled
---

# Tile
## Documentation
- Class name: `TilePreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The TilePreprocessor node is designed to enhance image quality by applying a tiling effect. It preprocesses images for further processing or analysis, focusing on improving the visual aspects or extracting specific features through tiling.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the primary data for the tiling effect application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`pyrUp_iters`**
    - Specifies the number of iterations for the pyramid upscaling process, which affects the intensity of the tiling effect applied to the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The target resolution for the output image. This parameter influences the final size and quality of the processed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs an image that has undergone the tiling preprocessing, potentially enhancing certain features or aspects for further analysis.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [CR Thumbnail Preview](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Thumbnail Preview.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



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
