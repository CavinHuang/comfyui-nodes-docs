# Documentation
- Class name: IPAdapterUnifiedLoader
- Category: ipadapter
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterUnifiedLoader节点旨在简化图像处理任务所需的各种模型的加载和管理过程。它集中了加载Clip Vision、IPAdapter、LoRA和InsightFace模型的过程，确保根据指定的预设和提供程序使用正确的模型。节点的功能专注于提供模型加载的统一接口，减少冗余并提高整个系统的效率。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了将用于处理的基模型。它通过确定模型架构和功能来影响节点的执行。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- preset
    - 预设参数是必需的，因为它决定了要加载的模型的特定配置。它通过根据用户的需求选择适当的模型预设来影响节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- lora_strength
    - LoRA强度参数是可选的，用于调整LoRA模型对基模型的影响。它在微调特定任务的模型性能方面发挥作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- provider
    - 提供程序参数指定InsightFace模型的执行提供程序。它对于确定模型执行期间使用的硬件加速方法很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- ipadapter
    - 可选的ipadapter参数允许指定自定义IPAdapter模型文件。当用户需要加载IPAdapter模型的特定版本或配置时使用。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]

# Output types
- model
    - 模型输出代表了已加载和配置的基模型，该模型准备好用于图像处理任务。它是节点功能的顶点，为用户提供了一个根据其指定要求量身定制的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter输出包含已加载的IPAdapter模型，这是某些图像处理任务的关键组件。它为模型提供了额外的功能和定制选项。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterUnifiedLoader:

    def __init__(self):
        self.lora = None
        self.clipvision = {'file': None, 'model': None}
        self.ipadapter = {'file': None, 'model': None}
        self.insightface = {'provider': None, 'model': None}

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'preset': (['LIGHT - SD1.5 only (low strength)', 'STANDARD (medium strength)', 'VIT-G (medium strength)', 'PLUS (high strength)', 'PLUS FACE (portraits)', 'FULL FACE - SD1.5 only (portraits stronger)'],)}, 'optional': {'ipadapter': ('IPADAPTER',)}}
    RETURN_TYPES = ('MODEL', 'IPADAPTER')
    RETURN_NAMES = ('model', 'ipadapter')
    FUNCTION = 'load_models'
    CATEGORY = 'ipadapter'

    def load_models(self, model, preset, lora_strength=0.0, provider='CPU', ipadapter=None):
        pipeline = {'clipvision': {'file': None, 'model': None}, 'ipadapter': {'file': None, 'model': None}, 'insightface': {'provider': None, 'model': None}}
        if ipadapter is not None:
            pipeline = ipadapter
        clipvision_file = get_clipvision_file(preset)
        if clipvision_file is None:
            raise Exception('ClipVision model not found.')
        if clipvision_file != self.clipvision['file']:
            if clipvision_file != pipeline['clipvision']['file']:
                self.clipvision['file'] = clipvision_file
                self.clipvision['model'] = load_clip_vision(clipvision_file)
                print(f'\x1b[33mINFO: Clip Vision model loaded from {clipvision_file}\x1b[0m')
            else:
                self.clipvision = pipeline['clipvision']
        is_sdxl = isinstance(model.model, (comfy.model_base.SDXL, comfy.model_base.SDXLRefiner, comfy.model_base.SDXL_instructpix2pix))
        (ipadapter_file, is_insightface, lora_pattern) = get_ipadapter_file(preset, is_sdxl)
        if ipadapter_file is None:
            raise Exception('IPAdapter model not found.')
        if ipadapter_file != self.ipadapter['file']:
            if pipeline['ipadapter']['file'] != ipadapter_file:
                self.ipadapter['file'] = ipadapter_file
                self.ipadapter['model'] = ipadapter_model_loader(ipadapter_file)
                print(f'\x1b[33mINFO: IPAdapter model loaded from {ipadapter_file}\x1b[0m')
            else:
                self.ipadapter = pipeline['ipadapter']
        if lora_pattern is not None:
            lora_file = get_lora_file(lora_pattern)
            lora_model = None
            if lora_file is None:
                raise Exception('LoRA model not found.')
            if self.lora is not None:
                if lora_file == self.lora['file']:
                    lora_model = self.lora['model']
                else:
                    self.lora = None
                    torch.cuda.empty_cache()
            if lora_model is None:
                lora_model = comfy.utils.load_torch_file(lora_file, safe_load=True)
                self.lora = {'file': lora_file, 'model': lora_model}
                print(f'\x1b[33mINFO: LoRA model loaded from {lora_file}\x1b[0m')
            if lora_strength > 0:
                (model, _) = load_lora_for_models(model, None, lora_model, lora_strength, 0)
        if is_insightface:
            if provider != self.insightface['provider']:
                if pipeline['insightface']['provider'] != provider:
                    self.insightface['provider'] = provider
                    self.insightface['model'] = insightface_loader(provider)
                    print(f'\x1b[33mINFO: InsightFace model loaded with {provider} provider\x1b[0m')
                else:
                    self.insightface = pipeline['insightface']
        return (model, {'clipvision': self.clipvision, 'ipadapter': self.ipadapter, 'insightface': self.insightface})
```