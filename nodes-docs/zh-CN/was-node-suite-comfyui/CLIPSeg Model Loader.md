# Documentation
- Class name: WAS_CLIPSeg_Model_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_CLIPSeg_Model_Loader节点是工作流程中的关键组件，旨在高效地加载和集成CLIPSeg模型到系统中。它简化了模型初始化过程，确保模型为后续任务（如图像分割）正确设置。通过抽象加载和缓存模型的复杂性，该节点简化了整体操作并增强了用户体验。

# Input types
## Required
- model
    - ‘model’参数对于指定要加载的CLIPSeg模型至关重要。它指导节点到正确的预训练模型，这对于节点的执行和分割结果的质量至关重要。该参数确保分配适当的资源，并确保模型在系统中按预期运行。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- clipseg_model
    - 'clipseg_model'输出提供了已加载的CLIPSeg模型，准备用于图像分割任务。它代表了节点操作的成果，封装了模型的下游应用能力。此输出非常重要，因为它使得进一步的处理和分析成为可能，充当了模型加载和实际使用之间的桥梁。
    - Comfy dtype: CLIPSEG_MODEL
    - Python dtype: Tuple[CLIPSegProcessor, CLIPSegForImageSegmentation]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_CLIPSeg_Model_Loader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('STRING', {'default': 'CIDAS/clipseg-rd64-refined', 'multiline': False})}}
    RETURN_TYPES = ('CLIPSEG_MODEL',)
    RETURN_NAMES = ('clipseg_model',)
    FUNCTION = 'clipseg_model'
    CATEGORY = 'WAS Suite/Loaders'

    def clipseg_model(self, model):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
        cache = os.path.join(MODELS_DIR, 'clipseg')
        inputs = CLIPSegProcessor.from_pretrained(model, cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained(model, cache_dir=cache)
        return ((inputs, model),)
```