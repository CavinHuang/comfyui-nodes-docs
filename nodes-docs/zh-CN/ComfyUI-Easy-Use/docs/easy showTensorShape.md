# Documentation
- Class name: showTensorShape
- Category: EasyUse/Logic
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

这个节点类旨在提供通过它的张量形状的高级概述，有助于理解数据结构而不涉及具体方法细节。它是调试和确保工作流中张量正确维度的关键工具。

# Input types
## Required
- tensor
    - ‘tensor’参数是关键，因为它携带了节点将要分析的数据。它可以是张量、列表或字典，其形状是节点将要报告的，这对节点的运行和后续数据处理至关重要。
    - Comfy dtype: COMBO[Tensor, List, Dict]
    - Python dtype: Union[torch.Tensor, List, Dict]
## Optional
- unique_id
    - ‘unique_id’参数虽然不是必需的，但它作为张量形状信息的标识符，允许在系统内更容易地跟踪和管理数据。
    - Comfy dtype: str
    - Python dtype: str
- extra_pnginfo
    - 如果提供‘extra_pnginfo’参数，它将为张量形状信息添加额外的上下文，有可能增强节点在更复杂的数据处理场景中的实用性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- ui
    - ‘ui’输出是一个包含张量形状文本表示的字典，这对于可视化数据结构并确保工作流中后续步骤得到正确信息至关重要。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class showTensorShape:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'tensor': (AlwaysEqualProxy('*'),)}, 'optional': {}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = 'log_input'
    CATEGORY = 'EasyUse/Logic'

    def log_input(self, tensor, unique_id=None, extra_pnginfo=None):
        shapes = []

        def tensorShape(tensor):
            if isinstance(tensor, dict):
                for k in tensor:
                    tensorShape(tensor[k])
            elif isinstance(tensor, list):
                for i in range(len(tensor)):
                    tensorShape(tensor[i])
            elif hasattr(tensor, 'shape'):
                shapes.append(list(tensor.shape))
        tensorShape(tensor)
        return {'ui': {'text': shapes}}
```