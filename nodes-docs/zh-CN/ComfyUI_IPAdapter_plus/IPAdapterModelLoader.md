# Documentation
- Class name: IPAdapterModelLoader
- Category: ipadapter/loaders
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterModelLoader旨在高效加载并集成IPAdapter模型到系统中，确保模型与框架的兼容性和无缝功能。

# Input types
## Required
- ipadapter_file
    - ipadapter_file是一个关键参数，用于指定IPAdapter模型文件的路径。它对于节点正确加载和处理模型至关重要，影响系统的整体性能和准确性。
    - Comfy dtype: COMBO[string]
    - Python dtype: str

# Output types
- ipadapter
    - 输出提供了已加载的IPAdapter模型的结构化表示，这对于系统内的后续处理和分析至关重要。
    - Comfy dtype: dict
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ipadapter_file': (folder_paths.get_filename_list('ipadapter'),)}}
    RETURN_TYPES = ('IPADAPTER',)
    FUNCTION = 'load_ipadapter_model'
    CATEGORY = 'ipadapter/loaders'

    def load_ipadapter_model(self, ipadapter_file):
        ipadapter_file = folder_paths.get_full_path('ipadapter', ipadapter_file)
        return (ipadapter_model_loader(ipadapter_file),)
```