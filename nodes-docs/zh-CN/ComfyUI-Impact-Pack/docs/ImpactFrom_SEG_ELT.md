# Documentation
- Class name: From_SEG_ELT
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

From_SEG_ELT 节点旨在将 SEG_ELT 对象处理并转换为包含图像、掩码和各种元数据的结构化格式。它在准备数据以供 ImpactPack 实用程序套件中进一步分析和操作中发挥着关键作用。

# Input types
## Required
- seg_elt
    - seg_elt 参数至关重要，因为它代表了节点的核心输入。它包含用于处理的图像数据和相关元数据。节点的功能在很大程度上依赖于 seg_elt 输入的完整性和格式。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT

# Output types
- seg_elt
    - seg_elt 输出是传递过节点的原始 SEG_ELT 对象，可能在处理期间进行了增强或修改。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT
- cropped_image
    - cropped_image 输出提供了图像数据的张量表示，这对于需要张量输入格式的机器学习模型至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_mask
    - cropped_mask 输出是一个张量，它描绘了图像内的兴趣区域，是涉及分割任务的关键组成部分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- crop_region
    - crop_region 输出指定了图像中裁剪区域的坐标和尺寸，这对于理解数据的空间上下文至关重要。
    - Comfy dtype: SEG_ELT_crop_region
    - Python dtype: Tuple[int, int, int, int]
- bbox
    - bbox 输出提供了图像中感兴趣对象的边界框坐标，这对于对象检测和定位任务至关重要。
    - Comfy dtype: SEG_ELT_bbox
    - Python dtype: List[int]
- control_net_wrapper
    - control_net_wrapper 输出封装了可能需要用于高级处理或分析的额外控制信息或参数。
    - Comfy dtype: SEG_ELT_control_net_wrapper
    - Python dtype: Any
- confidence
    - confidence 输出反映了分割或分类结果的确定性，这对于评估模型输出的可靠性很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label
    - label 输出为处理后的数据分配一个分类标识符，这对于分类和注释目的至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class From_SEG_ELT:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seg_elt': ('SEG_ELT',)}}
    RETURN_TYPES = ('SEG_ELT', 'IMAGE', 'MASK', 'SEG_ELT_crop_region', 'SEG_ELT_bbox', 'SEG_ELT_control_net_wrapper', 'FLOAT', 'STRING')
    RETURN_NAMES = ('seg_elt', 'cropped_image', 'cropped_mask', 'crop_region', 'bbox', 'control_net_wrapper', 'confidence', 'label')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, seg_elt):
        cropped_image = to_tensor(seg_elt.cropped_image) if seg_elt.cropped_image is not None else None
        return (seg_elt, cropped_image, to_tensor(seg_elt.cropped_mask), seg_elt.crop_region, seg_elt.bbox, seg_elt.control_net_wrapper, seg_elt.confidence, seg_elt.label)
```