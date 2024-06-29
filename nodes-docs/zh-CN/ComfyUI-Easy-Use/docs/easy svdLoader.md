# Documentation
- Class name: svdLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

svdLoader节点作为加载和处理模型检查点、VAE和CLIP模型的关键组件，促进了复杂生成管道的初始化和设置。它简化了将各种模型集成到工作流中的过程，确保了高效和无缝的数据处理和转换。

# Input types
## Required
- ckpt_name
    - 检查点名称参数对于指定要加载的模型检查点至关重要，它构成了生成过程的基础。它决定了生成输出的质量和特性。
    - Comfy dtype: COMBO
    - Python dtype: str
- vae_name
    - VAE名称参数对于选择适当的变分自编码器至关重要，它在生成模型的降维和潜在空间形成中起着重要作用。
    - Comfy dtype: COMBO
    - Python dtype: str
- clip_name
    - CLIP名称参数对于选择正确的CLIP模型至关重要，它负责为生成过程提供文本条件能力。
    - Comfy dtype: COMBO
    - Python dtype: str
- init_image
    - init_image参数至关重要，因为它提供了作为生成模型参考的初始视觉输入，显著影响生成内容的方向和质量。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- resolution
    - 分辨率参数在确定生成图像的大小和比例方面至关重要，直接影响输出的细节和清晰度水平。
    - Comfy dtype: COMBO
    - Python dtype: str
- empty_latent_width
    - empty_latent_width参数对于定义潜在空间的宽度很重要，它影响生成图像的多样性和变化性。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - empty_latent_height参数对于设置潜在空间的高度很重要，它影响生成图像的结构连贯性和构图。
    - Comfy dtype: INT
    - Python dtype: int
- video_frames
    - video_frames参数对于定义视频中的帧数至关重要，它直接影响生成视频内容的时长和序列。
    - Comfy dtype: INT
    - Python dtype: int
- motion_bucket_id
    - motion_bucket_id参数对于控制生成视频帧中的运动和动态至关重要，它影响运动的流畅性和自然性。
    - Comfy dtype: INT
    - Python dtype: int
- fps
    - fps参数在确定生成视频的帧率方面至关重要，它直接影响视频内容的流畅度和播放速度。
    - Comfy dtype: INT
    - Python dtype: int
- augmentation_level
    - augmentation_level参数对于在图像生成过程中引入随机变化很重要，它增强了生成输出的多样性和鲁棒性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - pipe输出是一个综合性结构，包含了生成管道所需的所有必要组件，包括模型、VAE和CLIP，它们对后续的处理和生成任务至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - model输出代表加载的生成模型，它是根据输入数据和定义参数创建最终输出的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- vae
    - vae输出是变分自编码器模型，它在生成和操作潜在空间方面起着重要作用，对生成内容的多样性和质量至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class svdLoader:

    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f'{width} x {height}' for (width, height) in BASE_RESOLUTIONS]

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'svd' in file.lower()]
        return {'required': {'ckpt_name': (list(['svd.safetensors', 'svd_xt.safetensors', 'svd_image_decoder.safetensors', 'svd_xt_image_decoder.safetensors', 'svd-fp16.safetensors', 'svd_xt-fp16.safetensors', 'svd_image_decoder-fp16.safetensors', 'svd_xt_image_decoder-fp16.safetensors', 'svd_xt_1_1.safetensors']),), 'vae_name': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'clip_name': (['None'] + folder_paths.get_filename_list('clip'),), 'init_image': ('IMAGE',), 'resolution': (resolution_strings, {'default': '1024 x 576'}), 'empty_latent_width': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'video_frames': ('INT', {'default': 14, 'min': 1, 'max': 4096}), 'motion_bucket_id': ('INT', {'default': 127, 'min': 1, 'max': 1023}), 'fps': ('INT', {'default': 6, 'min': 1, 'max': 1024}), 'augmentation_level': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'optional_positive': ('STRING', {'default': '', 'multiline': True}), 'optional_negative': ('STRING', {'default': '', 'multiline': True})}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'VAE')
    RETURN_NAMES = ('pipe', 'model', 'vae')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def adv_pipeloader(self, ckpt_name, vae_name, clip_name, init_image, resolution, empty_latent_width, empty_latent_height, video_frames, motion_bucket_id, fps, augmentation_level, optional_positive=None, optional_negative=None, prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None
        clip_vision = None
        if resolution != '自定义 x 自定义':
            try:
                (width, height) = map(int, resolution.split(' x '))
                empty_latent_width = width
                empty_latent_height = height
            except ValueError:
                raise ValueError('Invalid base_resolution format.')
        easyCache.update_loaded_objects(prompt)
        (model, clip, vae, clip_vision) = easyCache.load_checkpoint(ckpt_name, 'Default', True)
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        if augmentation_level > 0:
            encode_pixels += torch.randn_like(pixels) * augmentation_level
        t = vae.encode(encode_pixels)
        positive = [[pooled, {'motion_bucket_id': motion_bucket_id, 'fps': fps, 'augmentation_level': augmentation_level, 'concat_latent_image': t}]]
        negative = [[torch.zeros_like(pooled), {'motion_bucket_id': motion_bucket_id, 'fps': fps, 'augmentation_level': augmentation_level, 'concat_latent_image': torch.zeros_like(t)}]]
        if optional_positive is not None and optional_positive != '':
            if clip_name == 'None':
                raise Exception('You need choose a open_clip model when positive is not empty')
            clip = easyCache.load_clip(clip_name)
            (positive_embeddings_final,) = CLIPTextEncode().encode(clip, optional_positive)
            (positive,) = ConditioningConcat().concat(positive, positive_embeddings_final)
        if optional_negative is not None and optional_negative != '':
            if clip_name == 'None':
                raise Exception('You need choose a open_clip model when negative is not empty')
            (negative_embeddings_final,) = CLIPTextEncode().encode(clip, optional_negative)
            (negative,) = ConditioningConcat().concat(negative, negative_embeddings_final)
        latent = torch.zeros([video_frames, 4, empty_latent_height // 8, empty_latent_width // 8])
        samples = {'samples': latent}
        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))
        pipe = {'model': model, 'positive': positive, 'negative': negative, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': 0, 'loader_settings': {'ckpt_name': ckpt_name, 'vae_name': vae_name, 'positive': positive, 'positive_l': None, 'positive_g': None, 'positive_balance': None, 'negative': negative, 'negative_l': None, 'negative_g': None, 'negative_balance': None, 'empty_latent_width': empty_latent_width, 'empty_latent_height': empty_latent_height, 'batch_size': 1, 'seed': 0, 'empty_samples': samples}}
        return (pipe, model, vae)
```