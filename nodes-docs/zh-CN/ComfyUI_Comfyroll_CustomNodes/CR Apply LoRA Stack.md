# Documentation
- Class name: CR_ApplyLoRAStack
- Category: Comfyroll/LoRA
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ApplyLoRAStack 节点旨在将一系列 LoRA（低秩适应）修改应用于模型及其相关剪辑。它通过叠加多个 LoRA 调整来增强模型的能力，允许对特定特征进行微调，而不会显著增加模型的大小或计算负载。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了 LoRA 修改的主要对象。它是 LoRA 栈操作的基础，栈中的每一层都可能改变其行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 剪辑参数是必不可少的，因为它通过提供上下文信息来补充模型，这些信息可以与 LoRA 栈一起使用，影响最终输出。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
## Optional
- lora_stack
    - lora_stack 参数是系列 LoRA 配置的集合，它决定了如何调整模型和剪辑。栈中的每个元素都有助于整体转换。
    - Comfy dtype: LORA_STACK
    - Python dtype: List[Tuple[str, float, float]]

# Output types
- MODEL
    - 输出模型代表了应用 LoRA 栈后输入模型的修改版本。它包含了通过 LoRA 调整所做的增强。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 输出剪辑是输入剪辑的修改版本，已与模型一起调整，以反映 LoRA 栈的影响。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以进一步协助和理解 LoRA 栈应用过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class CR_ApplyLoRAStack:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'lora_stack': ('LORA_STACK',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'show_help')
    FUNCTION = 'apply_lora_stack'
    CATEGORY = icons.get('Comfyroll/LoRA')

    def apply_lora_stack(self, model, clip, lora_stack=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/LoRA-Nodes#cr-apply-lora-stack'
        lora_params = list()
        if lora_stack:
            lora_params.extend(lora_stack)
        else:
            return (model, clip, show_help)
        model_lora = model
        clip_lora = clip
        for tup in lora_params:
            (lora_name, strength_model, strength_clip) = tup
            lora_path = folder_paths.get_full_path('loras', lora_name)
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            (model_lora, clip_lora) = comfy.sd.load_lora_for_models(model_lora, clip_lora, lora, strength_model, strength_clip)
        return (model_lora, clip_lora, show_help)
```