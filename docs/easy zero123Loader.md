# Documentation
- Class name: zero123Loader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

zero123Loader节点作为一个接口，用于加载和管理各种模型和图像，便于初始化复杂的图像处理和生成任务的流程。它通过处理VAE和CLIP模型等必要组件的检索和配置，简化了后续操作，确保操作能够高效有效地执行。

# Input types
## Required
- ckpt_name
    - ckpt_name参数用于指定要加载的包含训练模型参数的检查点。这对于节点正确运行和启动后续的图像处理及生成任务至关重要。
    - Comfy dtype: COMBO[[['stable_zero123.ckpt']]]
    - Python dtype: str
- vae_name
    - vae_name参数用于选择适当的VAE模型，该模型用于生成和处理图像的潜在表示。VAE模型的选择对节点生成的图像质量和特性有着显著影响。
    - Comfy dtype: COMBO[['Baked VAE'] + folder_paths.get_filename_list('vae')]
    - Python dtype: str
- init_image
    - init_image参数至关重要，因为它提供了作为图像处理和生成任务起点的初始图像数据。这张图像的内容和质量直接影响输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- empty_latent_width
    - empty_latent_width参数定义了将要填充生成内容的空潜在空间的宽度。它是决定生成图像的分辨率和规模的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - empty_latent_height参数设置了空潜在空间的高度，对应于生成图像的垂直维度。这个参数对于控制输出图像的长宽比和大小非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 
    - Comfy dtype: INT
    - Python dtype: int
- elevation
    - elevation参数指定了图像的观察视角的垂直角度，影响渲染输出的透视和外观。它是创建逼真且视觉上吸引人的图像的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- azimuth
    - azimuth参数决定了图像观察的水平角度，影响生成图像的方向和布局。它对于将输出与期望的视觉方向对齐至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prompt
    - prompt参数为图像生成过程提供文本指导，帮助塑造生成图像的内容和风格。这是一个可选但有用的工具，用于引导节点输出的创作方向。
    - Comfy dtype: PROMPT
    - Python dtype: str
- my_unique_id
    - my_unique_id参数用于跟踪和管理节点操作的唯一实例，确保每次执行都是可识别和独特的。这有助于调试和维护流程的完整性。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - pipe输出是一个综合性结构，封装了图像处理和生成流程所需的所有组件和设置。它作为后续操作的支柱，确保工作流程的顺畅和协调。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - model输出提供了已加载和配置的模型，准备用于图像处理任务。它是直接影响图像生成质量和准确性的关键组件。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.ModelPatcher
- vae
    - vae输出包含了已经初始化并准备好用于生成和处理潜在图像表示的VAE模型。它在图像创建过程中起着核心作用，使节点能够产生高质量的视觉效果。
    - Comfy dtype: VAE
    - Python dtype: comfy.sd.VAE

# Usage tips
- Infra type: CPU

# Source code
```
class zero123Loader:

    @classmethod
    def INPUT_TYPES(cls):

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'zero123' in file.lower()]
        return {'required': {'ckpt_name': (list(['stable_zero123.ckpt']),), 'vae_name': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'init_image': ('IMAGE',), 'empty_latent_width': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64}), 'elevation': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0}), 'azimuth': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0})}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'VAE')
    RETURN_NAMES = ('pipe', 'model', 'vae')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def adv_pipeloader(self, ckpt_name, vae_name, init_image, empty_latent_width, empty_latent_height, batch_size, elevation, azimuth, prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None
        clip_vision = None
        easyCache.update_loaded_objects(prompt)
        (model, clip, vae, clip_vision) = easyCache.load_checkpoint(ckpt_name, 'Default', True)
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        cam_embeds = camera_embeddings(elevation, azimuth)
        cond = torch.cat([pooled, cam_embeds.repeat((pooled.shape[0], 1, 1))], dim=-1)
        positive = [[cond, {'concat_latent_image': t}]]
        negative = [[torch.zeros_like(pooled), {'concat_latent_image': torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8])
        samples = {'samples': latent}
        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))
        pipe = {'model': model, 'positive': positive, 'negative': negative, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': 0, 'loader_settings': {'ckpt_name': ckpt_name, 'vae_name': vae_name, 'positive': positive, 'positive_l': None, 'positive_g': None, 'positive_balance': None, 'negative': negative, 'negative_l': None, 'negative_g': None, 'negative_balance': None, 'empty_latent_width': empty_latent_width, 'empty_latent_height': empty_latent_height, 'batch_size': batch_size, 'seed': 0, 'empty_samples': samples}}
        return (pipe, model, vae)
```