# Documentation
- Class name: IPAdapterInsightFaceLoader
- Category: ipadapter/loaders
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterInsightFaceLoader节点旨在方便加载和准备用于面部分析任务的InsightFace模型。它封装了使用指定的执行提供程序初始化模型的复杂性，抽象了底层技术细节。该节点确保InsightFace模型准备好进行高级操作，如面部检测和识别。

# Input types
## Required
- provider
    - ‘provider’参数指定了InsightFace模型的执行提供程序。这对于确定模型的执行方式至关重要，这可能显著影响性能以及与不同硬件设置的兼容性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- model
    - ‘model’输出代表已加载并准备好的InsightFace模型，可用于面部分析操作。它是节点功能的最终成果，为用户提供了与模型交互的高级接口。
    - Comfy dtype: FaceAnalysis
    - Python dtype: insightface.app.FaceAnalysis

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterInsightFaceLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'provider': (['CPU', 'CUDA', 'ROCM'],)}}
    RETURN_TYPES = ('INSIGHTFACE',)
    FUNCTION = 'load_insightface'
    CATEGORY = 'ipadapter/loaders'

    def load_insightface(self, provider):
        return (insightface_loader(provider),)
```