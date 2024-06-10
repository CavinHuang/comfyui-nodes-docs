# Documentation
- Class name: MiDaS_Model_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

MiDaS_Model_Loader节点负责加载和准备MiDaS模型以供部署。它确保必要的依赖项已安装，并处理下载和加载指定的MiDaS模型变体。

# Input types
## Required
- midas_model
    - 'midas_model'参数指定要加载的MiDaS模型类型。它对于确定用于深度估计任务的预训练模型权重和配置至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- midas_model
    - 'midas_model'输出提供了一个包含已加载的MiDaS模型及其相关转换函数的元组。此输出对于后续处理和分析深度信息至关重要。
    - Comfy dtype: Tuple[torch.nn.Module, Callable]
    - Python dtype: Tuple[torch.nn.Module, Callable[[torch.Tensor], torch.Tensor]]

# Usage tips
- Infra type: GPU

# Source code
```
class MiDaS_Model_Loader:

    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'midas_model': (['DPT_Large', 'DPT_Hybrid'],)}}
    RETURN_TYPES = ('MIDAS_MODEL',)
    RETURN_NAMES = ('midas_model',)
    FUNCTION = 'load_midas_model'
    CATEGORY = 'WAS Suite/Loaders'

    def load_midas_model(self, midas_model):
        global MIDAS_INSTALLED
        if not MIDAS_INSTALLED:
            self.install_midas()
        if midas_model == 'DPT_Large':
            model_name = 'dpt_large_384.pt'
        elif midas_model == 'DPT_Hybrid':
            model_name = 'dpt_hybrid_384.pt'
        else:
            model_name = 'dpt_large_384.pt'
        model_path = os.path.join(self.midas_dir, 'checkpoints' + os.sep + model_name)
        torch.hub.set_dir(self.midas_dir)
        if os.path.exists(model_path):
            cstr(f'Loading MiDaS Model from `{model_path}`').msg.print()
            midas_type = model_path
        else:
            cstr('Downloading and loading MiDaS Model...').msg.print()
        midas = torch.hub.load('intel-isl/MiDaS', midas_model, trust_repo=True)
        device = torch.device('cpu')
        cstr(f'MiDaS is using passive device `{device}` until in use.').msg.print()
        midas.to(device)
        midas_transforms = torch.hub.load('intel-isl/MiDaS', 'transforms')
        transform = midas_transforms.dpt_transform
        return ((midas, transform),)

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package('timm')
        MIDAS_INSTALLED = True
```