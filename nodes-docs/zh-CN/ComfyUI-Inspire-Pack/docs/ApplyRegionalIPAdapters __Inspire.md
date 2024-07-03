
# Documentation
- Class name: ApplyRegionalIPAdapters __Inspire
- Category: InspirePack/Regional
- Output node: False

该节点旨在将区域性IP适配器应用于模型，从而实现基于区域适配的模型输出定制和增强。它促进了各种IP适配器组件与模型的无缝集成，使得模型能够根据特定区域或方面进行动态调整和性能改进。

# Input types
## Required
- ipadapter_pipe
    - 区域适配过程所需的组件管道,以元组形式提供。该参数对于确保适配过程所需的所有必要元素都可用至关重要。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: Tuple[IPADAPTER, MODEL, CLIP_VISION, INSIGHTFACE, Callable]
- regional_ipadapter1
    - 用于目标修改和增强的区域性IP适配器。这个参数允许对模型的特定区域或方面进行精细调整，从而提高模型在这些区域的性能。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: REGIONAL_IPADAPTER

# Output types
- model
    - 应用了区域性IP适配器的修改后模型，反映了定制化的增强和适配效果。这个输出代表了经过区域性调整和优化的模型，可以在后续任务中使用。
    - Comfy dtype: MODEL
    - Python dtype: MODEL


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ApplyRegionalIPAdapters:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "ipadapter_pipe": ("IPADAPTER_PIPE",),
                    "regional_ipadapter1": ("REGIONAL_IPADAPTER", ),
                    },
                }

    RETURN_TYPES = ("MODEL", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, **kwargs):
        ipadapter_pipe = kwargs['ipadapter_pipe']
        ipadapter, model, clip_vision, insightface, lora_loader = ipadapter_pipe

        del kwargs['ipadapter_pipe']

        for k, v in kwargs.items():
            ipadapter_pipe = ipadapter, model, clip_vision, insightface, lora_loader
            model = v.doit(ipadapter_pipe)

        return (model, )

```
