# Documentation
- Class name: SVD_img2vid_Conditioning
- Category: conditioning/video_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SVD_img2vid_Conditioning节点旨在处理和调节视频帧以进行生成。它对初始图像进行编码并将其缩放到所需的尺寸，然后根据指定应用增强。该节点利用VAE对像素信息进行编码，并为视频帧生成生成正面和负面的调节样本，以及用于进一步处理的潜在表示。

# Input types
## Required
- clip_vision
    - clip_vision参数对于图像的初始编码至关重要。它用于生成图像嵌入，这对于后续的视频帧调节过程是必不可少的。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- init_image
    - init_image参数是视频生成过程的起点。它是被编码和放大以形成视频帧基础的图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- vae
    - vae参数代表节点中使用的变分自编码器。它负责将放大的像素信息编码成潜在空间表示。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- width
    - width参数决定了放大图像的水平分辨率。它是确定视频帧最终质量和尺寸的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数设置放大图像的垂直分辨率。与宽度一起，它定义了视频帧的总体大小。
    - Comfy dtype: INT
    - Python dtype: int
- video_frames
    - video_frames参数指定要为视频生成的总帧数。它直接影响视频的长度。
    - Comfy dtype: INT
    - Python dtype: int
- motion_bucket_id
    - motion_bucket_id参数用于选择视频帧的特定运动特性，影响动画的风格。
    - Comfy dtype: INT
    - Python dtype: int
- fps
    - fps参数代表每秒帧数，决定了生成视频的播放速度。
    - Comfy dtype: INT
    - Python dtype: int
- augmentation_level
    - augmentation_level参数控制应用于放大像素的随机扰动的程度，为视频帧添加可变性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - 正面输出提供一组调节样本，用于引导视频生成过程朝期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]
- negative
    - 负面输出包括有助于通过提供要避免的示例来完善视频生成的调节样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]
- latent
    - 潜在输出包含视频帧的编码潜在表示，适合进一步分析或操作。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SVD_img2vid_Conditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'init_image': ('IMAGE',), 'vae': ('VAE',), 'width': ('INT', {'default': 1024, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 576, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'video_frames': ('INT', {'default': 14, 'min': 1, 'max': 4096}), 'motion_bucket_id': ('INT', {'default': 127, 'min': 1, 'max': 1023}), 'fps': ('INT', {'default': 6, 'min': 1, 'max': 1024}), 'augmentation_level': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/video_models'

    def encode(self, clip_vision, init_image, vae, width, height, video_frames, motion_bucket_id, fps, augmentation_level):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), width, height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        if augmentation_level > 0:
            encode_pixels += torch.randn_like(pixels) * augmentation_level
        t = vae.encode(encode_pixels)
        positive = [[pooled, {'motion_bucket_id': motion_bucket_id, 'fps': fps, 'augmentation_level': augmentation_level, 'concat_latent_image': t}]]
        negative = [[torch.zeros_like(pooled), {'motion_bucket_id': motion_bucket_id, 'fps': fps, 'augmentation_level': augmentation_level, 'concat_latent_image': torch.zeros_like(t)}]]
        latent = torch.zeros([video_frames, 4, height // 8, width // 8])
        return (positive, negative, {'samples': latent})
```