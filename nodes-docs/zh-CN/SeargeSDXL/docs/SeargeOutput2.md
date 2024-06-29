# Documentation
- Class name: SeargeOutput2
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在处理并解复用输入参数，将它们分配给特定的输出，以满足各种后处理和分析任务。

# Input types
## Required
- parameters
    - 该参数是一个包含节点操作所需所有输入的字典。它至关重要，因为它决定了节点的行为和它处理的数据。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 原始输入参数被传递，作为后续操作的基础。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- seed
    - 种子值对于确保输出生成过程的可重复性至关重要。
    - Comfy dtype: Int
    - Python dtype: int
- image_width
    - 此输出定义了生成图像的宽度，这对于图像处理和显示目的至关重要。
    - Comfy dtype: Int
    - Python dtype: int
- image_height
    - 此输出指定了图像的高度，这是确定图像尺寸和布局的关键因素。
    - Comfy dtype: Int
    - Python dtype: int
- steps
    - 步骤数输出指示过程的序列或进展，这可能会影响操作的复杂性和持续时间。
    - Comfy dtype: Int
    - Python dtype: int
- cfg
    - 配置参数保存对调整节点行为和输出特征至关重要的设置。
    - Comfy dtype: Float
    - Python dtype: float
- sampler_name
    - 采样器名称是一个字符串，用于识别使用的特定采样方法，这对于结果的准确性和多样性很重要。
    - Comfy dtype: Str
    - Python dtype: str
- scheduler
    - 调度器名称输出提供有关调度方法的信息，这对于资源管理和时间安排至关重要。
    - Comfy dtype: Str
    - Python dtype: str
- save_image
    - 这个布尔输出决定了是否保存图像，这对于保存操作结果具有重要意义。
    - Comfy dtype: Bool
    - Python dtype: bool
- save_directory
    - 保存目录输出指定了结果将被存储的位置，这对于组织和访问输出数据至关重要。
    - Comfy dtype: Str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'INT', 'INT', 'INT', 'INT', 'FLOAT', 'SAMPLER_NAME', 'SCHEDULER_NAME', 'ENABLE_STATE', 'SAVE_FOLDER')
    RETURN_NAMES = ('parameters', 'seed', 'image_width', 'image_height', 'steps', 'cfg', 'sampler_name', 'scheduler', 'save_image', 'save_directory')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        seed = parameters['seed']
        image_width = parameters['image_width']
        image_height = parameters['image_height']
        steps = parameters['steps']
        cfg = parameters['cfg']
        sampler_name = parameters['sampler_name']
        scheduler = parameters['scheduler']
        save_image = parameters['save_image']
        save_directory = parameters['save_directory']
        return (parameters, seed, image_width, image_height, steps, cfg, sampler_name, scheduler, save_image, save_directory)
```