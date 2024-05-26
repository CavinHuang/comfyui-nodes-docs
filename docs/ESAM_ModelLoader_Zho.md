# Documentation
- Class name: ESAM_ModelLoader_Zho
- Category: 🔎YOLOWORLD_ESAM
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM.git

该节点旨在加载针对GPU或CPU环境定制的ESAM模型，确保与执行平台的兼容性。

# Input types
## Required
- device
    - 设备参数决定了要加载ESAM模型的硬件环境，这对于模型的正确执行至关重要。
    - Comfy dtype: COMBO['CUDA', 'CPU']
    - Python dtype: Union[str, torch.device]

# Output types
- esam_model
    - 输出代表加载的ESAM模型，这对于系统内的进一步处理和推理任务至关重要。
    - Comfy dtype: torch.jit.ScriptModule
    - Python dtype: torch.jit.ScriptModule

# Usage tips
- Infra type: GPU

# Source code
```
class ESAM_ModelLoader_Zho:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'device': (['CUDA', 'CPU'],)}}
    RETURN_TYPES = ('ESAMMODEL',)
    RETURN_NAMES = ('esam_model',)
    FUNCTION = 'load_esam_model'
    CATEGORY = '🔎YOLOWORLD_ESAM'

    def load_esam_model(self, device):
        new_current_directory = os.path.join(current_directory, 'models')
        if device == 'CUDA':
            model_path = os.path.join(new_current_directory, 'efficient_sam_s_gpu.jit')
        else:
            model_path = os.path.join(new_current_directory, 'efficient_sam_s_cpu.jit')
        EFFICIENT_SAM_MODEL = torch.jit.load(model_path)
        return [EFFICIENT_SAM_MODEL]
```