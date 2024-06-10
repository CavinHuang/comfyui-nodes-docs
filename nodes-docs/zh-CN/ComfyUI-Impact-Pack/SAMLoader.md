# Documentation
- Class name: SAMLoader
- Category: ImpactPack
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SAMLoader节点旨在高效管理和加载SAM（Segment Anything Model）家族中的各种模型，包括ESAM。它提供了一个高级接口，用于根据用户定义的标准（如模型名称和设备模式）选择和使用模型，确保最佳性能和资源利用率。

# Input types
## Required
- model_name
    - model_name参数对于确定要加载的SAM模型至关重要。它通过指导节点指向正确的模型文件来影响节点的执行，这对于后续的处理和预测任务至关重要。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- device_mode
    - device_mode参数允许用户指定模型执行的计算设备。它通过根据所选模式优化GPU或CPU资源的使用，在节点性能中扮演重要角色。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- SAM_MODEL
    - SAM_MODEL输出代表已加载的SAM模型，准备用于推理或进一步处理。它封装了模型的架构和学习到的参数，标志着节点主要功能的完成。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class SAMLoader:

    @classmethod
    def INPUT_TYPES(cls):
        models = [x for x in folder_paths.get_filename_list('sams') if 'hq' not in x]
        return {'required': {'model_name': (models + ['ESAM'],), 'device_mode': (['AUTO', 'Prefer GPU', 'CPU'],)}}
    RETURN_TYPES = ('SAM_MODEL',)
    FUNCTION = 'load_model'
    CATEGORY = 'ImpactPack'

    def load_model(self, model_name, device_mode='auto'):
        if model_name == 'ESAM':
            if 'ESAM_ModelLoader_Zho' not in nodes.NODE_CLASS_MAPPINGS:
                try_install_custom_node('https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM', "To use 'ESAM' model, 'ComfyUI-YoloWorld-EfficientSAM' extension is required.")
                raise Exception("'ComfyUI-YoloWorld-EfficientSAM' node isn't installed.")
            esam_loader = nodes.NODE_CLASS_MAPPINGS['ESAM_ModelLoader_Zho']()
            if device_mode == 'CPU':
                esam = esam_loader.load_esam_model('CPU')[0]
            else:
                device_mode = 'CUDA'
                esam = esam_loader.load_esam_model('CUDA')[0]
            sam_obj = core.ESAMWrapper(esam, device_mode)
            esam.sam_wrapper = sam_obj
            print(f'Loads EfficientSAM model: (device:{device_mode})')
            return (esam,)
        modelname = folder_paths.get_full_path('sams', model_name)
        if 'vit_h' in model_name:
            model_kind = 'vit_h'
        elif 'vit_l' in model_name:
            model_kind = 'vit_l'
        else:
            model_kind = 'vit_b'
        sam = sam_model_registry[model_kind](checkpoint=modelname)
        size = os.path.getsize(modelname)
        safe_to = core.SafeToGPU(size)
        device = comfy.model_management.get_torch_device() if device_mode == 'Prefer GPU' else 'CPU'
        if device_mode == 'Prefer GPU':
            safe_to.to_device(sam, device)
        is_auto_mode = device_mode == 'AUTO'
        sam_obj = core.SAMWrapper(sam, is_auto_mode=is_auto_mode, safe_to_gpu=safe_to)
        sam.sam_wrapper = sam_obj
        print(f'Loads SAM model: {modelname} (device:{device_mode})')
        return (sam,)
```