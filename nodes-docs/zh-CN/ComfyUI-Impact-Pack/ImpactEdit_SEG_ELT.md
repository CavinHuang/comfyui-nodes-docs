# Documentation
- Class name: Edit_SEG_ELT
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

Edit_SEG_ELT 节点的 'doit' 方法是 ImpactPack/Util 类别中的关键组件，它用于操作和细化分割元素。该方法能够巧妙地整合各种可选输入，以增强分割过程，并确保输出满足特定任务需求。

# Input types
## Required
- seg_elt
    - 参数 'seg_elt' 是 Edit_SEG_ELT 节点的核心输入，代表将要处理的分割元素。它对节点的操作至关重要，因为它提供了用于操作的初始数据。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT 类型的对象
## Optional
- cropped_image_opt
    - 参数 'cropped_image_opt' 允许输入一个可选的裁剪图像，可以用来修改分割元素的视觉方面。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, None]
- cropped_mask_opt
    - 参数 'cropped_mask_opt' 是一个可选输入，它提供了裁剪区域的掩码，增强了分割过程的精度。
    - Comfy dtype: MASK
    - Python dtype: Union[torch.Tensor, None]
- confidence_opt
    - 参数 'confidence_opt' 是一个可选的浮点数值，可以用来调整分割元素的置信度水平，影响分割结果的可靠性。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, None]
- crop_region_opt
    - 参数 'crop_region_opt' 是一个可选输入，它指定了裁剪的兴趣区域，可以细化分割的焦点。
    - Comfy dtype: SEG_ELT_crop_region
    - Python dtype: Union[Tuple[int, int, int, int], None]
- bbox_opt
    - 参数 'bbox_opt' 是一个可选输入，它提供了分割元素的边界框坐标，可以用来定义分割的空间范围。
    - Comfy dtype: SEG_ELT_bbox
    - Python dtype: Union[Tuple[int, int, int, int], None]
- label_opt
    - 参数 'label_opt' 是一个可选的字符串输入，可以用来给分割元素分配一个标签，有助于对分割段进行分类和识别。
    - Comfy dtype: STRING
    - Python dtype: Union[str, None]
- control_net_wrapper_opt
    - 参数 'control_net_wrapper_opt' 是一个可选输入，它封装了控制网络信息，可以用来影响分割行为。
    - Comfy dtype: SEG_ELT_control_net_wrapper
    - Python dtype: Union[ControlNetWrapper, None]

# Output types
- seg
    - 输出 'seg' 代表 Edit_SEG_ELT 节点处理后的细化分割元素。它封装了更新后的分割数据，准备用于下游任务。
    - Comfy dtype: SEG_ELT
    - Python dtype: SEG_ELT 类型的对象

# Usage tips
- Infra type: CPU

# Source code
```
class Edit_SEG_ELT:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seg_elt': ('SEG_ELT',)}, 'optional': {'cropped_image_opt': ('IMAGE',), 'cropped_mask_opt': ('MASK',), 'crop_region_opt': ('SEG_ELT_crop_region',), 'bbox_opt': ('SEG_ELT_bbox',), 'control_net_wrapper_opt': ('SEG_ELT_control_net_wrapper',), 'confidence_opt': ('FLOAT', {'min': 0, 'max': 1.0, 'step': 0.1, 'forceInput': True}), 'label_opt': ('STRING', {'multiline': False, 'forceInput': True})}}
    RETURN_TYPES = ('SEG_ELT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, seg_elt, cropped_image_opt=None, cropped_mask_opt=None, confidence_opt=None, crop_region_opt=None, bbox_opt=None, label_opt=None, control_net_wrapper_opt=None):
        cropped_image = seg_elt.cropped_image if cropped_image_opt is None else cropped_image_opt
        cropped_mask = seg_elt.cropped_mask if cropped_mask_opt is None else cropped_mask_opt
        confidence = seg_elt.confidence if confidence_opt is None else confidence_opt
        crop_region = seg_elt.crop_region if crop_region_opt is None else crop_region_opt
        bbox = seg_elt.bbox if bbox_opt is None else bbox_opt
        label = seg_elt.label if label_opt is None else label_opt
        control_net_wrapper = seg_elt.control_net_wrapper if control_net_wrapper_opt is None else control_net_wrapper_opt
        cropped_image = cropped_image.numpy() if cropped_image is not None else None
        if isinstance(cropped_mask, torch.Tensor):
            if len(cropped_mask.shape) == 3:
                cropped_mask = cropped_mask.squeeze(0)
            cropped_mask = cropped_mask.numpy()
        seg = SEG(cropped_image, cropped_mask, confidence, crop_region, bbox, label, control_net_wrapper)
        return (seg,)
```