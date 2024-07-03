
# Documentation
- Class name: ShufflePreprocessor
- Category: ControlNet Preprocessors/T2IAdapter-only
- Output node: False

ShufflePreprocessor节点旨在通过应用内容重排检测算法来预处理图像。这一预处理步骤对于需要识别或操作图像中重排内容的任务至关重要，它能增强模型识别和处理此类模式的能力。

# Input types
## Required
- image
    - 待处理的输入图像。它是应用内容重排检测算法的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image或numpy.ndarray
- resolution
    - 指定处理前将输入图像调整到的分辨率。这个参数可能会影响检测的准确性和性能。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成的种子值，确保重排检测过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用内容重排检测算法后的处理后图像。它呈现了原始图像中检测到的重排内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image或numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Shuffle_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": dict(
                image=("IMAGE",),
                resolution=("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                seed=("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})
            )
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "preprocess"

    CATEGORY = "ControlNet Preprocessors/T2IAdapter-only"

    def preprocess(self, image, resolution=512, seed=None):
        from controlnet_aux.shuffle import ContentShuffleDetector

        return (common_annotator_call(ContentShuffleDetector(), image, resolution=resolution, seed=seed), )

```
