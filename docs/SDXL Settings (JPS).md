
# Documentation
- Class name: SDXL Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

SDXL Settings (JPS)节点旨在配置和提供图像生成过程的关键设置，包括分辨率因子、采样器和调度器类型，以及其他对控制生成图像的输出质量和特性至关重要的参数。

# Input types
## Required
- resolution
    - 指定图像生成的分辨率设置，影响输出图像的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- res_factor
    - 确定分辨率因子，影响生成图像的细节水平和质量。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_name
    - 选择要使用的采样器，影响图像生成过程的采样方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择调度器类型，影响图像生成步骤的调度策略。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 定义图像生成过程的总步骤数，影响输出图像的精细程度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 设置配置值，调整生成过程的行为和输出特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_rescale
    - 指定配置的重新缩放值，修改配置对生成过程的影响方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_skip
    - 指示要跳过的剪辑数量，影响图像生成的处理过程。
    - Comfy dtype: INT
    - Python dtype: int
- filename
    - 生成图像的文件名，决定输出文件的名称。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- sdxl_settings
    - 封装了用于SDXL图像生成过程的全面设置集，包括分辨率、采样器、调度器和其他配置。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Settings:
    resolution = ["Use Image Resolution", "square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resolution": (s.resolution,),
                "res_factor": ("INT", {"default": 4, "min": 1, "max": 8, "step": 1}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "steps": ("INT", {"default": 60, "min": 20, "max": 250, "step": 5}),
                "cfg": ("FLOAT", {"default": 6.5, "min": 1, "max": 20, "step": 0.1}),
                "cfg_rescale": ("FLOAT", {"default": 0.00, "min": 0.00, "max": 1.00, "step": 0.05}),
                "clip_skip": ("INT", {"default": -2, "min": -24, "max": -1}),
                "filename": ("STRING", {"default": "JPS"}),
        }}
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("sdxl_settings",)
    FUNCTION = "get_values"

    CATEGORY="JPS Nodes/Settings"

    def get_values(self,resolution,res_factor,sampler_name,scheduler,steps,cfg,cfg_rescale,clip_skip,filename):

        image_res = 1
        if(resolution == "Use Image Resolution"):
            image_res = 2

        width = 1024
        height = 1024
        if(resolution == "landscape - 1152x896 (4:3)"):
            width = 1152
            height = 896
        if(resolution == "landscape - 1216x832 (3:2)"):
            width = 1216
            height = 832
        if(resolution == "landscape - 1344x768 (16:9)"):
            width = 1344
            height = 768
        if(resolution == "landscape - 1536x640 (21:9)"):
            width = 1536
            height = 640
        if(resolution == "portrait - 896x1152 (3:4)"):
            width = 896
            height = 1152
        if(resolution == "portrait - 832x1216 (2:3)"):
            width = 832
            height = 1216
        if(resolution == "portrait - 768x1344 (9:16)"):
            width = 768
            height = 1344
        if(resolution == "portrait - 640x1536 (9:21)"):
            width = 640
            height = 1536

        sdxl_settings = width, height, res_factor, sampler_name, scheduler, steps, cfg, cfg_rescale, clip_skip, filename,image_res

        return(sdxl_settings,)

```
