
# Documentation
- Class name: BinaryPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

BinaryPreprocessor节点旨在通过应用二值化阈值技术来预处理图像。该方法基于指定的阈值将图像转换为二值图像(黑白图像)，这对于突出某些特征或简化图像以便进一步处理非常有用。

# Input types
## Required
- image
    - image参数是要处理的输入图像。它是进行二值化阈值操作的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- bin_threshold
    - bin_threshold参数指定了将图像中的像素值转换为黑色或白色的临界值。高于此阈值的像素将变为白色，低于此阈值的像素将变为黑色，有助于从图像中提取显著特征。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - resolution参数指定了在应用二值化阈值之前将输入图像调整到的分辨率。这允许对原始分辨率不同的图像进行一致的处理。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的二值化(黑白)版本，其中转换是基于指定的bin_threshold值进行的。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
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
