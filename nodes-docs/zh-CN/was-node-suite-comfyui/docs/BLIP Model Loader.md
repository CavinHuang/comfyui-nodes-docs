# Documentation
- Class name: WAS_BLIP_Model_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_BLIP_Model_Loader节点旨在高效地加载和管理用于标题生成和询问任务的BLIP模型。它确保必要的包已安装，并处理BLIP模型的检索和初始化，在WAS套件内提供模型访问的简化接口。

# Input types
## Required
- blip_model
    - 参数'blip_model'对于指定要加载的BLIP模型类型至关重要。它决定了节点将初始化用于标题生成还是询问的模型，从而影响整体功能和预期结果。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- BLIP_MODEL
    - 输出BLIP_MODEL代表已加载的BLIP模型，准备用于标题生成或询问任务。它封装了模型的功能，是应用程序内进一步处理的中心组件。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_BLIP_Model_Loader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'blip_model': (['caption', 'interrogate'],)}}
    RETURN_TYPES = ('BLIP_MODEL',)
    FUNCTION = 'blip_model'
    CATEGORY = 'WAS Suite/Loaders'

    def blip_model(self, blip_model):
        if 'timm' not in packages() or 'transformers' not in packages() or 'fairscale' not in packages():
            cstr(f"Modules or packages are missing to use BLIP models. Please run the `{os.path.join(WAS_SUITE_ROOT, 'requirements.txt')}` through ComfyUI's python executable.").error.print()
            exit
        if 'transformers==4.26.1' not in packages(True):
            cstr(f"`transformers==4.26.1` is required for BLIP models. Please run the `{os.path.join(WAS_SUITE_ROOT, 'requirements.txt')}` through ComfyUI's python executable.").error.print()
            exit
        device = 'cpu'
        conf = getSuiteConfig()
        size = 384
        if blip_model == 'caption':
            from .modules.BLIP.blip_module import blip_decoder
            blip_dir = os.path.join(MODELS_DIR, 'blip')
            if not os.path.exists(blip_dir):
                os.makedirs(blip_dir, exist_ok=True)
            torch.hub.set_dir(blip_dir)
            if conf.__contains__('blip_model_url'):
                model_url = conf['blip_model_url']
            else:
                model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_capfilt_large.pth'
            model = blip_decoder(pretrained=model_url, image_size=size, vit='base')
            model.eval()
            model = model.to(device)
        elif blip_model == 'interrogate':
            from .modules.BLIP.blip_module import blip_vqa
            blip_dir = os.path.join(MODELS_DIR, 'blip')
            if not os.path.exists(blip_dir):
                os.makedirs(blip_dir, exist_ok=True)
            torch.hub.set_dir(blip_dir)
            if conf.__contains__('blip_model_vqa_url'):
                model_url = conf['blip_model_vqa_url']
            else:
                model_url = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_vqa_capfilt_large.pth'
            model = blip_vqa(pretrained=model_url, image_size=size, vit='base')
            model.eval()
            model = model.to(device)
        result = (model, blip_model)
        return (result,)
```