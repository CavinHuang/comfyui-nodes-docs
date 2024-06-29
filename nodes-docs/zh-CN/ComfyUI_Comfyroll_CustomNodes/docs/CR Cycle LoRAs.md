# Documentation
- Class name: CR_CycleLoRAs
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CycleLoRAs节点旨在管理和循环遍历模型和剪辑的LoRA（低秩适应）参数列表，用于指定的动画框架中。它通过顺序应用不同的LoRA调整来增强生成动画的多样性和动态性。该节点通过迭代预定义的LoRA参数列表，根据当前帧和帧间隔以循环方式应用它们，从而实现复杂且不断演变的视觉效果的创建。

# Input types
## Required
- mode
    - 模式参数决定了节点的操作行为。它决定了节点是处于'关闭'状态，什么也不做，还是处于'顺序'模式，循环遍历LoRA参数。这个选择显著影响节点如何处理输入和结果动画序列。
    - Comfy dtype: COMBO['Off', 'Sequential']
    - Python dtype: str
- model
    - 模型参数至关重要，因为它代表了节点将使用指定的LoRA参数进行操作的核心模型。模型对LoRA调整的适应性是实现所需动画效果的关键。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 剪辑参数对于提供节点将与模型一起工作的视觉上下文至关重要。它用于与模型一起应用LoRA调整，以创建一个连贯的动画。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- lora_list
    - lora_list参数是节点将循环遍历的LoRA参数列表。此列表中的每个元素代表可以应用于模型和剪辑的一组不同的调整，有助于动画的多样性。
    - Comfy dtype: LORA_LIST
    - Python dtype: List[Tuple[str, str, float, float]]
## Optional
- frame_interval
    - frame_interval参数定义了节点循环遍历LoRA参数的频率。它对控制动画序列的节奏和时间至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- loops
    - loops参数指定节点将整个LoRA参数列表循环的次数。它影响动画效果的持续时间和重复性。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame参数指示动画序列中的当前位置。它用于确定在任何给定时刻应用哪个LoRA参数。
    - Comfy dtype: INT
    - Python dtype: float

# Output types
- MODEL
    - 输出MODEL代表了根据当前帧和帧间隔应用了LoRA调整的模型。这是主要的输出，承载着动画预期的视觉变化。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 输出CLIP是与MODEL一起使用LoRA参数调整的视觉表示。它补充MODEL以提供完整的动画序列。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个URL链接到文档，以获取有关节点操作的进一步帮助或信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CycleLoRAs:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Off', 'Sequential']
        return {'required': {'mode': (modes,), 'model': ('MODEL',), 'clip': ('CLIP',), 'lora_list': ('LORA_LIST',), 'frame_interval': ('INT', {'default': 30, 'min': 0, 'max': 999, 'step': 1}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 1000}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'show_help')
    FUNCTION = 'cycle'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def cycle(self, mode, model, clip, lora_list, frame_interval, loops, current_frame):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-loras'
        lora_params = list()
        if lora_list:
            for _ in range(loops):
                lora_params.extend(lora_list)
        else:
            return (model, clip, show_help)
        if mode == 'Sequential':
            current_lora_index = current_frame // frame_interval % len(lora_params)
            current_lora_params = lora_params[current_lora_index]
            (lora_alias, lora_name, model_strength, clip_strength) = current_lora_params
            lora_path = folder_paths.get_full_path('loras', lora_name)
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            print(f'[Info] CR_CycleLoRAs: Current LoRA is {lora_name}')
            (model_lora, clip_lora) = comfy.sd.load_lora_for_models(model, clip, lora, model_strength, clip_strength)
            return (model_lora, clip_lora, show_help)
        else:
            return (model, clip, show_help)
```