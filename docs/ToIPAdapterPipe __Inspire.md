
# Documentation
- Class name: ToIPAdapterPipe __Inspire
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ToIPAdapterPipe 节点旨在创建一个集成各种组件的管道,如 IP 适配器、模型以及可选的视觉和人脸识别增强功能,形成一个统一的处理流程。这种设置有助于输入数据或模型的适配和增强,为进一步的处理或分析做好准备。

# Input types
## Required
- ipadapter
    - 'ipadapter' 参数对于指定要在管道中使用的 IP 适配器组件至关重要,它作为数据或模型适配的基础元素。
    - Comfy dtype: IPADAPTER
    - Python dtype: tuple(IPADAPTER)
- model
    - 'model' 参数用于识别要集成到管道中的特定模型,实现定制化的处理或分析。
    - Comfy dtype: MODEL
    - Python dtype: tuple(MODEL)
## Optional
- clip_vision
    - 'clip_vision' 参数可选择性地为管道添加视觉处理能力,增强模型对视觉数据的理解或解释。
    - Comfy dtype: CLIP_VISION
    - Python dtype: tuple(CLIP_VISION)
- insightface
    - 'insightface' 参数可选择性地将人脸识别技术整合到管道中,进一步丰富模型的分析能力。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: tuple(INSIGHTFACE)

# Output types
- ipadapter_pipe
    - 此输出代表组装完成的管道,封装了指定的 IP 适配器、模型以及任何可选的视觉和人脸识别增强功能。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: tuple(IPADAPTER, MODEL, CLIP_VISION, INSIGHTFACE, function)


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToIPAdapterPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipadapter": ("IPADAPTER", ),
                "model": ("MODEL",),
            },
            "optional": {
                "clip_vision": ("CLIP_VISION",),
                "insightface": ("INSIGHTFACE",),
            }
        }

    RETURN_TYPES = ("IPADAPTER_PIPE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, ipadapter, model, clip_vision, insightface=None):
        pipe = ipadapter, model, clip_vision, insightface, lambda x: x

        return (pipe,)

```
