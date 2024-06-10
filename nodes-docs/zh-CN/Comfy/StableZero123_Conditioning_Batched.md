# Documentation
- Class name: StableZero123_Conditioning_Batched
- Category: conditioning/3d_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在批量处理和生成3D模型的调节数据，整合视觉和空间信息以增强模型的表现力。

# Input types
## Required
- clip_vision
    - clip_vision参数对于从图像中编码视觉信息至关重要，这对于节点能够产生准确和有意义的调节数据至关重要。
    - Comfy dtype: CLIP_VISION
    - Python dtype: comfy.model_patcher.ModelPatcher
- init_image
    - init_image参数作为节点操作的基础，提供了初始的视觉上下文，该上下文被放大和编码以进行进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- vae
    - vae参数对于将视觉数据编码到潜在空间至关重要，这使得节点能够有效地生成用于操纵3D模型的调节数据。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- width
    - width参数决定了放大图像的水平分辨率，影响节点生成的调节数据的细节层次和复杂度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数设置了放大图像的垂直分辨率，直接影响3D模型调节数据的质量和丰富性。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - batch_size参数决定了节点可以同时执行的操作数量，提高了3D模型调节过程的效率和吞吐量。
    - Comfy dtype: INT
    - Python dtype: int
- elevation
    - elevation参数指定了相机的垂直角度，这对于创建真实且上下文准确的3D模型调节数据非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- azimuth
    - azimuth参数定义了相机的水平角度，影响了3D模型调节数据的视角和方向。
    - Comfy dtype: FLOAT
    - Python dtype: float
- elevation_batch_increment
    - elevation_batch_increment参数允许对相机的垂直角度进行批量调整，确保3D模型的调节数据多样化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- azimuth_batch_increment
    - azimuth_batch_increment参数促进了相机水平角度的批量调整，有助于3D模型调节数据的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - 正面输出提供了一组代表3D模型期望状态的调节数据，作为模型生成和操纵的指导。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- negative
    - 负面输出提供了一组补充的调节数据，定义了3D模型的不期望状态，有助于细化和约束生成过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- latent
    - 潜在输出包含编码的空间和视觉信息，构成了3D模型在系统内的内部表示和操纵的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class StableZero123_Conditioning_Batched:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'init_image': ('IMAGE',), 'vae': ('VAE',), 'width': ('INT', {'default': 256, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 256, 'min': 16, 'max': nodes.MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096}), 'elevation': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False}), 'azimuth': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False}), 'elevation_batch_increment': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False}), 'azimuth_batch_increment': ('FLOAT', {'default': 0.0, 'min': -180.0, 'max': 180.0, 'step': 0.1, 'round': False})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/3d_models'

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth, elevation_batch_increment, azimuth_batch_increment):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), width, height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        cam_embeds = []
        for i in range(batch_size):
            cam_embeds.append(camera_embeddings(elevation, azimuth))
            elevation += elevation_batch_increment
            azimuth += azimuth_batch_increment
        cam_embeds = torch.cat(cam_embeds, dim=0)
        cond = torch.cat([comfy.utils.repeat_to_batch_size(pooled, batch_size), cam_embeds], dim=-1)
        positive = [[cond, {'concat_latent_image': t}]]
        negative = [[torch.zeros_like(pooled), {'concat_latent_image': torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (positive, negative, {'samples': latent, 'batch_index': [0] * batch_size})
```