# Documentation
- Class name: MakeBasicPipe
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

MakeBasicPipe节点旨在为生成模型简化和操作文本提示的过程。它处理正面和负面提示，集成了先进的编码技术来精炼模型生成的输入数据。该节点抽象了提示构建的复杂性，专注于提高输入数据的质量和相关性，以改善生成输出。

# Input types
## Required
- ckpt_name
    - 检查点名称对于识别用于生成过程的特定模型状态至关重要。这是一个必需的参数，它指导节点定位和使用适当的模型权重和配置。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_wildcard_text
    - 此参数保存正面通配符文本，作为指导生成模型产生期望结果的指南。其策略性使用可以显著影响生成文本的质量。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_wildcard_text
    - 负面通配符文本为模型提供了避免不需要的输出的框架。它是引导生成过程朝着预期方向前进的重要组成部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- basic_pipe
    - 输出代表一个结构化的流程，包括模型、编码器和处理过的提示，准备进行生成过程。它封装了节点在准备数据以有效利用模型的功能。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, CLIP, VAE, str]
- cache_key
    - 这个输出是缓存的检查点和提示数据的唯一标识符，可用于后续的检索和处理。它对于保持生成工作流的一致性和效率至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class MakeBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),), 'ckpt_key_opt': ('STRING', {'multiline': False, 'placeholder': "If empty, use 'ckpt_name' as the key."}), 'positive_wildcard_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Positive Prompt (User Input)'}), 'negative_wildcard_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Negative Prompt (User Input)'}), 'Add selection to': ('BOOLEAN', {'default': True, 'label_on': 'Positive', 'label_off': 'Negative'}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],), 'wildcard_mode': ('BOOLEAN', {'default': True, 'label_on': 'Populate', 'label_off': 'Fixed'}), 'positive_populated_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Populated Positive Prompt (Will be generated automatically)'}), 'negative_populated_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Populated Negative Prompt (Will be generated automatically)'}), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++', 'down_weight'], {'default': 'comfy++'}), 'stop_at_clip_layer': ('INT', {'default': -2, 'min': -24, 'max': -1, 'step': 1}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'optional': {'vae_opt': ('VAE',)}}
    CATEGORY = 'InspirePack/Prompt'
    RETURN_TYPES = ('BASIC_PIPE', 'STRING')
    RETURN_NAMES = ('basic_pipe', 'cache_key')
    FUNCTION = 'doit'

    def doit(self, **kwargs):
        pos_populated = kwargs['positive_populated_text']
        neg_populated = kwargs['negative_populated_text']
        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])
        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack', "To use 'Make Basic Pipe (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Make Basic Pipe (Inspire)', you need to install 'Impact Pack'")
        (model, clip, vae, key) = CheckpointLoaderSimpleShared().doit(ckpt_name=kwargs['ckpt_name'], key_opt=kwargs['ckpt_key_opt'])
        clip = nodes.CLIPSetLastLayer().set_last_layer(clip, kwargs['stop_at_clip_layer'])[0]
        (model, clip, positive) = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=pos_populated, model=model, clip=clip, clip_encoder=clip_encoder)
        (model, clip, negative) = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=neg_populated, model=model, clip=clip, clip_encoder=clip_encoder)
        if 'vae_opt' in kwargs:
            vae = kwargs['vae_opt']
        basic_pipe = (model, clip, vae, positive, negative)
        return (basic_pipe, key)
```