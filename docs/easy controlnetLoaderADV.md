# Documentation
- Class name: controlnetAdvanced
- Category: EasyUse/Loaders
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

controlnetAdvanced节点旨在便于应用控制网络来根据指定条件修改和增强图像数据。它通过将控制信号集成到图像处理流程中来运作，允许进行微调调整和条件性转换。

# Input types
## Required
- pipe
    - ‘pipe’参数至关重要，因为它携带了整个图像处理流水线数据，包括模型和样本。这对于节点的正确运作和产生期望的输出至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - ‘image’参数是将要被节点处理的输入图像。它是操作的基础，为所有转换和增强提供基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- control_net_name
    - ‘control_net_name’参数指定了用于图像处理的控制网络。它很重要，因为它决定了应用于图像的控制类型，影响最终结果。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
## Optional
- control_net
    - ‘control_net’参数是一个可选的控制网络输入，可以直接由用户提供。它提供了一种定制用于处理的控制网络的方法，无需从文件加载。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Optional[torch.nn.Module]
- strength
    - ‘strength’参数调整控制网络对图像影响的强度。它对于微调应用于图像的转换程度很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - ‘start_percent’参数定义了控制网络对图像效果的起始点。它很重要，因为它决定了在处理流水线中何时开始应用控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - ‘end_percent’参数设置了控制网络影响的结束点，影响控制网络的效果在图像处理结束时如何淡出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_soft_weights
    - ‘scale_soft_weights’参数调整控制网络权重的柔和度，这有助于实现图像中更平滑的过渡和不那么突兀的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - ‘pipe’输出是应用了控制网络调整后的更新图像处理流水线。它很重要，因为它代表了控制网络应用后流水线的最终状态。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- positive
    - ‘positive’输出包含了应用控制网络后得到的正向条件图像。它对于评估控制网络在实现期望的视觉增强方面的有效性至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - ‘negative’输出由负向条件图像组成，作为‘positive’输出的对比。它对于理解控制网络对图像所能施加的控制范围很重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class controlnetAdvanced:

    @classmethod
    def INPUT_TYPES(s):

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'lllite' not in file]
        return {'required': {'pipe': ('PIPE_LINE',), 'image': ('IMAGE',), 'control_net_name': (get_file_list(folder_paths.get_filename_list('controlnet')),)}, 'optional': {'control_net': ('CONTROL_NET',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'scale_soft_weights': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('PIPE_LINE', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('pipe', 'positive', 'negative')
    OUTPUT_NODE = True
    FUNCTION = 'controlnetApply'
    CATEGORY = 'EasyUse/Loaders'

    def controlnetApply(self, pipe, image, control_net_name, control_net=None, strength=1, start_percent=0, end_percent=1, scale_soft_weights=1):
        (positive, negative) = easyControlnet().apply(control_net_name, image, pipe['positive'], pipe['negative'], strength, start_percent, end_percent, control_net, scale_soft_weights)
        new_pipe = {'model': pipe['model'], 'positive': positive, 'negative': negative, 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': pipe['samples'], 'images': pipe['images'], 'seed': 0, 'loader_settings': pipe['loader_settings']}
        del pipe
        return (new_pipe, positive, negative)
```