
# Documentation
- Class name: Inference_Core_TilePreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False
- Repo Ref: https://github.com/Mikubill/sd-webui-controlnet

Tile Preprocessor节点旨在通过应用分块机制来增强图像输入以便进一步处理。这涉及检测和调整图像块，以提高输入图像在管道后续阶段（特别是在控制网络中）的质量和一致性。

# Input types
## Required
- image
    - 需要处理和增强的输入图像。它作为主要数据，用于执行分块检测和调整操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- pyrUp_iters
    - 指定金字塔上采样过程的迭代次数，影响分块调整的粒度。该参数在决定应用于输入图像的调整的细节级别和规模方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 输出图像的目标分辨率，影响处理后的最终尺寸和细节水平。它决定了图像在预处理步骤中如何调整大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 生成输入图像的增强版本，其中应用了分块调整以提高其在后续处理步骤中的适用性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
