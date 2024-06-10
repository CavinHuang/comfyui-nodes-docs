# Documentation
- Class name: CR_LoadScheduledLoRAs
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadScheduledLoRAs 是一个用于管理和应用预定计划的 LoRAs（低秩适应）到模型和剪辑的节点。它允许用户指定操作模式，包括禁该功能、加载默认 LoRA 或遵循自定义计划的选项。该节点根据当前帧动态选择适当的 LoRA，确保根据用户的计划增强或修改模型和剪辑。

# Input types
## Required
- mode
    - 模式参数决定了节点如何处理LoRA加载。它可以设置为关闭、加载默认LoRA或根据计划加载。
    - Comfy dtype: COMBO
    - Python dtype: str
- model
    - 需要处理的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 需要处理的clip。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- current_frame
    - 当前的帧数，用于确定根据计划加载哪个LoRA。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- schedule_alias
    - 计划别名，用于快速选择一组预定义的LoRA加载计划。
    - Comfy dtype: STRING
    - Python dtype: str
- default_lora
    - 当没有为当前帧指定LoRA时，将使用的默认LoRA名称。
    - Comfy dtype: STRING
    - Python dtype: str
- strength_model
    - 模型的强度因子，用于调整LoRA对模型的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - clip的强度因子，用于调整LoRA对clip的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- schedule_format
    - 计划的格式，决定了如何解析和应用LoRA加载计划。
    - Comfy dtype: COMBO
    - Python dtype: str
- lora_list
    - 可选的LoRA列表，提供了一系列的LoRA选项供计划选择。
    - Comfy dtype: LORA_LIST
    - Python dtype: List[str]
- schedule
    - 自定义的LoRA加载计划，详细指定了每一帧应加载的LoRA及其参数。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[Tuple[str, str]]

# Output types
- MODEL
    - 处理后的模型，可能已经应用了LoRA。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 处理后的clip，可能已经应用了LoRA。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- show_help
    - 提供帮助文档的链接，供用户查阅更多关于如何使用该节点的信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadScheduledLoRAs:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Off', 'Load default LoRA', 'Schedule']
        return {'required': {'mode': (modes,), 'model': ('MODEL',), 'clip': ('CLIP',), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'schedule_alias': ('STRING', {'default': '', 'multiline': False}), 'default_lora': (folder_paths.get_filename_list('loras'),), 'strength_model': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'strength_clip': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'schedule_format': (['CR', 'Deforum'],)}, 'optional': {'lora_list': ('LORA_LIST',), 'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'show_help')
    FUNCTION = 'schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def schedule(self, mode, model, clip, current_frame, schedule_alias, default_lora, strength_model, strength_clip, schedule_format, lora_list=None, schedule=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-load-scheduled-loras'
        if mode == 'Off':
            print(f'[Info] CR Load Scheduled LoRAs. Disabled.')
            return (model, clip, show_help)
        if mode == 'Load default LoRA':
            if default_lora == None:
                return (model, clip, show_help)
            if strength_model == 0 and strength_clip == 0:
                return (model, clip, show_help)
            (model, clip) = LoraLoader().load_lora(model, clip, default_lora, strength_model, strength_clip)
            print(f'[Info] CR Load Scheduled LoRAs. Loading default LoRA {lora_name}.')
            return (model, clip, show_help)
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        if params == '':
            print(f'[Warning] CR Load Scheduled LoRAs. No LoRA specified in schedule for frame {current_frame}. Using default lora.')
            if default_lora != None:
                (model, clip) = LoraLoader().load_lora(model, clip, default_lora, strength_model, strength_clip)
            return (model, clip, show_help)
        else:
            parts = params.split(',')
            if len(parts) == 3:
                s_lora_alias = parts[0].strip()
                s_strength_model = float(parts[1].strip())
                s_strength_clip = float(parts[1].strip())
            else:
                print(f'[Warning] CR Simple Value Scheduler. Skipped invalid line: {line}')
                return ()
        for (l_lora_alias, l_lora_name, l_strength_model, l_strength_clip) in lora_list:
            print(l_lora_alias, l_lora_name, l_strength_model, l_strength_clip)
            if l_lora_alias == s_lora_alias:
                print(f'[Info] CR Load Scheduled LoRAs. LoRA alias match found for {s_lora_alias}')
                lora_name = l_lora_name
                break
        if lora_name == '':
            print(f'[Info] CR Load Scheduled LoRAs. No LoRA alias match found for {s_lora_alias}. Frame {current_frame}.')
            return ()
        else:
            print(f'[Info] CR Load Scheduled LoRAs. LoRA {lora_name}')
        (model, clip) = LoraLoader().load_lora(model, clip, lora_name, s_strength_model, s_strength_clip)
        print(f'[Debug] CR Load Scheduled LoRAs. Loading new LoRA {lora_name}')
        return (model, clip, show_help)
```