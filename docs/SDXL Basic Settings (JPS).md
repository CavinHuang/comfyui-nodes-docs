
# Documentation
- Class name: SDXL Basic Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SDXL Basic Settings (JPS) 节点用于配置 SDXL 图像生成的基本设置，包括分辨率、采样器、调度器以及与图像优化和生成步骤相关的各种参数。它简化了这些参数的设置过程，为用户提供了一个简洁的接口，使其能够轻松调整影响生成图像质量和特征的核心设置。

# Input types
## Required
- resolution
    - 从预定义的分辨率列表中选择所需的图像生成分辨率。此设置直接影响输出图像的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sampler_name
    - 确定用于图像生成的采样器，影响采样过程和生成图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定管理采样过程的调度器，影响生成步骤的执行方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps_total
    - 图像生成过程中使用的总步数，影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- base_percentage
    - 定义在初始步骤中生成的图像基础百分比，影响图像细节的演进。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制生成过程的配置参数，影响生成图像的连贯性和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_rescale
    - 用于重新缩放配置值的参数，允许对生成过程进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_refiner
    - 调整用于优化生成过程的配置，提高最终图像的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ascore_refiner
    - 优化 ascore 以调整生成图像的质量，影响最终图像的美学效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- res_factor
    - 用于调整生成图像分辨率的因子，影响整体图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- clip_skip
    - 确定在生成过程中要跳过的剪裁步骤数，影响最终图像输出。
    - Comfy dtype: INT
    - Python dtype: int
- filename
    - 生成图像的文件名，用于保存和识别输出文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- sdxl_basic_settings
    - 封装了 SDXL 图像生成的配置基本设置，包括分辨率、采样器、调度器以及各种图像优化和生成步骤的参数。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Basic_Settings:
    resolution = ["Use Image Resolution", "square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resolution": (s.resolution,),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "steps_total": ("INT", {"default": 60, "min": 20, "max": 250, "step": 5}),
                "base_percentage": ("INT", {"default": 80, "min": 5, "max": 100, "step": 5}),
                "cfg": ("FLOAT", {"default": 6.5, "min": 1, "max": 20, "step": 0.1}),
                "cfg_rescale": ("FLOAT", {"default": 0.00, "min": 0.00, "max": 1.00, "step": 0.05}),
                "cfg_refiner": ("FLOAT", {"default": 6.5, "min": 0, "max": 20, "step": 0.1}),
                "ascore_refiner": ("FLOAT", {"default": 6, "min": 1, "max": 10, "step": 0.5}),
                "res_factor": ("INT", {"default": 4, "min": 1, "max": 8, "step": 1}),
                "clip_skip": ("INT", {"default": -2, "min": -24, "max": -1}),
                "filename": ("STRING", {"default": "JPS"}),
        }}
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("sdxl_basic_settings",)
    FUNCTION = "get_values"

    CATEGORY="JPS Nodes/Settings"

    def get_values(self,resolution,sampler_name,scheduler,steps_total,base_percentage,cfg,cfg_rescale,cfg_refiner,ascore_refiner,res_factor,clip_skip,filename):
        width = 1024
        height = 1024
        width = int(width)
        height = int(height)
        steps_total = int(steps_total)
        step_split = steps_total * base_percentage / 100
        cfg = float(cfg)
        cfg_rescale = float(cfg_rescale)
        cfg_refiner = float (cfg_refiner)
        ascore_refiner = float (ascore_refiner)
        res_factor = int (res_factor)
        base_percentage = int (base_percentage)
        image_res = 1

        if(resolution == "Use Image Resolution"):
            image_res = 2
        if(resolution == "square - 1024x1024 (1:1)"):
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

        if(cfg_refiner == 0):
            cfg_refiner = cfg
        
        sdxl_basic_settings = width, height, sampler_name, scheduler, steps_total, step_split, cfg, cfg_rescale, cfg_refiner, ascore_refiner, res_factor, clip_skip, filename,image_res

        return(sdxl_basic_settings,)

```
