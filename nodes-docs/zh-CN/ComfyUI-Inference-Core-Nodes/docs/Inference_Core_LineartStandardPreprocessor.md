
# Documentation
- Class name: Inference_Core_LineartStandardPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_LineartStandardPreprocessor节点是一个专为线条提取而设计的图像预处理工具。它通过应用高斯模糊和强度阈值处理来增强线条艺术特征，为后续处理做好准备。这个节点在提取和突出图像中的线条特征方面发挥着关键作用，为进一步的图像分析或处理奠定基础。

# Input types
## Required
- image
    - 这是需要进行线条提取处理的输入图像，是节点操作的主要数据来源。图像的质量和特性将直接影响线条提取的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- guassian_sigma
    - 这个参数可能用于控制高斯模糊的程度，影响线条的平滑度和细节保留。具体作用和数值范围需要进一步确认。
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- intensity_threshold
    - 这个参数决定了强度区分的阈值。它通过设置一个强度临界值，帮助将线条艺术与背景区分开来。适当的阈值设置可以有效提取出清晰的线条。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定了图像处理应该执行的分辨率。这个参数直接影响输出线条艺术的细节水平。较高的分辨率可以保留更多细节，但也可能增加处理时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过增强的线条艺术特征图像，已经为进一步的处理或分析做好了准备。这个图像突出了原始图像中的线条元素，便于后续的图像处理任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Lineart_Standard_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            guassian_sigma=("FLOAT", {"default": 6.0, "min": 0.0, "max": 100.0}),
            intensity_threshold=("INT", {"default": 8, "min": 0, "max": 16})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, guassian_sigma, intensity_threshold, resolution=512, **kwargs):
        from controlnet_aux.lineart_standard import LineartStandardDetector
        return (common_annotator_call(LineartStandardDetector(), image, guassian_sigma=guassian_sigma, intensity_threshold=intensity_threshold, resolution=resolution), )

```
