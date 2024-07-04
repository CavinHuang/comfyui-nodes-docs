
# Documentation
- Class name: Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点提供了一个专门用于将漫画线稿转换为适合SEGS（语义边缘引导合成）应用的预处理器。它主要关注于将漫画风格的插图调整为可用于动画风格图像生成或修改的格式。

# Input types
## Required
本节点没有必需的输入参数。

# Output types
- segs_preprocessor
    - 输出是一个预处理器，配置用于将漫画线稿转换为动画风格的格式，可直接用于SEGS应用中的后续处理或生成任务。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: AnimeLineArt_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = Manga2Anime_LineArt_Preprocessor_wrapper()
        return (obj, )

```
