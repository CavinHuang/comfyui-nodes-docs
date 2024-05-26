# Documentation
- Class name: ONNXDetectorProvider
- Category: ImpactPack
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ONNXDetectorProvider节点旨在方便加载和提供用于检测任务的ONNX模型。它作为将基于ONNX的检测模型集成到工作流程中的接口，抽象了模型加载和设置的复杂性。

# Input types
## Required
- model_name
    - model_name参数对于识别要加载的特定ONNX模型至关重要。它确保使用了正确的模型进行检测任务，从而影响节点的执行和结果的准确性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- BBOX_DETECTOR
    - BBOX_DETECTOR输出提供了一个配置好的ONNXDetector对象，用于执行对象检测任务。该对象封装了ONNX模型的功能，是检测过程中的核心组件。
    - Comfy dtype: ONNXDetector
    - Python dtype: ONNXDetector

# Usage tips
- Infra type: CPU

# Source code
```
class ONNXDetectorProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (folder_paths.get_filename_list('onnx'),)}}
    RETURN_TYPES = ('BBOX_DETECTOR',)
    FUNCTION = 'load_onnx'
    CATEGORY = 'ImpactPack'

    def load_onnx(self, model_name):
        model = folder_paths.get_full_path('onnx', model_name)
        return (core.ONNXDetector(model),)
```