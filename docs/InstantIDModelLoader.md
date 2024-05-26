# Documentation
- Class name: InstantIDModelLoader
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

该节点旨在高效加载和管理InstantID特定模型，确保检索并准备适当的模型以供系统内使用。

# Input types
## Required
- instantid_file
    - 该参数对于指定要加载的确切InstantID模型文件至关重要。它决定了后续操作中将使用模型的身份和版本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- INSTANTID
    - 输出代表加载的InstantID模型，这对于系统执行与模型功能相关的任务至关重要。
    - Comfy dtype: DICTIONARY
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class InstantIDModelLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'instantid_file': (folder_paths.get_filename_list('instantid'),)}}
    RETURN_TYPES = ('INSTANTID',)
    FUNCTION = 'load_model'
    CATEGORY = 'InstantID'

    def load_model(self, instantid_file):
        ckpt_path = folder_paths.get_full_path('instantid', instantid_file)
        model = comfy.utils.load_torch_file(ckpt_path, safe_load=True)
        if ckpt_path.lower().endswith('.safetensors'):
            st_model = {'image_proj': {}, 'ip_adapter': {}}
            for key in model.keys():
                if key.startswith('image_proj.'):
                    st_model['image_proj'][key.replace('image_proj.', '')] = model[key]
                elif key.startswith('ip_adapter.'):
                    st_model['ip_adapter'][key.replace('ip_adapter.', '')] = model[key]
            model = st_model
        return (model,)
```