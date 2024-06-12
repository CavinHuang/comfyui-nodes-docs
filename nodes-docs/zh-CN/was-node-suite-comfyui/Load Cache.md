# Documentation
- Class name: WAS_Load_Cache
- Category: WAS Suite/IO
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Load_Cache节点旨在高效地管理从指定路径加载缓存数据，例如潜在向量、图像和条件数据。它确保只有在给定路径上存在缓存文件时才加载数据，为WAS套件的工作流程提供了一个重要的数据检索机制。

# Input types
## Required
- latent_path
    - latent_path参数指定潜在数据缓存的文件路径。它的存在至关重要，因为它指导节点到正确的位置加载潜在数据，这对于WAS套件中的后续处理步骤是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- image_path
    - image_path参数用于指示图像数据缓存的位置。这是一个可选参数，提供时允许节点从指定路径加载和使用图像数据，增强了整个系统的功能。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- conditioning_path
    - conditioning_path参数指向存储条件数据缓存的文件路径。当节点需要加载条件数据以影响WAS套件内其他数据的生成或处理时，这个可选参数很重要。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]

# Output types
- LATENT
    - LATENT输出提供了从指定缓存路径加载的潜在数据。它是WAS套件中需要潜在表示进行操作的模型的关键组成部分。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]
- IMAGE
    - IMAGE输出包含已加载的图像数据，可以在WAS套件内用于可视化或进一步分析。它是一个可选输出，仅当提供了相应的image_path输入并且成功加载了图像数据时才会出现。
    - Comfy dtype: IMAGE
    - Python dtype: Union[PIL.Image, None]
- CONDITIONING
    - CONDITIONING输出提供已加载的条件数据，这对于WAS套件内的某些模型操作至关重要。它允许根据条件输入定制和微调模型行为。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[torch.Tensor, None]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Load_Cache:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latent_path': ('STRING', {'default': '', 'multiline': False}), 'image_path': ('STRING', {'default': '', 'multiline': False}), 'conditioning_path': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('LATENT', 'IMAGE', 'CONDITIONING')
    RETURN_NAMES = ('LATENT', 'IMAGE', 'CONDITIONING')
    FUNCTION = 'load_cache'
    CATEGORY = 'WAS Suite/IO'

    def load_cache(self, latent_path=None, image_path=None, conditioning_path=None):
        if 'joblib' not in packages():
            install_package('joblib')
        import joblib
        input_path = os.path.join(WAS_SUITE_ROOT, 'cache')
        latent = None
        image = None
        conditioning = None
        if latent_path not in ['', None]:
            if os.path.exists(latent_path):
                latent = joblib.load(latent_path)
            else:
                cstr(f'Unable to locate cache file {latent_path}').error.print()
        if image_path not in ['', None]:
            if os.path.exists(image_path):
                image = joblib.load(image_path)
            else:
                cstr(f'Unable to locate cache file {image_path}').msg.print()
        if conditioning_path not in ['', None]:
            if os.path.exists(conditioning_path):
                conditioning = joblib.load(conditioning_path)
            else:
                cstr(f'Unable to locate cache file {conditioning_path}').error.print()
        return (latent, image, conditioning)
```