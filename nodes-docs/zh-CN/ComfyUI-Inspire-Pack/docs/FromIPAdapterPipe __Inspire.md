
# Documentation
- Class name: FromIPAdapterPipe __Inspire
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

FromIPAdapterPipe节点旨在将一个预先构建的IP适配器管道拆解为其组成部分。该节点能够从一个捆绑的管道中提取单独的元素，如IP适配器、模型，以及CLIP视觉和InsightFace等额外功能，便于进一步操作或分析这些组件。

# Input types
## Required
- ipadapter_pipe
    - ipadapter_pipe参数代表了需要被拆解的捆绑管道。它对于启动拆解过程至关重要。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: tuple

# Output types
- ipadapter
    - 从捆绑管道中提取IP适配器组件。
    - Comfy dtype: IPADAPTER
    - Python dtype: object
- model
    - 从捆绑管道中获取模型组件。
    - Comfy dtype: MODEL
    - Python dtype: object
- clip_vision
    - 如果存在，从捆绑管道中提取CLIP视觉组件。
    - Comfy dtype: CLIP_VISION
    - Python dtype: object
- insight_face
    - 如果适用，从捆绑管道中获取InsightFace组件。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromIPAdapterPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipadapter_pipe": ("IPADAPTER_PIPE", ),
            }
        }

    RETURN_TYPES = ("IPADAPTER", "MODEL", "CLIP_VISION", "INSIGHTFACE")
    RETURN_NAMES = ("ipadapter", "model", "clip_vision", "insight_face")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, ipadapter_pipe):
        ipadapter, model, clip_vision, insightface, _ = ipadapter_pipe
        return ipadapter, model, clip_vision, insightface

```
