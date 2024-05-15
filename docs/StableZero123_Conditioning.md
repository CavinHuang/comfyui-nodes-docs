# Documentation
- Class name: StableZero123_Conditioning
- Category: conditioning/3d_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

StableZero123_Conditioning类的`encode`方法旨在将视觉和空间信息转换成可用于生成3D模型的形式。它对初始图像进行编码，整合相机方向，并为3D模型生成过程中的正负条件准备潜在表示。

# Input types
## Required
- clip_vision
    - 参数`clip_vision`对于编码过程至关重要，因为它提供了用于理解和处理初始图像的视觉模型。它在将视觉数据转换成可用于3D模型条件的形式中起着关键作用。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Any
- init_image
    - 参数`init_image`是必需的，因为它是节点用来生成潜在表示的初始图像。它通过为编码过程提供基本的视觉上下文，直接影响3D模型的视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - 参数`vae`是一个变分自编码器，负责将视觉数据编码到潜在空间中。它是将图像像素转换成适合3D模型生成格式的关键组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- width
    - 参数`width`指定了放大图像的宽度，对于确定分析图像特征的分辨率很重要。它影响编码过程中捕获的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 参数`height`设置放大图像的高度，对于分辨率和编码图像的结构完整性很重要。它确保图像在编码过程中保持其纵横比和质量。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 参数`batch_size`定义了一次迭代中处理的样本数量，这对于在编码过程中管理内存使用和计算效率至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- elevation
    - 参数`elevation`代表相机的垂直角度，对3D模型的空间条件至关重要。它影响模型的观察视角，从而影响最终渲染效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- azimuth
    - 参数`azimuth`表示相机的水平角度，在3D模型的空间条件中起着关键作用。它决定了模型在水平平面上的方向，影响生成模型的整体外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - 输出`positive`提供了编码的图像特征和相机方向，作为3D模型生成过程的正向条件。它是一个关键组件，引导模型生成与输入图像和相机视角一致的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]
- negative
    - 输出`negative`通过提供零特征的基线来作为负向条件，与正向条件形成对比。它通过强调所需图像与零状态之间的差异，有助于细化模型生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]
- latent
    - 输出`latent`包含代表以压缩形式编码图像的潜在样本。这些样本被用作3D模型生成的基础，以简洁的方式捕获基本的视觉和空间信息。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class StableZero123_Conditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'init_image': ('IMAGE',), 'vae': ('VAE',), 'width': ('INT', {'default': 256, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 256, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096}), 'elevation': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False}), 'azimuth': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/3d_models'

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), width, height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        cam_embeds = camera_embeddings(elevation, azimuth)
        cond = torch.cat([pooled, cam_embeds.to(pooled.device).repeat((pooled.shape[0], 1, 1))], dim=-1)
        positive = [[cond, {'concat_latent_image': t}]]
        negative = [[torch.zeros_like(pooled), {'concat_latent_image': torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (positive, negative, {'samples': latent})
```