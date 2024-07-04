
# Documentation
- Class name: HEDPreprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点为SEGS（语义边缘引导合成）提供了一个使用HED（整体嵌套边缘检测）算法的预处理器。它旨在通过全面检测边缘来预处理图像，从而增强SEGS应用的输入。HED算法能够以整体的方式捕捉图像中的边缘信息，这对于后续的语义边缘引导合成任务非常有价值。

# Input types
## Required
- safe
    - 该参数决定预处理是否应在安全模式下执行。安全模式可能会影响边缘检测的结果，可能会采取更保守的处理方法以避免潜在的错误或异常。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- segs_preprocessor
    - 输出是一个经过预处理的对象，专门为SEGS应用定制，特别针对边缘检测增强进行了优化。这个预处理器可以直接用于后续的SEGS相关任务，提供高质量的边缘信息输入。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class HEDPreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "safe": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"})
            }
        }
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, "HEDPreprocessor")
        return (obj, )

```
