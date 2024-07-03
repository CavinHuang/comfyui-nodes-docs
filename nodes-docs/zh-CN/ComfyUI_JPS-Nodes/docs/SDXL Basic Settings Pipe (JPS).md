
# Documentation
- Class name: SDXL Basic Settings Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

该节点处理SDXL的基本设置，将结构化的设置输入转换为图像生成过程中必需的特定输出值。它封装了解析和转换与分辨率、采样和图像优化参数相关的设置的功能，将其转换为下游流程或组件可以使用的格式。

# Input types
## Required
- sdxl_basic_settings
    - 代表SDXL的基本设置，包括分辨率、采样和图像优化参数。这对于确定配置图像生成过程的输出值至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, int, str, str, int, int, float, float, float, float, int, int, str, int]

# Output types
- image_res
    - 生成图像的分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 生成图像的宽度（以像素为单位）。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 生成图像的高度（以像素为单位）。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_name
    - 用于图像生成的采样器名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 与采样器一起用于图像生成的调度器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps_total
    - 图像生成过程的总步骤数。
    - Comfy dtype: INT
    - Python dtype: int
- step_split
    - 图像生成过程中使用的步骤分割值。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 图像生成过程中使用的CFG比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_rescale
    - CFG重缩放值，用于调整CFG对过程的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_refiner
    - CFG优化器比例，用于优化CFG的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ascore_refiner
    - ascore优化器值，用于优化ascore的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- res_factor
    - 分辨率因子，影响整体图像分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- clip_skip
    - 生成过程中CLIP模型跳过的次数。
    - Comfy dtype: INT
    - Python dtype: int
- filename
    - 生成图像的文件名。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Basic_Settings_Pipe:
    resolution = ["square - 1024x1024 (1:1)","landscape - 1152x896 (4:3)","landscape - 1216x832 (3:2)","landscape - 1344x768 (16:9)","landscape - 1536x640 (21:9)", "portrait - 896x1152 (3:4)","portrait - 832x1216 (2:3)","portrait - 768x1344 (9:16)","portrait - 640x1536 (9:21)"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sdxl_basic_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT","INT","INT",comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,"INT","INT","FLOAT","FLOAT","FLOAT","FLOAT","INT","INT","STRING",)
    RETURN_NAMES = ("image_res","width","height","sampler_name","scheduler","steps_total","step_split","cfg","cfg_rescale","cfg_refiner","ascore_refiner","res_factor","clip_skip","filename",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,sdxl_basic_settings):
        
        width, height, sampler_name, scheduler, steps_total, step_split, cfg, cfg_rescale, cfg_refiner, ascore_refiner, res_factor, clip_skip, filename,image_res = sdxl_basic_settings

        return(int(image_res), int(width), int(height), sampler_name, scheduler, int(steps_total), int(step_split), float(cfg), float(cfg_rescale), float(cfg_refiner), float(ascore_refiner), int (res_factor), int(clip_skip), str(filename),)

```
