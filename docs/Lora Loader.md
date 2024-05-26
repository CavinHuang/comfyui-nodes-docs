# Documentation
- Class name: WAS_Lora_Loader
- Category: WAS Suite/Loaders
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Lora_Loader节点旨在管理和应用Lora模型以增强基础模型和剪辑的功能。它通过缓存先前加载的模型来确保高效处理Lora文件，从而优化性能和资源使用。

# Input types
## Required
- model
    - ‘model’参数至关重要，因为它代表了将应用Lora增强的基础模型。它直接影响节点的输出，通过确定将被修改的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - ‘clip’参数对于提供将受Lora模型影响的剪辑组件至关重要。它是节点操作的关键元素，因为它定义了将被增强的剪辑。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_name
    - ‘lora_name’参数指定要加载的Lora模型文件。它是一个关键输入，因为它决定了将用于增强的Lora模型，影响节点的最终输出。
    - Comfy dtype: STRING
    - Python dtype: str
- strength_model
    - ‘strength_model’参数调整Lora模型对基础模型影响的强度。它在微调节点输出以实现所需增强水平方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - ‘strength_clip’参数控制Lora模型对剪辑的影响强度。它对于调整节点的输出以满足剪辑组件的具体增强要求很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - ‘MODEL’输出代表了应用Lora模型后增强的模型。它是节点操作的主要结果，对进一步处理或分析很重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - ‘CLIP’输出是被Lora模型修改的剪辑组件。它是节点功能的重要组成部分，为下游任务提供增强的剪辑。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- NAME_STRING
    - ‘NAME_STRING’输出提供了被加载和应用的Lora模型的名称。它作为增强过程中使用的特定Lora模型的参考。
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