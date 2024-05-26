# Documentation
- Class name: SeargeControlnetAdapterV2
- Category: UI_PROMPTING
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点促进控制网络机制的适配，以增强图像处理任务。它根据输入参数动态选择和应用各种边缘检测和图像增强算法，旨在根据特定要求改善视觉输出。

# Input types
## Required
- controlnet_mode
    - 确定要使用的控制网络类型，这显著影响处理方法和最终图像质量。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- controlnet_preprocessor
    - 启用或禁用控制网图像的预处理，可以优化后续的图像处理步骤。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- strength
    - 调整控制网络对图像的影响强度，直接影响最终的视觉结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- low_threshold
    - 设置边缘检测灵敏度的下限，影响图像中检测到的边缘的粒度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_threshold
    - 定义边缘检测灵敏度的上限，影响最终图像中边缘的显著性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 指定图像处理范围的起始百分比，确定受影响的图像初始段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 指示图像处理范围的结束百分比，建立受影响的图像最终段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_augmentation
    - 控制应用于图像的噪声增强水平，这可以增强控制网络的鲁棒性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- revision_enhancer
    - 激活或停用修订增强器，它精炼控制网络的输出以提高准确性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- source_image
    - 提供控制网络处理的基础图像，作为所有后续图像操作的基本输入。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- data
    - 提供控制网络用于更复杂处理的附加数据流信息。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: List[Dict[str, Any]]

# Output types
- data
    - 包含控制网络处理后更新的数据流信息，可以进一步被下游利用。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]
- preview
    - 展示处理后图像的视觉预览，演示控制网络调整的效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeControlnetAdapterV2:

    def __init__(self):
        self.expected_size = None
        self.hed_annotator = 'ControlNetHED.pth'
        self.leres_annotator = 'res101.pth'
        self.hed_annotator_full_path = get_full_path('annotators', self.hed_annotator)
        self.leres_annotator_full_path = get_full_path('annotators', self.leres_annotator)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'controlnet_mode': (UI.CONTROLNET_MODES, {'default': UI.NONE}), 'controlnet_preprocessor': ('BOOLEAN', {'default': False}), 'strength': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 10.0, 'step': 0.05}), 'low_threshold': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'high_threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'end_percent': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'noise_augmentation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'revision_enhancer': ('BOOLEAN', {'default': False})}, 'optional': {'data': ('SRG_DATA_STREAM',), 'source_image': ('IMAGE',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM', 'IMAGE')
    RETURN_NAMES = ('data', 'preview')
    FUNCTION = 'get_value'
    CATEGORY = UI.CATEGORY_UI_PROMPTING

    def process_image(self, image, mode, low_threshold, high_threshold):
        if mode == UI.CN_MODE_CANNY:
            image = canny(image, low_threshold, high_threshold)
        elif mode == UI.CN_MODE_DEPTH:
            image = leres(image, low_threshold, high_threshold, self.leres_annotator_full_path)
        elif mode == UI.CN_MODE_SKETCH:
            image = hed(image, self.hed_annotator_full_path)
        else:
            pass
        return image

    def create_dict(self, stack, source_image, controlnet_mode, controlnet_preprocessor, strength, low_threshold, high_threshold, start, end, noise_augmentation, revision_enhancer):
        if controlnet_mode is None or controlnet_mode == UI.NONE:
            cn_image = None
        else:
            cn_image = source_image
        low_threshold = round(low_threshold, 3)
        high_threshold = round(high_threshold, 3)
        if controlnet_mode == UI.CN_MODE_REVISION or controlnet_mode == UI.CUSTOM:
            controlnet_preprocessor = False
        if controlnet_preprocessor and cn_image is not None:
            cn_image = self.process_image(cn_image, controlnet_mode, low_threshold, high_threshold)
        stack += [{UI.F_REV_CN_IMAGE: cn_image, UI.F_REV_CN_IMAGE_CHANGED: True, UI.F_REV_CN_MODE: controlnet_mode, UI.F_CN_PRE_PROCESSOR: controlnet_preprocessor, UI.F_REV_CN_STRENGTH: round(strength, 3), UI.F_CN_LOW_THRESHOLD: low_threshold, UI.F_CN_HIGH_THRESHOLD: high_threshold, UI.F_CN_START: round(start, 3), UI.F_CN_END: round(end, 3), UI.F_REV_NOISE_AUGMENTATION: round(noise_augmentation, 3), UI.F_REV_ENHANCER: revision_enhancer}]
        return ({UI.F_CN_STACK: stack}, cn_image)

    def get_value(self, controlnet_mode, controlnet_preprocessor, strength, low_threshold, high_threshold, start_percent, end_percent, noise_augmentation, revision_enhancer, source_image=None, data=None):
        if data is None:
            data = {}
        stack = retrieve_parameter(UI.F_CN_STACK, retrieve_parameter(UI.S_CONTROLNET_INPUTS, data), [])
        if self.expected_size is None:
            self.expected_size = len(stack)
        elif self.expected_size == 0:
            stack = []
        elif len(stack) > self.expected_size:
            stack = stack[:self.expected_size]
        (stack_entry, image) = self.create_dict(stack, source_image, controlnet_mode, controlnet_preprocessor, strength, low_threshold, high_threshold, start_percent, end_percent, noise_augmentation, revision_enhancer)
        data[UI.S_CONTROLNET_INPUTS] = stack_entry
        return (data, image)
```