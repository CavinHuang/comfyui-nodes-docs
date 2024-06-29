# Documentation
- Class name: WAS_Lora_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Lora_Loader节点旨在WAS套件中管理Lora模型的加载和应用。它通过缓存先前加载的模型来确保高效处理Lora文件，减少冗余并提高性能。此节点对于将高级定制功能集成到工作流程中至关重要。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它代表了将应用Lora增强的主要对象。它直接影响节点的执行和结果模型的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数对于定义Lora模型操作的上下文至关重要。它影响模型如何与系统的其余部分集成，影响最终结果。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.models.CLIPModel]
- lora_name
    - lora_name参数指定要加载的Lora模型。它是定制过程中的关键决定因素，因为它决定了将使用哪个Lora模型的功能。
    - Comfy dtype: STRING
    - Python dtype: str
- strength_model
    - strength_model参数调整Lora模型对基础模型影响的强度。它是微调模型性能的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - strength_clip参数控制CLIP模型对整个过程的影响。它在根据所需规格形成最终输出方面具有重要意义。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 输出模型代表了应用了Lora定制的增强模型。它标志着节点处理的完成，是工作流中后续步骤的核心。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 输出CLIP模型反映了通过与Lora模型集成所做的调整。它是进一步处理或分析的重要组成部分。
    - Comfy dtype: CLIP
    - Python dtype: Union[torch.Tensor, comfy.models.CLIPModel]
- NAME_STRING
    - NAME_STRING输出提供了加载的Lora模型的名称，这对于系统内的跟踪和引用非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Lora_Loader:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        file_list = comfy_paths.get_filename_list('loras')
        file_list.insert(0, 'None')
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'lora_name': (file_list,), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL', 'CLIP', TEXT_TYPE)
    RETURN_NAMES = ('MODEL', 'CLIP', 'NAME_STRING')
    FUNCTION = 'load_lora'
    CATEGORY = 'WAS Suite/Loaders'

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)
        lora_path = comfy_paths.get_full_path('loras', lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                temp = self.loaded_lora
                self.loaded_lora = None
                del temp
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)
        (model_lora, clip_lora) = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, os.path.splitext(os.path.basename(lora_name))[0])
```