
# Documentation
- Class name: Inference_Core_ShufflePreprocessor
- Category: ControlNet Preprocessors/T2IAdapter-only
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_ShufflePreprocessor节点用于通过应用内容重排操作来预处理图像。该操作旨在检测并可能重新排列图像中的元素，以增强或修改其内容，为进一步的处理步骤做准备，特别是在需要内容操作或增强的任务中。

# Input types
## Required
- image
    - 需要处理的图像。这是内容重排操作的主要输入，作为检测和重新排列图像内元素的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- resolution
    - 指定处理前应将图像调整到的分辨率。这影响重排操作的粒度，较高的分辨率允许进行更详细的操作。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 用于重排操作的随机数生成器的种子。这允许在不同运行之间重现重排效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用内容重排操作后的处理图像。这个输出可以用于进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
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
