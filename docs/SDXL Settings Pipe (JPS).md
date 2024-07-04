
# Documentation
- Class name: SDXL Settings Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

SDXL Settings Pipe节点旨在处理并返回一组全面的图像生成设置，包括分辨率、采样、调度以及其他配置参数。它将图像生成各个方面的复杂配置抽象成一个简单的接口，使用户能够轻松指定和获取其图像生成任务的详细设置。

# Input types
## Required
- sdxl_settings
    - 作为综合输入，封装了SDXL图像生成过程所需的所有必要设置。它对于确定图像生成的配置和最终行为至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, int, int, int, str, str, int, float, float, int, str, int]

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
- res_factor
    - 影响生成图像分辨率的因子。
    - Comfy dtype: INT
    - Python dtype: int
- sampler_name
    - 用于图像生成的采样方法的名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 图像生成过程中使用的调度方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 图像生成过程中要采取的步骤数。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 影响生成过程的配置参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_rescale
    - 生成过程中用于重新缩放配置的参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_skip
    - 表示生成过程中要跳过的裁剪步骤数。
    - Comfy dtype: INT
    - Python dtype: int
- filename
    - 生成的图像将保存的文件名。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sdxl_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT","INT","INT","INT",comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,"INT","FLOAT","FLOAT","INT","STRING",)
    RETURN_NAMES = ("image_res","width","height","res_factor","sampler_name","scheduler","steps","cfg","cfg_rescale","clip_skip","filename",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,sdxl_settings):
        
        width, height, res_factor, sampler_name, scheduler, steps, cfg, cfg_rescale, clip_skip, filename,image_res = sdxl_settings

        return(int(image_res), int(width), int(height), int (res_factor), sampler_name, scheduler, int(steps), float(cfg), float(cfg_rescale), int(clip_skip), str(filename),)

```
