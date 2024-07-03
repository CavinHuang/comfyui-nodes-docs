
# Documentation
- Class name: TilePreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False

TilePreprocessor节点旨在通过应用平铺效果来提升图像质量。它通过平铺处理来预处理图像，为后续的处理或分析做准备，主要关注于改善视觉效果或提取特定特征。

# Input types
## Required
- image
    - 需要处理的输入图像。它是应用平铺效果的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- pyrUp_iters
    - 指定金字塔上采样过程的迭代次数，这会影响应用于图像的平铺效果的强度。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 输出图像的目标分辨率。这个参数会影响处理后图像的最终大小和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出经过平铺预处理的图像，可能会增强某些特征或方面以便进行进一步分析。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


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
