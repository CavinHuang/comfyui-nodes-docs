# Documentation
- Class name: CLIPSegDetectorProvider
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

CLIPSegDetectorProvider节点旨在基于CLIPSeg模型创建一个边界框检测器。它处理输入文本和图像数据，以在图像中感兴趣的对象周围生成边界框。该节点特别适用于需要基于文本提示进行引导的对象检测功能的应用程序。

# Input types
## Required
- text
    - 文本参数对于通过提供要检测对象的文本描述来指导检测过程至关重要。它在生成的边界框的准确性和相关性中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- blur
    - 模糊参数调整要应用于图像的模糊程度，这可能影响检测精度。它是一个可选参数，允许根据图像的特性微调检测过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold
    - 阈值参数确定对象检测的截止点。它是一个可选输入，可用于控制检测的灵敏度，影响哪些对象被识别为相关。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation_factor
    - 膨胀因子用于扩大检测到的对象的边界。它是一个可选参数，可以增强图像中较大或更分散的对象的检测。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- BBOX_DETECTOR
    - CLIPSegDetectorProvider的输出是一个BBOX_DETECTOR对象，它包含基于提供的文本提示检测和生成图像中对象周围的边界框的逻辑。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: BBoxDetectorBasedOnCLIPSeg

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPSegDetectorProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False}), 'blur': ('FLOAT', {'min': 0, 'max': 15, 'step': 0.1, 'default': 7}), 'threshold': ('FLOAT', {'min': 0, 'max': 1, 'step': 0.05, 'default': 0.4}), 'dilation_factor': ('INT', {'min': 0, 'max': 10, 'step': 1, 'default': 4})}}
    RETURN_TYPES = ('BBOX_DETECTOR',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, text, blur, threshold, dilation_factor):
        if 'CLIPSeg' in nodes.NODE_CLASS_MAPPINGS:
            return (core.BBoxDetectorBasedOnCLIPSeg(text, blur, threshold, dilation_factor),)
        else:
            print("[ERROR] CLIPSegToBboxDetector: CLIPSeg custom node isn't installed. You must install biegert/ComfyUI-CLIPSeg extension to use this node.")
```