
# Documentation
- Class name: ImageToImage Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

ImageToImage Settings节点旨在为JPS Nodes框架内的图像到图像转换任务配置和应用特定设置。它专注于调整影响输入图像如何被处理和转换为输出图像的参数，以满足图像处理的各种自定义需求。

# Input types
## Required
- img2img_strength
    - 指定图像到图像转换的强度，影响所应用变化的程度。
    - Comfy dtype: INT
    - Python dtype: int
- inpaint_strength
    - 决定修复绘制效果的强度，影响图像中缺失或不需要的部分如何被填充。
    - Comfy dtype: INT
    - Python dtype: int
- inpaint_grow_mask
    - 设置修复绘制蒙版扩展的程度，影响图像中被修复的区域范围。
    - Comfy dtype: INT
    - Python dtype: int
- unsampler_strength
    - 定义反采样过程的强度，影响输出图像中细节增强的程度。
    - Comfy dtype: INT
    - Python dtype: int
- unsampler_cfg
    - 指定反采样器的配置，影响算法的行为和输出质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unsampler_sampler
    - 选择反采样器使用的采样方法，影响输出图像的纹理和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- unsampler_scheduler
    - 选择反采样过程的调度算法，影响图像转换的进程和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- img2img_settings
    - 输出图像到图像转换的配置设置，封装了用于处理输入图像的所有调整。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, float, int, float, float, str, str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageToImage_Settings:
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img2img_strength": ("INT", {"default": 50, "min": 0, "max": 100, "step": 1}),
                "inpaint_strength": ("INT", {"default": 100, "min": 2, "max": 100, "step": 1}),
                "inpaint_grow_mask": ("INT", {"default": 20, "min": 0, "max": 200, "step": 2}),
                "unsampler_strength": ("INT", {"default": 30, "min": 0, "max": 100, "step": 1}),
                "unsampler_cfg": ("FLOAT", {"default": 1, "min": 1, "max": 10, "step": 0.1}),
                "unsampler_sampler": (comfy.samplers.KSampler.SAMPLERS,),
                "unsampler_scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("img2img_settings",)
    FUNCTION = "get_img2img"

    CATEGORY="JPS Nodes/Settings"

    def get_img2img(self, img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler,):

        img2img_strength = (img2img_strength + 0.001) / 100

        inpaint_strength = (100 - inpaint_strength + 0.001) / 100

        unsampler_strength = (unsampler_strength + 0.001) / 100
        
        img2img_settings = img2img_strength, inpaint_strength, inpaint_grow_mask, unsampler_strength, unsampler_cfg, unsampler_sampler, unsampler_scheduler

        return(img2img_settings,)

```
