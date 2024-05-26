# Documentation
- Class name: SeargeGenerationParameters
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

此类节点封装了通过搜索方法生成图像所需的参数。它通过允许用户指定关键属性，如种子、图像尺寸和采样预设，简化了配置过程，这些属性共同影响生成图像的质量和特征。

# Input types
## Required
- seed
    - 种子参数对于初始化随机数生成器至关重要，确保图像生成过程可复现。它决定了算法随机元素的起始点，因此在确定生成图像的独特性和一致性方面发挥着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- image_size_preset
    - 图像尺寸预设参数允许用户为生成的图像选择预定义的分辨率。这个选择直接影响图像的细节程度和图像生成所需的计算资源，更高分辨率需要更多的处理能力。
    - Comfy dtype: COMBO
    - Python dtype: str
- image_width
    - 图像宽度参数指定了生成图像的水平尺寸。它是确定图像的宽高比和整体外观的关键因素，并且与图像高度参数共同作用以确定最终尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- image_height
    - 图像高度参数定义了生成图像的垂直尺寸。它与图像宽度一起，为图像生成过程设置了画布大小，影响了内容的规模和布局。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数指的是生成过程将经历的迭代次数。更多的步骤通常会产生更精细和详细的图像，但也会增加生成所需的计算成本和时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数，通常表示为'cfg'，是一个浮点值，用于调整图像质量与生成速度之间的平衡。较低的值可能会更快地生成图像，但细节较少，而较高的值可以在处理时间的代价下增强细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_preset
    - 采样器预设参数使用户能够从一组预定义的采样策略中选择。每个预设都旨在为特定类型的内容或期望的结果优化生成过程，影响生成图像的多样性和一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
- sampler_name
    - 采样器名称参数对于选择用于图像生成的特定算法至关重要。不同的采样器提供不同的图像精炼方法，影响最终输出的视觉风格和质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数决定了图像生成过程中采用的优化策略。它调节探索和利用之间的平衡，从而影响生成图像的收敛速度和质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- base_vs_refiner_ratio
    - 基础与精炼者比例参数调整图像生成的基础和精炼阶段之间的平衡。它影响计算资源在图像初始创建和随后增强图像细节之间的分配。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- data
    - 此节点的数据输出代表了包含生成参数的结构化信息流。它是图像生成过程的蓝图，封装了所有用户定义的设置，指导算法生成所需的图像。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: SRG_DATA_STREAM

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeGenerationParameters:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551600}), 'image_size_preset': (UI.RESOLUTION_PRESETS,), 'image_width': ('INT', {'default': 1024, 'min': 0, 'max': UI.MAX_RESOLUTION, 'step': 8}), 'image_height': ('INT', {'default': 1024, 'min': 0, 'max': UI.MAX_RESOLUTION, 'step': 8}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 200}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.5, 'max': 30.0, 'step': 0.5}), 'sampler_preset': (UI.SAMPLER_PRESETS,), 'sampler_name': (UI.SAMPLERS, {'default': 'dpmpp_2m'}), 'scheduler': (UI.SCHEDULERS, {'default': 'karras'}), 'base_vs_refiner_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(seed, image_size_preset, image_width, image_height, steps, cfg, sampler_preset, sampler_name, scheduler, base_vs_refiner_ratio):
        if sampler_preset == UI.SAMPLER_PRESET_DPMPP_2M_KARRAS:
            (sampler_name, scheduler) = ('dpmpp_2m', 'karras')
        elif sampler_preset == UI.SAMPLER_PRESET_EULER_A:
            (sampler_name, scheduler) = ('euler_ancestral', 'normal')
        elif sampler_preset == UI.SAMPLER_PRESET_DPMPP_2M_SDE_KARRAS:
            (sampler_name, scheduler) = ('dpmpp_2m_sde', 'karras')
        elif sampler_preset == UI.SAMPLER_PRESET_DPMPP_3M_SDE_EXPONENTIAL:
            (sampler_name, scheduler) = ('dpmpp_3m_sde', 'exponential')
        elif sampler_preset == UI.SAMPLER_PRESET_DDIM_UNIFORM:
            (sampler_name, scheduler) = ('ddim', 'ddim_uniform')
        return {UI.F_SEED: seed, UI.F_IMAGE_SIZE_PRESET: image_size_preset, UI.F_IMAGE_WIDTH: image_width, UI.F_IMAGE_HEIGHT: image_height, UI.F_STEPS: steps, UI.F_CFG: round(cfg, 3), UI.F_SAMPLER_PRESET: sampler_preset, UI.F_SAMPLER_NAME: sampler_name, UI.F_SCHEDULER: scheduler, UI.F_BASE_VS_REFINER_RATIO: round(base_vs_refiner_ratio, 3)}

    def get(self, seed, image_size_preset, image_width, image_height, steps, cfg, sampler_preset, sampler_name, scheduler, base_vs_refiner_ratio, data=None):
        if data is None:
            data = {}
        data[UI.S_GENERATION_PARAMETERS] = self.create_dict(seed, image_size_preset, image_width, image_height, steps, cfg, sampler_preset, sampler_name, scheduler, base_vs_refiner_ratio)
        return (data,)
```