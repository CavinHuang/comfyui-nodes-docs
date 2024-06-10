# Documentation
- Class name: samLoaderForDetailerFix
- Category: EasyUse/Fix
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samLoaderForDetailerFix节点是整合和使用SAM（Stable Diffusion）模型过程中的关键组件。它旨在简化模型的加载和应用，确保其在给定上下文中高效有效地运行。该节点的功能集中在为详细的图像处理任务（如分割和增强）准备模型，通过配置影响模型检测和处理能力的多个参数。

# Input types
## Required
- model_name
    - model_name参数指定要加载的SAM模型的名称。它在识别和启动后续图像处理任务的正确模型中起着至关重要的作用。
    - Comfy dtype: str
    - Python dtype: str
- device_mode
    - device_mode参数确定用于运行SAM模型的计算设备。它对于优化性能和确保与系统硬件能力兼容至关重要。
    - Comfy dtype: str
    - Python dtype: str
- sam_detection_hint
    - sam_detection_hint参数为SAM模型提供检测策略的指导。它对于微调模型的检测精度以及对不同类型的输入图像的响应非常重要。
    - Comfy dtype: str
    - Python dtype: str
- sam_dilation
    - sam_dilation参数调整SAM模型检测过程中使用的扩张因子。它能够显著影响模型捕获图像中细节的能力。
    - Comfy dtype: int
    - Python dtype: int
- sam_threshold
    - sam_threshold参数设置SAM模型检测的置信度阈值。它是控制检测结果中精确度和召回率平衡的关键因素。
    - Comfy dtype: float
    - Python dtype: float
- sam_bbox_expansion
    - sam_bbox_expansion参数控制SAM模型生成的边界框的扩展。它用于细化模型对图像中对象的定位。
    - Comfy dtype: int
    - Python dtype: int
- sam_mask_hint_threshold
    - sam_mask_hint_threshold参数定义在SAM模型中使用掩码提示的阈值。它有助于确定所提供掩码提示的相关性和适用性，以用于图像分割。
    - Comfy dtype: float
    - Python dtype: float
- sam_mask_hint_use_negative
    - sam_mask_hint_use_negative参数指示在SAM模型中是否以及如何使用负掩码提示。它是提高模型区分图像中所需和不需要区域能力的重要因素。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- sam_pipe
    - sam_pipe输出提供了配置有SAM模型和相关参数的管道。它对于需要模型能力的后续图像处理任务至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: GPU

# Source code
```
class samLoaderForDetailerFix:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model_name': (folder_paths.get_filename_list('sams'),), 'device_mode': (['AUTO', 'Prefer GPU', 'CPU'], {'default': 'AUTO'}), 'sam_detection_hint': (['center-1', 'horizontal-2', 'vertical-2', 'rect-4', 'diamond-4', 'mask-area', 'mask-points', 'mask-point-bbox', 'none'],), 'sam_dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1}), 'sam_threshold': ('FLOAT', {'default': 0.93, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sam_bbox_expansion': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1}), 'sam_mask_hint_threshold': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'sam_mask_hint_use_negative': (['False', 'Small', 'Outter'],)}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('sam_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Fix'

    def doit(self, model_name, device_mode, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative):
        if 'SAMLoader' not in ALL_NODE_CLASS_MAPPINGS:
            raise Exception(f"[ERROR] To use SAMLoader, you need to install 'Impact Pack'")
        cls = ALL_NODE_CLASS_MAPPINGS['SAMLoader']
        (sam_model,) = cls().load_model(model_name, device_mode)
        pipe = (sam_model, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative)
        return (pipe,)
```