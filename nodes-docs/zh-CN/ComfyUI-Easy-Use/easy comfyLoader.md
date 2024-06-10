# Documentation
- Class name: comfyLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

comfyLoader类的`adv_pipeloader`方法简化了为高级用例加载和准备模型和数据的过程。它整合了VAE、CLIP和LORA等组件，创建了一个全面的处理流程，便于根据用户提供的提示和偏好生成和操作高质量的图像。

# Input types
## Required
- ckpt_name
    - ckpt_name是确定要在流程中使用的具体模型配置的关键。它通过决定模型的架构和学习到的参数，影响节点的整体性能和输出。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('checkpoints')]
    - Python dtype: Union[str, None]
- vae_name
    - vae_name参数对于选择适当的变分自编码器模型至关重要，它在生成和操作图像的潜在表示方面发挥着重要作用。
    - Comfy dtype: COMBO[['Baked VAE'] + folder_paths.get_filename_list('vae')]
    - Python dtype: Union[str, None]
- clip_skip
    - 参数`clip_skip`在控制与CLIP模型的交互中起着重要作用，影响节点如何利用语义信息来增强图像生成。
    - Comfy dtype: INT
    - Python dtype: int
- lora_name
    - lora_name参数对于启用具有LORA层的模型微调至关重要，它根据用户的具体偏好细化图像生成过程。
    - Comfy dtype: COMBO[['None'] + folder_paths.get_filename_list('loras')]
    - Python dtype: Union[str, None]
- lora_model_strength
    - 参数`lora_model_strength`调整LORA层对模型输出的影响，直接影响微调过程和生成的图像质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_clip_strength
    - 参数`lora_clip_strength`调节CLIP模型与LORA层集成的强度，这对于在生成的图像中实现语义准确性和视觉真实性之间的平衡至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 分辨率参数决定了输出图像的尺寸，显著影响图像生成所需的细节水平和计算资源。
    - Comfy dtype: COMBO[resolution_strings]
    - Python dtype: Union[str, None]
- empty_latent_width
    - 参数`empty_latent_width`设置了潜在空间的宽度，这对于确定可以生成的可能图像变化范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 参数`empty_latent_height`定义了潜在空间的高度，在图像输出的多样性和生成过程的效率方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- positive
    - 参数`positive`包含正面提示文本，这对于引导模型生成符合期望美学或主题方向的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 参数`negative`包含负面提示文本，这对于引导模型远离生成图像中不需要的特征或风格至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- batch_size
    - 参数`batch_size`决定了同时处理的图像数量，影响图像生成过程的吞吐量和计算效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ui
    - UI输出提供了通配符提示的用户友好表示，这些提示对于可视化应用于图像生成过程的正面和负面影响非常重要。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, str]
- result
    - 结果输出是一个包含加载的模型、VAE、CLIP和其他相关数据结构的全面元组，这些对于进一步的图像操作和分析至关重要。
    - Comfy dtype: TUPLE
    - Python dtype: Tuple[Dict[str, Any], ModelPatcher, VAE, CLIP, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class comfyLoader:

    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f'{width} x {height}' for (width, height) in BASE_RESOLUTIONS]
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),), 'vae_name': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'clip_skip': ('INT', {'default': -1, 'min': -24, 'max': 0, 'step': 1}), 'lora_name': (['None'] + folder_paths.get_filename_list('loras'),), 'lora_model_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_clip_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'resolution': (resolution_strings, {'default': '512 x 512'}), 'empty_latent_width': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'positive': ('STRING', {'default': 'Positive', 'multiline': True}), 'negative': ('STRING', {'default': 'Negative', 'multiline': True}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}, 'optional': {'optional_lora_stack': ('LORA_STACK',)}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'VAE')
    RETURN_NAMES = ('pipe', 'model', 'vae')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def adv_pipeloader(self, ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength, resolution, empty_latent_width, empty_latent_height, positive, negative, batch_size, optional_lora_stack=None, prompt=None, my_unique_id=None):
        return fullLoader.adv_pipeloader(self, ckpt_name, 'Default', vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength, resolution, empty_latent_width, empty_latent_height, positive, 'none', 'comfy', negative, 'none', 'comfy', batch_size, None, None, None, optional_lora_stack, False, prompt, my_unique_id)
```