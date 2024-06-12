# Documentation
- Class name: CR_LoadScheduledModels
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadScheduledModels节点旨在根据预定义的时间表管理模型的加载。它允许选择默认模型或在指定的帧动态加载不同的模型，增强了模型在各种场景下使用的灵活性和适应性。

# Input types
## Required
- mode
    - 模式参数决定是加载默认模型还是按照时间表选择模型。它对节点的操作至关重要，因为它决定了模型的加载行为。
    - Comfy dtype: COMBO[string]
    - Python dtype: str
- current_frame
    - 当前帧参数指定动画或序列中的当前帧，这对于根据时间表确定要加载的模型至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- default_model
    - 默认模型参数设置当前帧未安排特定模型时使用的后备模型。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- schedule_alias
    - 时间表别名参数为节点内特定时间表提供标识符，影响节点如何解释和应用时间表以加载模型。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_format
    - 时间表格式参数定义了节点用于模型加载的时间表的结构和格式。
    - Comfy dtype: COMBO[string]
    - Python dtype: str
- model_list
    - 模型列表参数包含具有各自别名的模型列表，用于根据时间表别名匹配和加载模型。
    - Comfy dtype: MODEL_LIST
    - Python dtype: List[Tuple[str, str]]
- schedule
    - 时间表参数代表要在特定帧加载的模型的实际时间表，指导节点的操作。
    - Comfy dtype: SCHEDULE
    - Python dtype: str

# Output types
- MODEL
    - MODEL输出提供基于时间表或默认设置加载的模型，这是节点功能的核心。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP输出与上下文图像处理模型相关联，该模型补充了主模型在理解和生成图像方面的功能。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- VAE
    - VAE输出代表变分自编码器组件，这对于模型生成新数据点的能力至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- show_help
    - show_help输出提供了文档的URL，以便在使用节点时提供进一步的帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadScheduledModels:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Load default Model', 'Schedule']
        return {'required': {'mode': (modes,), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'schedule_alias': ('STRING', {'default': '', 'multiline': False}), 'default_model': (folder_paths.get_filename_list('checkpoints'),), 'schedule_format': (['CR', 'Deforum'],)}, 'optional': {'model_list': ('MODEL_LIST',), 'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'show_help')
    FUNCTION = 'schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def schedule(self, mode, current_frame, schedule_alias, default_model, schedule_format, model_list=None, schedule=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-load-scheduled-models'
        if mode == 'Load default Model':
            ckpt_path = folder_paths.get_full_path('checkpoints', default_model)
            out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
            print(f'[Debug] CR Load Scheduled Models. Loading default model.')
            return (out[:3], show_help)
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        if params == '':
            print(f'[Warning] CR Load Scheduled Models. No model specified in schedule for frame {current_frame}. Using default model.')
            ckpt_path = folder_paths.get_full_path('checkpoints', default_model)
            out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
            return (out[:3], show_help)
        else:
            try:
                model_alias = str(params)
            except ValueError:
                print(f'[Warning] CR Load Scheduled Models. Invalid params: {params}')
                return ()
        for (ckpt_alias, ckpt_name) in model_list:
            if ckpt_alias == model_alias:
                model_name = ckpt_name
                break
        if model_name == '':
            print(f'[Info] CR Load Scheduled Models. No model alias match found for {model_alias}. Frame {current_frame} will produce an error.')
            return ()
        else:
            print(f'[Info] CR Load Scheduled Models. Model alias {model_alias} matched to {model_name}')
        ckpt_path = folder_paths.get_full_path('checkpoints', model_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        print(f'[Info] CR Load Scheduled Models. Loading new checkpoint model {model_name}')
        return (out[:3], show_help)
```