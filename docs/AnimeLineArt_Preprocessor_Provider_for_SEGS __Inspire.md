
# Documentation
- Class name: AnimeLineArt_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点提供了一个专门为SEGS框架中的动漫线稿设计的预处理器。它有助于准备图像以进行进一步的处理或分析。这个预处理器特别适用于处理动漫风格的线条艺术，可以提取和增强图像中的线条特征，为后续的分割或控制网络任务做准备。

# Input types
## Required
该节点没有必需的输入参数。它是一个独立的预处理器提供者，不需要外部输入即可创建预处理器实例。

# Output types
- segs_preprocessor
    - 输出一个专为动漫线稿设计的预处理器实例，可直接在SEGS框架中使用。这个预处理器封装了特定的图像处理算法，能够有效地处理和优化动漫风格的线条艺术。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: AnimeLineArt_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimeLineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = AnimeLineArt_Preprocessor_wrapper()
        return (obj, )

```
