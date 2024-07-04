
# Documentation
- Class name: Sampler Selector
- Category: ImageSaverTools/utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Sampler Selector 节点旨在为图像生成任务动态选择和配置采样策略。它允许根据输入参数选择不同的采样算法，从而针对各种场景和偏好优化图像生成过程。

# Input types
## Required
- sampler_name
    - 指定要使用的采样器名称，影响图像生成任务的采样算法选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- sampler_name
    - 返回配置好的采样器对象的标识符，可直接用于图像生成任务。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImpactKSamplerBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ImpactKSamplerBasicPipe.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class SamplerSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (comfy.samplers.KSampler.SAMPLERS,)
    RETURN_NAMES = ("sampler_name",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"sampler_name": (comfy.samplers.KSampler.SAMPLERS,)}}

    def get_names(self, sampler_name):
        return (sampler_name,)

```
