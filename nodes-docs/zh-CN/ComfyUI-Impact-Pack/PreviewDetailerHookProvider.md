# Documentation
- Class name: PreviewDetailerHookProvider
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PreviewDetailerHookProvider 节点旨在促进图像的增强和详细预览。它通过应用钩子来调整图像质量，确保输出既详细又优化了视觉清晰度。该节点在图像处理任务的预处理阶段发挥关键作用，专注于质量方面以满足特定要求。

# Input types
## Required
- quality
    - ‘quality’参数对于确定输出图像的细节水平至关重要。它直接影响图像的视觉保真度和文件大小，允许在质量和性能之间取得平衡。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- unique_id
    - ‘unique_id’参数作为操作的唯一标识符，确保每个进程可以单独跟踪和管理。它对于可能有多个任务同时运行的异步操作特别重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- DETAILER_HOOK
    - ‘DETAILER_HOOK’输出提供了进一步处理和增强图像细节的机制。对于需要对图像质量进行复杂操作和微调的任务来说，它非常重要。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: PreviewDetailerHook
- UPSCALER_HOOK
    - ‘UPSCALER_HOOK’输出用于放大图像，提高其分辨率而不损害清晰度。对于需要高清视觉效果的应用来说，它至关重要。
    - Comfy dtype: UPSCALER_HOOK
    - Python dtype: PreviewDetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class PreviewDetailerHookProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'quality': ('INT', {'default': 95, 'min': 20, 'max': 100})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('DETAILER_HOOK', 'UPSCALER_HOOK')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, quality, unique_id):
        hook = hooks.PreviewDetailerHook(unique_id, quality)
        return (hook, hook)
```