# Documentation
- Class name: SeargeInput2
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeInput2节点旨在处理图像处理任务的初始输入。它负责配置和启动定义图像特征的参数，例如其尺寸、处理步骤的数量以及将指导处理算法的配置设置。该节点抽象了设置这些参数的复杂性，为用户提供了一个简化的接口，用于输入图像生成或操作所需的数据。

# Input types
## Required
- seed
    - ‘seed’参数对于图像生成过程至关重要，因为它确保了结果的可复现性。它作为随机数生成的起点，影响最终的输出图像。这个参数的重要性在于其能够控制随机性并在不同运行中实现一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- image_width
    - ‘image_width’参数指定了生成图像所需的宽度。它在确定图像的整体尺寸方面起着重要作用，这可以影响细节水平和处理所需的计算资源。此参数对于设置视觉输出的规模至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- image_height
    - ‘image_height’参数定义了图像的垂直尺寸。与‘image_width’类似，它是图像分辨率的关键决定因素，并对细节和计算负载有影响。调整此参数可以控制图像的纵横比和整体大小。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - ‘steps’参数指的是图像处理算法将执行的迭代次数或步骤。它直接影响最终图像的质量和细节，更多的步骤通常会导致更精细的结果。这个参数对于平衡处理时间和输出质量之间的权衡至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数，代表配置设置，用于微调图像处理算法。它影响图像生成的各个方面，如清晰度和某些特征的存在。这个参数对于实现所需的视觉效果并确保输出满足特定要求很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数选择图像生成中随机过程使用的采样方法。它对于确定生成图像的随机性和多样性很重要。采样器的选择可以显著影响最终输出的风格和特征。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - ‘scheduler’参数确定图像生成过程的调度策略。它决定算法如何通过步骤进展，这可以影响效率和最终结果。此参数对于优化生成过程并在给定时间框架内获得最佳结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- save_image
    - ‘save_image’参数指示是否应将生成的图像保存到文件中。它控制图像处理后的行动，对于希望保留输出以供进一步使用或分析的用户来说很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- save_directory
    - ‘save_directory’参数指定将保存生成图像的位置。它对于组织输出和确保用户可以轻松访问和管理其文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- inputs
    - ‘inputs’参数是一个可选的字典，允许用户为图像处理任务提供额外的设置或参数。它提供灵活性和定制性，使用户能够根据特定要求调整节点的行为。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - ‘parameters’输出包含由SeargeInput2节点处理的配置和输入集。它封装了图像处理后续阶段所需的所有必要信息，确保从输入到执行的顺利过渡。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'image_width': ('INT', {'default': 1024, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'image_height': ('INT', {'default': 1024, 'min': 0, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'steps': ('INT', {'default': 20, 'min': 0, 'max': 200}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 30.0, 'step': 0.5}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'ddim'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'ddim_uniform'}), 'save_image': (SeargeParameterProcessor.STATES, {'default': SeargeParameterProcessor.STATES[1]}), 'save_directory': (SeargeParameterProcessor.SAVE_TO, {'default': SeargeParameterProcessor.SAVE_TO[0]})}, 'optional': {'inputs': ('PARAMETER_INPUTS',)}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, seed, image_width, image_height, steps, cfg, sampler_name, scheduler, save_image, save_directory, inputs=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['seed'] = seed
        parameters['image_width'] = image_width
        parameters['image_height'] = image_height
        parameters['steps'] = steps
        parameters['cfg'] = cfg
        parameters['sampler_name'] = sampler_name
        parameters['scheduler'] = scheduler
        parameters['save_image'] = save_image
        parameters['save_directory'] = save_directory
        return (parameters,)
```