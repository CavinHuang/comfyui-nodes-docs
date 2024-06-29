# Documentation
- Class name: instantIDApply
- Category: EasyUse/Adapter
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

instantIDApply节点旨在简化将唯一标识符应用于给定图像或数据集的过程，便于集成各种模型和控制机制以实现期望的结果。

# Input types
## Required
- pipe
    - pipe参数作为节点内部数据流动的主要通道，使得后续操作的协调和不同组件的集成成为可能。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - image参数在提供视觉数据给节点方面至关重要，这对于系统内的处理和分析是必不可少的。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- instantid_file
    - instantid_file参数对于系统内唯一标识符的识别和管理至关重要，确保数据的准确性和一致性。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('instantid')]
    - Python dtype: str
- insightface
    - insightface参数在确定面部分析任务的计算后端方面起着重要作用，从而影响节点的性能和效率。
    - Comfy dtype: COMBO[['CPU', 'CUDA', 'ROCM']]
    - Python dtype: str
- control_net_name
    - control_net_name参数在指定要使用的控制网络方面至关重要，它塑造了节点的整体行为和输出。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('controlnet')]
    - Python dtype: str
- cn_strength
    - cn_strength参数调节控制网络对结果的影响程度，是优化和微调节点性能的重要工具。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_soft_weights
    - cn_soft_weights参数决定了控制网络影响的柔和程度，影响了节点调整的微妙性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight
    - weight参数对于平衡节点内不同组件的贡献至关重要，确保各种特性的和谐集成。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了节点处理开始的初始点，为后续操作和结果奠定了基础。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记了节点处理结束的最终点，确定了节点功能的范围和限制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - noise参数在节点的操作中引入了随机性元素，有助于结果的多样性和创造性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - pipe输出是节点处理数据的全面表示，封装了结果并促进了系统内的进一步传输。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- model
    - model输出提供了经过节点处理能力优化的输入模型的精炼和优化版本。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - positive输出是代表期望结果或特征的数据集，用于指导和通知后续流程。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - negative输出包含代表非期望结果或特征的数据，作为未来操作中避免某些结果的参考。
    - Comfy dtype: CONDITIONING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class instantIDApply(instantID):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image': ('IMAGE',), 'instantid_file': (folder_paths.get_filename_list('instantid'),), 'insightface': (['CPU', 'CUDA', 'ROCM'],), 'control_net_name': (folder_paths.get_filename_list('controlnet'),), 'cn_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'cn_soft_weights': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'weight': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 5.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'noise': ('FLOAT', {'default': 0.35, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'image_kps': ('IMAGE',), 'mask': ('MASK',), 'control_net': ('CONTROL_NET',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('pipe', 'model', 'positive', 'negative')
    OUTPUT_NODE = True
    FUNCTION = 'apply'
    CATEGORY = 'EasyUse/Adapter'

    def apply(self, pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps=None, mask=None, control_net=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        positive = pipe['positive']
        negative = pipe['negative']
        return self.run(pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps, mask, control_net, positive, negative, prompt, extra_pnginfo, my_unique_id)
```