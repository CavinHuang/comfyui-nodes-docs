# Documentation
- Class name: CR_LoraLoader
- Category: Comfyroll/LoRA
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoraLoader 是一个用于管理和应用 Lora 修改到模型和剪辑的节点。它负责加载 Lora 文件并根据指定的 Lora 名称和强度参数调整模型和剪辑。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它代表了将由 Lora 修改的基础模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 剪辑参数是必不可少的，因为它定义了将被 Lora 处理和可能被修改的剪辑。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- switch
    - 开关参数决定是否将 Lora 修改应用于模型和剪辑。
    - Comfy dtype: ['On', 'Off']
    - Python dtype: str
- lora_name
    - Lora 名称参数很重要，因为它标识将用于修改的 Lora 文件。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- strength_model
    - 模型强度参数影响 Lora 对模型的效应强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 剪辑强度参数控制 Lora 对剪辑的效应强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 已使用选定的 Lora 处理的修改后的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 已使用选定的 Lora 处理的修改后的剪辑。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- show_help
    - 提供指向节点帮助文档链接的字符串。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoraLoader:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        file_list = folder_paths.get_filename_list('loras')
        file_list.insert(0, 'None')
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'switch': (['On', 'Off'],), 'lora_name': (file_list,), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'show_help')
    FUNCTION = 'load_lora'
    CATEGORY = icons.get('Comfyroll/LoRA')

    def load_lora(self, model, clip, switch, lora_name, strength_model, strength_clip):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-load-lora'
        if strength_model == 0 and strength_clip == 0:
            return (model, clip, show_help)
        if switch == 'Off' or lora_name == 'None':
            return (model, clip, show_help)
        lora_path = folder_paths.get_full_path('loras', lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                del self.loaded_lora
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)
        (model_lora, clip_lora) = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, show_help)
```