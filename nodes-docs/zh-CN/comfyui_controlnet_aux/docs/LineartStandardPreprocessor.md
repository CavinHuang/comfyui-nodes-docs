
# Documentation
- Class name: LineartStandardPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

LineartStandardPreprocessor节点旨在使用标准方法从图像中提取线稿。它预处理图像以突出和细化线条细节，适用于需要清晰线条描绘的应用，如数字艺术和动画。

# Input types
## Required
- image
    - 需要进行线稿提取处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: Image
## Optional
- guassian_sigma
    - 指定应用于图像的高斯模糊的sigma值，影响提取线条的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- intensity_threshold
    - 决定强度差异的阈值，影响线稿与背景的区分。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 处理前将输入图像调整到的分辨率，影响提取线稿的细节级别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出一张线条增强和细化后的图像，适合进一步处理或直接用于各种应用。
    - Comfy dtype: IMAGE
    - Python dtype: Image


## Usage tips
- Infra type: `CPU`
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
