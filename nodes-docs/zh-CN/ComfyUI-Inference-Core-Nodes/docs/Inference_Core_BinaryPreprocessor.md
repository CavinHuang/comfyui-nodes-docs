
# Documentation
- Class name: Inference_Core_BinaryPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Inference_Core_BinaryPreprocessor节点是一个专门用于图像预处理的工具，属于ControlNet预处理器/线条提取器类别。它的主要功能是基于给定的阈值将图像转换为二值格式。这个节点应用二值化阈值技术来提取图像中的重要线条或边缘，为后续的处理或分析提供基础。

# Input types
## Required
- image
    - 需要处理的输入图像。它是二值化阈值操作的主要数据来源，旨在从中提取重要的线条或边缘。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- bin_threshold
    - 指定图像二值化转换的阈值。它决定了将像素值分类为黑色或白色的临界点，在从图像中提取线条或边缘的过程中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 在应用二值化阈值之前，输入图像会被调整到这个分辨率。这个参数可以影响提取的线条或边缘的细节级别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的二值格式图像，其中重要的线条或边缘根据指定的二值阈值被突出显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Binary_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            bin_threshold=("INT", {"default": 100, "min": 0, "max": 255, "step": 1})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, bin_threshold, resolution=512, **kwargs):
        from controlnet_aux.binary import BinaryDetector

        return (common_annotator_call(BinaryDetector(), image, bin_threshold=bin_threshold, resolution=resolution), )

```
