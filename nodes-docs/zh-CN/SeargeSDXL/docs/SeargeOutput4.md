# Documentation
- Class name: SeargeOutput4
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在便于在复杂系统中分离和识别各种模型组件。它接收结构化的模型名称输入，并将其解构，提供对每种模型类型的单独访问，从而增强输出数据的模块化和组织性。

# Input types
## Required
- model_names
    - 该参数至关重要，因为它包含了节点操作所需的所有模型名称。它是一个复合结构，包含不同模型的名称，每个模型在系统中扮演不同的角色。
    - Comfy dtype: COMBO[{'base_model': str, 'refiner_model': str, 'vae_model': str, 'main_upscale_model': str, 'support_upscale_model': str, 'lora_model': str}]
    - Python dtype: Dict[str, str]

# Output types
- model_names
    - 输出保持了输入的结构化格式，提供了模型名称的清晰和有组织的表示。这便于系统中其他组件进行进一步的处理和分析。
    - Comfy dtype: COMBO[{'base_model': str, 'refiner_model': str, 'vae_model': str, 'main_upscale_model': str, 'support_upscale_model': str, 'lora_model': str}]
    - Python dtype: Dict[str, str]
- base_model
    - 此输出代表系统中的基础模型，它为其他模型和过程提供基础。识别它对于理解所涉及模型的结构和层次至关重要。
    - Comfy dtype: str
    - Python dtype: str
- refiner_model
    - 精炼模型输出表明了一个旨在增强或改进基础模型输出的模型。它在提高系统结果的整体准确性和质量方面发挥着关键作用。
    - Comfy dtype: str
    - Python dtype: str
- vae_model
    - 此输出指定了变分自编码器（VAE）模型，它在学习生成新的数据表示方面发挥着重要作用。它是涉及数据生成和特征提取任务的关键组件。
    - Comfy dtype: str
    - Python dtype: str
- main_upscale_model
    - 主要放大模型输出指的是负责提高数据分辨率的主要模型。它对于在图像处理任务中提高输出的视觉质量和细节至关重要。
    - Comfy dtype: str
    - Python dtype: str
- support_upscale_model
    - 此输出代表一个支持模型，辅助放大过程，为主放大模型提供补充。它有助于提高放大任务的整体效果和效率。
    - Comfy dtype: str
    - Python dtype: str
- lora_model
    - LoRA（低秩适应）模型输出与一种有效适应预训练模型到新任务的技术相关。它因其能够在最小的计算开销下提高模型性能而具有重要意义。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput4:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_names': ('MODEL_NAMES',)}}
    RETURN_TYPES = ('MODEL_NAMES', 'CHECKPOINT_NAME', 'CHECKPOINT_NAME', 'VAE_NAME', 'UPSCALER_NAME', 'UPSCALER_NAME', 'LORA_NAME')
    RETURN_NAMES = ('model_names', 'base_model', 'refiner_model', 'vae_model', 'main_upscale_model', 'support_upscale_model', 'lora_model')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, model_names):
        base_model = model_names['base_model']
        refiner_model = model_names['refiner_model']
        vae_model = model_names['vae_model']
        main_upscale_model = model_names['main_upscale_model']
        support_upscale_model = model_names['support_upscale_model']
        lora_model = model_names['lora_model']
        return (model_names, base_model, refiner_model, vae_model, main_upscale_model, support_upscale_model, lora_model)
```