# Documentation
- Class name: StableZero123_BatchSchedule
- Category: KJNodes/experimental
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

StableZero123_BatchSchedule 类的 `encode` 方法负责处理图像并生成潜在表示。它接受各种参数，如视觉模型输出、初始图像、VAE模型以及宽度、高度和批量大小等额外设置。该方法还根据提供的方位角和高度点进行角度插值，应用不同的缓动函数以实现平滑过渡。最终输出包括正负条件数据和潜在图像表示。

# Input types
## Required
- clip_vision
    - 参数 `clip_vision` 对于将初始图像编码为可以用于进一步处理的嵌入至关重要。它代表了来自 CLIP 视觉模型的输出，是图像处理流水线的基本部分。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.Tensor
- init_image
    - 参数 `init_image` 是需要处理的原始图像。它是生成潜在表示的起点，也是该节点操作的必需输入。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- vae
    - 参数 `vae` 是一个变分自编码器（VAE）模型，用于将图像编码到潜在空间中。它在图像数据转换为下游任务中起着关键作用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- width
    - 参数 `width` 指定处理后图像的期望宽度。它是决定最终图像分辨率的重要因素，并且与高度参数一起使用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 参数 `height` 与宽度参数一起，定义了处理后图像的尺寸。它是控制输出图像大小的关键设置。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 参数 `batch_size` 决定了一次处理的图像数量。它是优化节点性能和内存使用的重要考虑因素。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 参数 `interpolation` 允许在调整图像大小时选择不同的插值方法。它影响最终图像的平滑度和外观。
    - Comfy dtype: COMBO[linear, ease_in, ease_out, ease_in_out]
    - Python dtype: str
- azimuth_points_string
    - 参数 `azimuth_points_string` 包含用于角度插值的方位点的字符串表示。它在定义图像处理中的角过渡中至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- elevation_points_string
    - 参数 `elevation_points_string` 以字符串形式指定高度点，用于控制图像处理过程中的垂直角度过渡。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 输出 `positive` 包含从图像处理中得到的正向条件数据。它用于引导生成与输入图像相似的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- negative
    - 输出 `negative` 提供了负向条件数据，用于引导生成与输入图像不同的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- latent
    - 输出 `latent` 表示节点生成的潜在图像样本。这些样本是输入图像的低维表示，适用于各种图像生成任务。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class StableZero123_BatchSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_vision': ('CLIP_VISION',), 'init_image': ('IMAGE',), 'vae': ('VAE',), 'width': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 256, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096}), 'interpolation': (['linear', 'ease_in', 'ease_out', 'ease_in_out'],), 'azimuth_points_string': ('STRING', {'default': '0:(0.0),\n7:(1.0),\n15:(0.0)\n', 'multiline': True}), 'elevation_points_string': ('STRING', {'default': '0:(0.0),\n7:(0.0),\n15:(0.0)\n', 'multiline': True})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'KJNodes/experimental'

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, azimuth_points_string, elevation_points_string, interpolation):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), width, height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)

        def ease_in(t):
            return t * t

        def ease_out(t):
            return 1 - (1 - t) * (1 - t)

        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t
        azimuth_points = []
        azimuth_points_string = azimuth_points_string.rstrip(',\n')
        for point_str in azimuth_points_string.split(','):
            (frame_str, azimuth_str) = point_str.split(':')
            frame = int(frame_str.strip())
            azimuth = float(azimuth_str.strip()[1:-1])
            azimuth_points.append((frame, azimuth))
        azimuth_points.sort(key=lambda x: x[0])
        elevation_points = []
        elevation_points_string = elevation_points_string.rstrip(',\n')
        for point_str in elevation_points_string.split(','):
            (frame_str, elevation_str) = point_str.split(':')
            frame = int(frame_str.strip())
            elevation_val = float(elevation_str.strip()[1:-1])
            elevation_points.append((frame, elevation_val))
        elevation_points.sort(key=lambda x: x[0])
        next_point = 1
        next_elevation_point = 1
        positive_cond_out = []
        positive_pooled_out = []
        negative_cond_out = []
        negative_pooled_out = []
        for i in range(batch_size):
            while next_point < len(azimuth_points) and i >= azimuth_points[next_point][0]:
                next_point += 1
            if next_point == len(azimuth_points):
                next_point -= 1
            prev_point = max(next_point - 1, 0)
            if azimuth_points[next_point][0] != azimuth_points[prev_point][0]:
                fraction = (i - azimuth_points[prev_point][0]) / (azimuth_points[next_point][0] - azimuth_points[prev_point][0])
                if interpolation == 'ease_in':
                    fraction = ease_in(fraction)
                elif interpolation == 'ease_out':
                    fraction = ease_out(fraction)
                elif interpolation == 'ease_in_out':
                    fraction = ease_in_out(fraction)
                interpolated_azimuth = interpolate_angle(azimuth_points[prev_point][1], azimuth_points[next_point][1], fraction)
            else:
                interpolated_azimuth = azimuth_points[prev_point][1]
            next_elevation_point = 1
            while next_elevation_point < len(elevation_points) and i >= elevation_points[next_elevation_point][0]:
                next_elevation_point += 1
            if next_elevation_point == len(elevation_points):
                next_elevation_point -= 1
            prev_elevation_point = max(next_elevation_point - 1, 0)
            if elevation_points[next_elevation_point][0] != elevation_points[prev_elevation_point][0]:
                fraction = (i - elevation_points[prev_elevation_point][0]) / (elevation_points[next_elevation_point][0] - elevation_points[prev_elevation_point][0])
                if interpolation == 'ease_in':
                    fraction = ease_in(fraction)
                elif interpolation == 'ease_out':
                    fraction = ease_out(fraction)
                elif interpolation == 'ease_in_out':
                    fraction = ease_in_out(fraction)
                interpolated_elevation = interpolate_angle(elevation_points[prev_elevation_point][1], elevation_points[next_elevation_point][1], fraction)
            else:
                interpolated_elevation = elevation_points[prev_elevation_point][1]
            cam_embeds = camera_embeddings(interpolated_elevation, interpolated_azimuth)
            cond = torch.cat([pooled, cam_embeds.repeat((pooled.shape[0], 1, 1))], dim=-1)
            positive_pooled_out.append(t)
            positive_cond_out.append(cond)
            negative_pooled_out.append(torch.zeros_like(t))
            negative_cond_out.append(torch.zeros_like(pooled))
        final_positive_cond = torch.cat(positive_cond_out, dim=0)
        final_positive_pooled = torch.cat(positive_pooled_out, dim=0)
        final_negative_cond = torch.cat(negative_cond_out, dim=0)
        final_negative_pooled = torch.cat(negative_pooled_out, dim=0)
        final_positive = [[final_positive_cond, {'concat_latent_image': final_positive_pooled}]]
        final_negative = [[final_negative_cond, {'concat_latent_image': final_negative_pooled}]]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (final_positive, final_negative, {'samples': latent})
```