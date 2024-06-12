# Documentation
- Class name: SeargeInput4
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为多种模型输入的多路复用器，整合并组织它们以供进一步处理。它确保基于提供的设置选择适当的模型，简化了工作流程并提高了模型集成的效率。

# Input types
## Required
- base_model
    - 基础模型是构成进一步改进和增强的基础神经网络架构。其选择至关重要，因为它直接影响输出的质量和适用性。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('checkpoints'),]
    - Python dtype: List[str]
- refiner_model
    - 细化模型是在基础模型之上的进阶版本，专注于提高模型性能的特定方面。其包含对于在结果中实现更高的准确性和细节至关重要。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('checkpoints'),]
    - Python dtype: List[str]
- vae_model
    - VAE（变分自编码器）模型用于降维和生成与输入数据相似的新数据点。其在创建压缩表示和促进新数据生成方面的作用至关重要。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('vae'),]
    - Python dtype: List[str]
- main_upscale_model
    - 主要放大模型负责提高输入数据的分辨率。它在提高输出的视觉质量和细节方面发挥着关键作用，确保放大的结果达到预期的标准。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('upscale_models'),]
    - Python dtype: List[str]
- support_upscale_model
    - 支持放大模型协助放大过程，为主放大模型提供额外支持。它的存在有助于放大过程的稳健性和可靠性，确保最终输出的质量。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('upscale_models'),]
    - Python dtype: List[str]
- lora_model
    - LoRA（低秩适应）模型用于有效适应预训练模型到新任务或数据。它在实现模型使用的适应性和灵活性方面发挥着重要作用，允许在多样化数据集上获得更好的性能。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('loras'),]
    - Python dtype: List[str]
## Optional
- model_settings
    - 模型设置是可选的配置，可用于根据特定要求或偏好定制模型的行为，而无需更改基础模型本身。
    - Comfy dtype: Dict[str, str]
    - Python dtype: Optional[Dict[str, str]]

# Output types
- model_names
    - 输出是一个模型名称的字典，它为工作流中不同目的选定的模型提供了结构化的概览。这种有组织的表示对于后续步骤正确利用适当的模型至关重要。
    - Comfy dtype: Dict[str, str]
    - Python dtype: Dict[str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput4:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': (folder_paths.get_filename_list('checkpoints'),), 'refiner_model': (folder_paths.get_filename_list('checkpoints'),), 'vae_model': (folder_paths.get_filename_list('vae'),), 'main_upscale_model': (folder_paths.get_filename_list('upscale_models'),), 'support_upscale_model': (folder_paths.get_filename_list('upscale_models'),), 'lora_model': (folder_paths.get_filename_list('loras'),)}, 'optional': {'model_settings': ('MODEL_SETTINGS',)}}
    RETURN_TYPES = ('MODEL_NAMES',)
    RETURN_NAMES = ('model_names',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, base_model, refiner_model, vae_model, main_upscale_model, support_upscale_model, lora_model, model_settings=None):
        if model_settings is None:
            model_names = {}
        else:
            model_names = model_settings
        model_names['base_model'] = base_model
        model_names['refiner_model'] = refiner_model
        model_names['vae_model'] = vae_model
        model_names['main_upscale_model'] = main_upscale_model
        model_names['support_upscale_model'] = support_upscale_model
        model_names['lora_model'] = lora_model
        return (model_names,)
```