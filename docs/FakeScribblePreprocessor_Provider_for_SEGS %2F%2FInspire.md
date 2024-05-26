# Documentation
- Class name: FakeScribblePreprocessor_Provider_for_SEGS
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

FakeScribblePreprocessor_Provider_for_SEGS 节点旨在通过应用模拟涂鸦的预处理步骤来增强图像分割任务。该节点利用 HED（全卷积边缘检测）算法的能力来创建提示图像，这有助于分割过程。它特别适用于通过为分割模型提供额外的上下文信息来生成详细和清晰的分割图。

# Input types
## Required
- safe
    - 'safty' 参数决定是否应该在应用预处理时采取安全措施，以防止潜在的数据损坏或丢失。这对于确保预处理阶段输入数据的完整性至关重要。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - FakeScribblePreprocessor_Provider_for_SEGS 节点的输出是经过预处理步骤的图像。这个图像可以直接用作分割模型的输入，增强模型产生准确分割的能力。
    - Comfy dtype: image
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class FakeScribblePreprocessor_Provider_for_SEGS(HEDPreprocessor_Provider_for_SEGS):

    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, 'FakeScribblePreprocessor')
        return (obj,)
```