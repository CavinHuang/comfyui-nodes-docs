# Documentation
- Class name: sv3DLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

sv3DLoader节点作为高效加载和处理3D模型及其相关数据的接口。它简化了初始化和管理模型状态、准备图像和潜在向量以供流水线中进一步处理的过程。

# Input types
## Required
- ckpt_name
    - 检查点名称对于识别要加载的特定模型状态至关重要。它影响模型的初始化和输出质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- vae_name
    - VAE名称参数对于选择适当的变分自编码器至关重要。它影响编码和解码过程，从而影响最终输出的保真度。
    - Comfy dtype: COMBO
    - Python dtype: str
- init_image
    - 初始化图像对于设置3D模型生成的上下文和内容方向至关重要。它直接影响视觉元素和结果模型的主题连贯性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- empty_latent_width
    - 此参数定义了用于模型生成的潜在空间的宽度。它很重要，因为它影响模型捕捉细节和输出多样性的能力。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 与empty_latent_width类似，此参数设置了潜在空间的高度，影响模型生成高分辨率输出的能力。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批量大小参数对于管理计算资源和确定同时处理的模型数量很重要。它影响流水线的整体效率和速度。
    - Comfy dtype: INT
    - Python dtype: int
- interp_easing
    - 插值缓和方法决定了模型如何过渡到不同状态。它影响输出序列的平滑度和连续性。
    - Comfy dtype: COMBO
    - Python dtype: str
- easing_mode
    - 该参数决定了要应用的缓和类型，无论是方位角、仰角还是自定义，它影响了模型在在空间中运动的轨迹。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- scheduler
    - 提供调度程序参数时，允许对缓和点进行详细控制，从而精确操纵模型在潜在空间中的进展。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pipe
    - 管道输出是一个包含加载的模型、编码的图像和其他相关数据的综合结构。它对于将必要的信息沿流水线传递到后续处理步骤至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - 模型输出提供了初始化并准备使用的3D模型。它是进一步操作和生成新内容的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- interp_log
    - 插值日志记录了模型处理过程中使用的方位角和仰角值。它作为理解模型在潜在空间中进展的参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class sv3DLoader(EasingBase):

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):

        def get_file_list(filenames):
            return [file for file in filenames if file != 'put_models_here.txt' and 'sv3d' in file]
        return {'required': {'ckpt_name': (get_file_list(folder_paths.get_filename_list('checkpoints')),), 'vae_name': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'init_image': ('IMAGE',), 'empty_latent_width': ('INT', {'default': 576, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 576, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 21, 'min': 1, 'max': 4096}), 'interp_easing': (['linear', 'ease_in', 'ease_out', 'ease_in_out'], {'default': 'linear'}), 'easing_mode': (['azimuth', 'elevation', 'custom'], {'default': 'azimuth'})}, 'optional': {'scheduler': ('STRING', {'default': '', 'multiline': True})}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'STRING')
    RETURN_NAMES = ('pipe', 'model', 'interp_log')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def adv_pipeloader(self, ckpt_name, vae_name, init_image, empty_latent_width, empty_latent_height, batch_size, interp_easing, easing_mode, scheduler='', prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None
        easyCache.update_loaded_objects(prompt)
        (model, clip, vae, clip_vision) = easyCache.load_checkpoint(ckpt_name, 'Default', True)
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, 'bilinear', 'center').movedim(1, -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)
        azimuth_points = []
        elevation_points = []
        if easing_mode == 'azimuth':
            azimuth_points = [(0, 0), (batch_size - 1, 360)]
            elevation_points = [(0, 0)] * batch_size
        elif easing_mode == 'elevation':
            azimuth_points = [(0, 0)] * batch_size
            elevation_points = [(0, -90), (batch_size - 1, 90)]
        else:
            schedulers = scheduler.rstrip('\n')
            for line in schedulers.split('\n'):
                (frame_str, point_str) = line.split(':')
                point_str = point_str.strip()[1:-1]
                point = point_str.split(',')
                azimuth_point = point[0]
                elevation_point = point[1] if point[1] else 0.0
                frame = int(frame_str.strip())
                azimuth = float(azimuth_point)
                azimuth_points.append((frame, azimuth))
                elevation_val = float(elevation_point)
                elevation_points.append((frame, elevation_val))
            azimuth_points.sort(key=lambda x: x[0])
            elevation_points.sort(key=lambda x: x[0])
        next_point = 1
        next_elevation_point = 1
        elevations = []
        azimuths = []
        for i in range(batch_size):
            while next_point < len(azimuth_points) and i >= azimuth_points[next_point][0]:
                next_point += 1
            if next_point == len(azimuth_points):
                next_point -= 1
            prev_point = max(next_point - 1, 0)
            if azimuth_points[next_point][0] != azimuth_points[prev_point][0]:
                timing = (i - azimuth_points[prev_point][0]) / (azimuth_points[next_point][0] - azimuth_points[prev_point][0])
                interpolated_azimuth = self.ease(azimuth_points[prev_point][1], azimuth_points[next_point][1], self.easing(timing, interp_easing))
            else:
                interpolated_azimuth = azimuth_points[prev_point][1]
            next_elevation_point = 1
            while next_elevation_point < len(elevation_points) and i >= elevation_points[next_elevation_point][0]:
                next_elevation_point += 1
            if next_elevation_point == len(elevation_points):
                next_elevation_point -= 1
            prev_elevation_point = max(next_elevation_point - 1, 0)
            if elevation_points[next_elevation_point][0] != elevation_points[prev_elevation_point][0]:
                timing = (i - elevation_points[prev_elevation_point][0]) / (elevation_points[next_elevation_point][0] - elevation_points[prev_elevation_point][0])
                interpolated_elevation = self.ease(elevation_points[prev_point][1], elevation_points[next_point][1], self.easing(timing, interp_easing))
            else:
                interpolated_elevation = elevation_points[prev_elevation_point][1]
            azimuths.append(interpolated_azimuth)
            elevations.append(interpolated_elevation)
        log_node_info('easy sv3dLoader', 'azimuths:' + str(azimuths))
        log_node_info('easy sv3dLoader', 'elevations:' + str(elevations))
        log = 'azimuths:' + str(azimuths) + '\n\n' + 'elevations:' + str(elevations)
        positive = [[pooled, {'concat_latent_image': t, 'elevation': elevations, 'azimuth': azimuths}]]
        negative = [[torch.zeros_like(pooled), {'concat_latent_image': torch.zeros_like(t), 'elevation': elevations, 'azimuth': azimuths}]]
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8])
        samples = {'samples': latent}
        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))
        pipe = {'model': model, 'positive': positive, 'negative': negative, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': 0, 'loader_settings': {'ckpt_name': ckpt_name, 'vae_name': vae_name, 'positive': positive, 'positive_l': None, 'positive_g': None, 'positive_balance': None, 'negative': negative, 'negative_l': None, 'negative_g': None, 'negative_balance': None, 'empty_latent_width': empty_latent_width, 'empty_latent_height': empty_latent_height, 'batch_size': batch_size, 'seed': 0, 'empty_samples': samples}}
        return (pipe, model, log)
```