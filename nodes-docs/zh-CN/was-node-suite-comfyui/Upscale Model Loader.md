# Documentation
- Class name: WAS_Upscale_Model_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `load_model` 负责加载和准备用于图像放大任务的模型。它通过在指定目录中定位指定的模型，加载其参数，并初始化它以供使用来实现这一点。此方法对于将预训练模型无缝集成到工作流程中至关重要，确保模型无需手动干预即可准备就绪，以便部署。

# Input types
## Required
- model_name
    - 参数 `model_name` 对于识别要加载的特定模型至关重要。它将方法指向模型目录中正确的文件，从而实现所需模型的检索和初始化。此参数对于确保使用正确的模型至关重要，这直接影响后续的放大性能和结果。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- UPSCALE_MODEL
    - 输出 `UPSCALE_MODEL` 表示已加载并初始化的模型，准备用于图像放大任务。它封装了模型的架构和学习到的参数，允许将模型应用于新数据。这个输出很重要，因为它构成了所有涉及模型的后续处理和分析的基础。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- MODEL_NAME_TEXT
    - 输出 `MODEL_NAME_TEXT` 提供了加载模型的名称，这对于日志记录、跟踪或用户界面显示目的非常有用。它为模型提供了一个人类可读的标识符，便于在整个应用程序中进行沟通和引用。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Upscale_Model_Loader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (comfy_paths.get_filename_list('upscale_models'),)}}
    RETURN_TYPES = ('UPSCALE_MODEL', TEXT_TYPE)
    RETURN_NAMES = ('UPSCALE_MODEL', 'MODEL_NAME_TEXT')
    FUNCTION = 'load_model'
    CATEGORY = 'WAS Suite/Loaders'

    def load_model(self, model_name):
        model_path = comfy_paths.get_full_path('upscale_models', model_name)
        sd = comfy.utils.load_torch_file(model_path)
        out = model_loading.load_state_dict(sd).eval()
        return (out, model_name)
```