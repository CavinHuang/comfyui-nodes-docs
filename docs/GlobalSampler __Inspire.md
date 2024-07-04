
# Documentation
- Class name: GlobalSampler __Inspire
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

GlobalSampler __Inspire节点旨在Inspire Pack框架内整合各种先进的采样技术，用于图像生成和处理。它利用一系列复杂的采样器和调度器，提供了一种多功能且可定制的方法来生成或修改图像，以满足广泛的创意和技术需求。

# Input types
## Required
- sampler_name
    - 指定要使用的采样器，允许从Inspire Pack框架内预定义的各种采样策略中进行选择。这个选择对最终生成的图像质量和特征有重大影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 决定用于控制采样过程的调度器，影响图像生成的进程和质量。合适的调度器选择可以优化生成过程，提高输出效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GlobalSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                "scheduler": (common.SCHEDULERS, ),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
