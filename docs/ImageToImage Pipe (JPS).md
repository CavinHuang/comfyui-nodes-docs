
# Documentation
- Class name: ImageToImage Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

ImageToImage Pipe节点旨在处理图像到图像的设置，提取并返回与图像转换过程相关的各种参数。它抽象了配置图像到图像操作设置的复杂性，为指定和检索转换参数提供了一个简化的接口。

# Input types
## Required
- img2img_settings
    - 指定图像到图像转换的设置，包括强度以及用于修复、反采样和其他相关过程的配置。它对于定义图像如何被处理和转换至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, float, int, float, float, comfy.samplers.KSampler.SAMPLERS, comfy.samplers.KSampler.SCHEDULERS]

# Output types
- img2img_strength
    - 图像到图像转换的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inpaint_strength
    - 转换过程中修复的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inpaint_grow_mask
    - 指定修复遮罩应该扩大多少。
    - Comfy dtype: INT
    - Python dtype: int
- unsampler_strength
    - 反采样过程的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unsampler_cfg
    - 反采样过程的配置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unsampler_sampler
    - 反采样过程中使用的采样器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: comfy.samplers.KSampler.SAMPLERS
- unsampler_scheduler
    - 用于反采样的调度器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: comfy.samplers.KSampler.SCHEDULERS


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageToImage_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img2img_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("FLOAT", "FLOAT", "INT", "FLOAT", "FLOAT", comfy.samplers.KSampler.SAMPLERS, comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("img2img_strength", "inpaint_strength", "inpaint_grow_mask", "unsampler_strength", "unsampler_cfg", "unsampler_sampler", "unsampler_scheduler",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,img2img_settings):
        
        img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler = img2img_settings

        return(img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler,)

```
