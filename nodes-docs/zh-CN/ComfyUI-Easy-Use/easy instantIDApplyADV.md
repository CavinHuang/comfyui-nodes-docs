# Documentation
- Class name: instantIDApplyAdvanced
- Category: EasyUse/Adapter
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过集成各种特性和控制功能，旨在提高输出图像处理的质量与特定性。它通过应用复杂的图像处理技术、控制网络和条件输入的组合来生成精细化的结果。

# Input types
## Required
- pipe
    - pipe参数对于节点的操作至关重要，因为它提供了图像处理工作流的基础数据结构。它包含了包括正负条件数据在内的所有必要信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- image
    - image参数对于节点来说至关重要，因为它是图像处理任务的主要输入。它直接影响输出及其应用转换的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- instantid_file
    - instantid_file参数重要，因为它提供了与图像中主体身份相关的必需文件。它用于确保图像处理的准确性和相关性。
    - Comfy dtype: FILEPATH
    - Python dtype: List[str]
- insightface
    - insightface参数重要，因为它决定了用于面部识别和处理的后端。它影响节点准确识别和增强面部特征的能力。
    - Comfy dtype: STRING
    - Python dtype: Union[str]
- control_net_name
    - control_net_name参数至关重要，因为它指定了用于指导图像处理的控制网络。它确保输出符合期望的审美或主题约束。
    - Comfy dtype: FILEPATH
    - Python dtype: List[str]
- cn_strength
    - cn_strength参数调整控制网络对图像处理的影响。它在实现期望控制与处理图像自然外观之间的平衡方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_soft_weights
    - cn_soft_weights参数决定了控制网络应用控制的柔和度。它影响对图像所做的变化的微妙性，确保转换平滑且富有细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight
    - weight参数影响图像处理效果的整体强度。它是控制图像增强或修改程度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了图像处理效果应用的起点。这对于确保变化逐步且受控地应用是很重要的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数指定了图像处理效果完全应用的点。这对于确定转换的范围和程度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - noise参数向图像处理中引入一定程度的随机性，有助于结果的多样性和不可预测性。这对于实现更自然、不那么统一的外观至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - pipe输出是初始数据结构的修改版本，现在包含了图像处理的结果。它很重要，因为它封装了节点对整个工作流的贡献。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- model
    - model输出代表了转换后的图像或图像处理模型的更新状态。它是节点主要功能和应用技术的效力的直接反映。
    - Comfy dtype: MODEL
    - Python dtype: torch.Tensor
- positive
    - positive输出是一组经过节点精炼或调整的条件数据。它对于向管道的后续阶段提供反馈很重要，增强了最终输出的连贯性和一致性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict
- negative
    - negative输出包含经过节点优化或过滤的条件数据。它通过确保排除不需要的元素，在塑造最终输出方面发挥着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict

# Usage tips
- Infra type: GPU

# Source code
```
class instantIDApplyAdvanced(instantID):

    def __init__(self):
        super().__init__()
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image': ('IMAGE',), 'instantid_file': (folder_paths.get_filename_list('instantid'),), 'insightface': (['CPU', 'CUDA', 'ROCM'],), 'control_net_name': (folder_paths.get_filename_list('controlnet'),), 'cn_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'cn_soft_weights': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'weight': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 5.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'noise': ('FLOAT', {'default': 0.35, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'image_kps': ('IMAGE',), 'mask': ('MASK',), 'control_net': ('CONTROL_NET',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('pipe', 'model', 'positive', 'negative')
    OUTPUT_NODE = True
    FUNCTION = 'apply_advanced'
    CATEGORY = 'EasyUse/Adapter'

    def apply_advanced(self, pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps=None, mask=None, control_net=None, positive=None, negative=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        positive = positive if positive is not None else pipe['positive']
        negative = negative if negative is not None else pipe['negative']
        return self.run(pipe, image, instantid_file, insightface, control_net_name, cn_strength, cn_soft_weights, weight, start_at, end_at, noise, image_kps, mask, control_net, positive, negative, prompt, extra_pnginfo, my_unique_id)
```