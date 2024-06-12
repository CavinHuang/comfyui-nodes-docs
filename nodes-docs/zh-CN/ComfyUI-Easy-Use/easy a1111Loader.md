# Documentation
- Class name: a1111Loader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点便于加载和整合各种模型组件，包括检查点、VAE 和 LORA 栈，以建立一个全面的管道，根据提供的提示和参数处理和生成图像。

# Input types
## Required
- ckpt_name
    - 检查点名称对于指定要加载的模型状态至关重要，它直接影响节点根据所需配置生成图像的能力。
    - Comfy dtype: COMBO
    - Python dtype: str
- vae_name
    - VAE名称参数对于选择适当的变分自编码器模型至关重要，它在图像生成过程中起着重要作用。
    - Comfy dtype: COMBO
    - Python dtype: str
- clip_skip
    - clip_skip 参数对于控制CLIP与模型之间的交互很重要，影响节点的效率和生成图像的质量。
    - Comfy dtype: INT
    - Python dtype: int
- lora_name
    - LORA名称参数对于应用模型特定的增强至关重要，它可以显著提高节点在图像生成任务中的性能。
    - Comfy dtype: COMBO
    - Python dtype: str
- lora_model_strength
    - lora_model_strength 参数调整LORA增强对模型的影响，影响节点根据特定要求微调图像生成的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_clip_strength
    - lora_clip_strength 参数修改CLIP与LORA集成的强度，这对于实现平衡和协调的图像生成过程至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 分辨率参数定义了输出图像的大小，这是决定节点能够产生高质量视觉效果的关键因素。
    - Comfy dtype: COMBO
    - Python dtype: str
- empty_latent_width
    - empty_latent_width 参数设置了潜在空间的宽度，对于节点生成多样化和复杂图像模式的能力至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - empty_latent_height 参数建立了潜在空间的高度，影响了节点创建详细和细腻图像的能力。
    - Comfy dtype: INT
    - Python dtype: int
- positive
    - positive 参数提供正面提示来指导图像生成过程，显著影响节点的输出质量和相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - negative 参数提供负面提示来完善图像生成，专注于节点在输出中避免不需要的特征的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- batch_size
    - batch_size 参数决定了同时处理的图像数量，这影响了节点的吞吐量和效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - pipe 输出封装了加载的模型和设置，为后续的图像生成和处理任务提供了基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - model 输出提供了加载的模型，这对于根据输入提示和参数执行图像生成至关重要。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- vae
    - vae 输出包含加载的VAE模型，这对于生成和处理潜在空间和图像至关重要。
    - Comfy dtype: VAE
    - Python dtype: VAE

# Usage tips
- Infra type: CPU

# Source code
```
class a1111Loader:

    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f'{width} x {height}' for (width, height) in BASE_RESOLUTIONS]
        a1111_prompt_style_default = False
        checkpoints = folder_paths.get_filename_list('checkpoints')
        loras = ['None'] + folder_paths.get_filename_list('loras')
        return {'required': {'ckpt_name': (checkpoints,), 'vae_name': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'clip_skip': ('INT', {'default': -1, 'min': -24, 'max': 0, 'step': 1}), 'lora_name': (loras,), 'lora_model_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_clip_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'resolution': (resolution_strings, {'default': '512 x 512'}), 'empty_latent_width': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'positive': ('STRING', {'default': 'Positive', 'multiline': True}), 'negative': ('STRING', {'default': 'Negative', 'multiline': True}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}, 'optional': {'optional_lora_stack': ('LORA_STACK',), 'a1111_prompt_style': ('BOOLEAN', {'default': a1111_prompt_style_default})}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'VAE')
    RETURN_NAMES = ('pipe', 'model', 'vae')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def adv_pipeloader(self, ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength, resolution, empty_latent_width, empty_latent_height, positive, negative, batch_size, optional_lora_stack=None, a1111_prompt_style=False, prompt=None, my_unique_id=None):
        return fullLoader.adv_pipeloader(self, ckpt_name, 'Default', vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength, resolution, empty_latent_width, empty_latent_height, positive, 'mean', 'A1111', negative, 'mean', 'A1111', batch_size, None, None, None, optional_lora_stack, a1111_prompt_style, prompt, my_unique_id)
```