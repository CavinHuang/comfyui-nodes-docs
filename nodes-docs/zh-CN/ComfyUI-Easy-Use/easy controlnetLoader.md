# Documentation
- Class name: controlnetSimple
- Category: EasyUse/Loaders
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

controlnetSimple节点旨在方便用户将控制网应用于改进生成模型的输出。它通过接收一组图像和一个控制网名称，输出一个融合了控制网影响的增强模型管线。对于寻求在其生成过程中整合控制机制以实现更精确和细致结果的用户来说，此节点非常有用。

# Input types
## Required
- pipe
    - ‘pipe’参数是controlnetSimple节点的一个关键输入，它代表了整个生成模型管线。它包括模型、条件数据和其他必要的相关设置。这些设置对节点的正常运作至关重要。pipe输入直接影响生成过程和最终输出，使节点能够有效地应用控制网。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - ‘image’参数是controlnetSimple节点的视觉输入。它对于节点理解生成过程的上下文和期望方向至关重要。通过将图像纳入控制网的应用，节点可以产生更符合用户视觉意图的输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- control_net_name
    - ‘control_net_name’参数是指定节点使用控制网的关键输入。它决定了将应用于生成模型的控制机制，影响最终输出的质量和对用户创意愿景的遵循程度。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
## Optional
- strength
    - ‘strength’参数用于调整控制网对生成过程影响的强度。这是一个可选输入，允许用户微调控制网的效果，平衡控制水平与模型的创造自由度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- scale_soft_weights
    - ‘scale_soft_weights’参数用于修改控制网权重的柔和度。这个输入可以被调整以实现生成输出中更平滑的过渡，提供对最终视觉结果更细致的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - ‘pipe’输出是经过控制网应用修改后的增强生成模型管线。它包括更新后的模型和条件数据，现在反映了控制网的影响。这个输出对于用户继续使用改进后的管线进行生成工作至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- positive
    - ‘positive’输出代表了根据控制网的影响进行了调整的精炼条件数据。它作为生成模型的指导，以产生更精确和与用户创意意图相匹配的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - ‘negative’输出是已经优化的条件数据，用以抵消生成过程中不需要的特征或元素。它帮助模型从控制网的指导中学习，避免产生不期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class controlnetSimple:

    @classmethod
    def INPUT_TYPES(s):

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'lllite' not in file]
        return {'required': {'pipe': ('PIPE_LINE',), 'image': ('IMAGE',), 'control_net_name': (get_file_list(folder_paths.get_filename_list('controlnet')),)}, 'optional': {'control_net': ('CONTROL_NET',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'scale_soft_weights': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}}
    RETURN_TYPES = ('PIPE_LINE', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('pipe', 'positive', 'negative')
    OUTPUT_NODE = True
    FUNCTION = 'controlnetApply'
    CATEGORY = 'EasyUse/Loaders'

    def controlnetApply(self, pipe, image, control_net_name, control_net=None, strength=1, scale_soft_weights=1):
        (positive, negative) = easyControlnet().apply(control_net_name, image, pipe['positive'], pipe['negative'], strength, 0, 1, control_net, scale_soft_weights)
        new_pipe = {'model': pipe['model'], 'positive': positive, 'negative': negative, 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': pipe['samples'], 'images': pipe['images'], 'seed': 0, 'loader_settings': pipe['loader_settings']}
        del pipe
        return (new_pipe, positive, negative)
```