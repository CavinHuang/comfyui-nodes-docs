# Documentation
- Class name: SV3D_Conditioning
- Category: conditioning/3d_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SV3D_Conditioning节点旨在处理和编码视觉和空间信息，以生成3D条件数据。它接受各种输入，如图像、视觉模型和空间参数，以产生可用于3D模型生成任务的条件信号。该节点在将生成的3D模型与输入视觉和空间上下文对齐中发挥关键作用。

# Input types
## Required
- clip_vision
    - clip_vision参数对于节点至关重要，因为它提供了用于编码初始图像的视觉模型。此输入直接影响编码图像表示的质量和准确性，这对于后续的3D模型生成过程至关重要。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- init_image
    - init_image参数是节点的关键输入，代表将用于调节3D模型的初始图像。它在定义输出3D模型的视觉方面至关重要，必须仔细选择以确保所需的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- vae
    - vae参数表示节点内使用的变分自编码器（VAE），用于将像素数据编码到潜在空间。这种转换对于创建可用于调节3D模型生成的丰富特征表示至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- width
    - width参数指定了放大图像所需的宽度。它是确定最终3D模型的分辨率和细节水平的关键因素，较高的值通常会导致更详细的输出。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数设置放大图像所需的高度。与宽度一起，它决定了用于编码的图像的整体尺寸，随后影响3D模型的细节和保真度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- video_frames
    - video_frames参数决定了要为视频输出生成的帧数。它是一个可选输入，可以根据3D模型生成任务的具体要求进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- elevation
    - elevation参数提供了查看3D模型的垂直角度。它是一个可选输入，允许调整观察角度以实现最终输出中所需的视角。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - positive输出由编码后的图像嵌入和空间参数组成，作为3D模型生成的正向调节信号。这个输出非常重要，因为它直接有助于根据输入图像和空间上下文塑造最终的3D模型。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]}
- negative
    - negative输出包含零值的图像嵌入和空间参数，作为负向调节信号。这个输出用于提供与正向信号的对比，有助于完善3D模型生成过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]
- latent
    - latent输出代表放大图像的潜在空间表示。它是3D模型生成的关键组成部分，因为它包含了从输入图像中提取的视觉特征。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SV3D_Conditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'init_image': ('IMAGE',), 'vae': ('VAE',), 'width': ('INT', {'default': 576, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 576, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'video_frames': ('INT', {'default': 21, 'min': 1, 'max': 4096}), 'elevation': ('FLOAT', {'default': 0.0, 'min': -90.0, 'max': 90.0, 'step': 0.1, 'round': False})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/3d_models'

    def encode(self, clip_vision, init_image, vae, width, height, video_frames, elevation):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), width, height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        azimuth = 0
        azimuth_increment = 360 / (max(video_frames, 2) - 1)
        elevations = []
        azimuths = []
        for i in range(video_frames):
            elevations.append(elevation)
            azimuths.append(azimuth)
            azimuth += azimuth_increment
        positive = [[pooled, {'concat_latent_image': t, 'elevation': elevations, 'azimuth': azimuths}]]
        negative = [[torch.zeros_like(pooled), {'concat_latent_image': torch.zeros_like(t), 'elevation': elevations, 'azimuth': azimuths}]]
        latent = torch.zeros([video_frames, 4, height // 8, width // 8])
        return (positive, negative, {'samples': latent})
```