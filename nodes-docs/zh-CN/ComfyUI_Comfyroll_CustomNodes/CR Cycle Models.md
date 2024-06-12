# Documentation
- Class name: CR_CycleModels
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleModels节点旨在根据指定参数（如模式、帧间隔和循环次数）管理和循环遍历模型列表。它提供了按顺序选择和处理模型的功能，或基于预定义列表，使其成为需要模型转换的动画工作流程中的多功能工具。

# Input types
## Required
- mode
    - 模式参数决定了模型的循环行为。它可以设置为'Off'或'Sequential'，影响节点如何遍历模型列表。
    - Comfy dtype: COMBO[string]
    - Python dtype: str
- model
    - 模型参数代表动画序列中使用的初始模型。它对于设置后续模型转换的基准至关重要。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - 剪辑参数用于保存对动画中特定剪辑的引用，可以在模型循环时进行操作或替换。
    - Comfy dtype: CLIP
    - Python dtype: Any
- frame_interval
    - frame_interval参数指定了动画中模型循环的间隔。它是控制模型转换节奏的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops参数定义了模型列表应循环的次数。它对于控制动画序列的持续时间至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame参数指示动画序列中的当前帧。它用于确定在任何给定时间使用哪个模型。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- model_list
    - model_list参数是一个模型列表，节点可以循环遍历这些模型。它在定义动画中使用的模型序列时提供了灵活性。
    - Comfy dtype: MODEL_LIST
    - Python dtype: List[Any]

# Output types
- MODEL
    - 输出MODEL代表在通过模型列表循环后，在动画序列中使用的当前模型。
    - Comfy dtype: MODEL
    - Python dtype: Any
- CLIP
    - 输出CLIP是处理模型转换后与动画相关联的当前剪辑。
    - Comfy dtype: CLIP
    - Python dtype: Any
- VAE
    - VAE输出为选定模型提供了变分自编码器配置，可用于进一步处理或分析。
    - Comfy dtype: VAE
    - Python dtype: Any
- show_help
    - show_help输出是指向节点文档的URL链接，提供有关其使用的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleModels:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Off', 'Sequential']
        return {'required': {'mode': (modes,), 'model': ('MODEL',), 'clip': ('CLIP',), 'model_list': ('MODEL_LIST',), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'show_help')
    FUNCTION = 'cycle_models'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle_models(self, mode, model, clip, model_list, frame_interval, loops, current_frame):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-models'
        model_params = list()
        if model_list:
            for _ in range(loops):
                model_params.extend(model_list)
        if mode == 'Off':
            return (model, clip, show_help)
        elif mode == 'Sequential':
            if current_frame == 0:
                return (model, clip, show_help)
            else:
                current_model_index = current_frame // frame_interval % len(model_params)
                current_model_params = model_params[current_model_index]
                (model_alias, ckpt_name) = current_model_params
                print(f'[Info] CR Cycle Models: Current model is {ckpt_name}')
                ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
                out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
                return (out, show_help)
```