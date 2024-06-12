# Documentation
- Class name: PhotoMakerLoader
- Category: _for_testing/photomaker
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PhotoMakerLoader 类负责加载和初始化 PhotoMaker 模型，这是图像处理流程中的关键组件。它抽象了模型加载的复杂性，确保模型使用正确的状态字典正确初始化。

# Input types
## Required
- photomaker_model_name
    - photomaker_model_name 参数对于识别要加载的特定模型至关重要。它指导加载器到正确的文件路径，并确保模型被正确实例化以进行后续操作。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- PHOTOMAKER
    - PHOTOMAKER 输出代表已加载的 PhotoMaker 模型，准备用于图像处理任务。它标志着模型与其相关参数和状态的成功初始化。
    - Comfy dtype: PhotoMakerIDEncoder
    - Python dtype: PhotoMakerIDEncoder

# Usage tips
- Infra type: CPU

# Source code
```
class PhotoMakerLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'photomaker_model_name': (folder_paths.get_filename_list('photomaker'),)}}
    RETURN_TYPES = ('PHOTOMAKER',)
    FUNCTION = 'load_photomaker_model'
    CATEGORY = '_for_testing/photomaker'

    def load_photomaker_model(self, photomaker_model_name):
        photomaker_model_path = folder_paths.get_full_path('photomaker', photomaker_model_name)
        photomaker_model = PhotoMakerIDEncoder()
        data = comfy.utils.load_torch_file(photomaker_model_path, safe_load=True)
        if 'id_encoder' in data:
            data = data['id_encoder']
        photomaker_model.load_state_dict(data)
        return (photomaker_model,)
```