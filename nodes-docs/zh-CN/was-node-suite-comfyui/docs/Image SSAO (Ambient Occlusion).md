# Documentation
- Class name: WAS_Image_Ambient_Occlusion
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Ambient_Occlusion 节点旨在通过应用环境光遮蔽效果来增强图像的视觉深度和真实感。它根据输入图像的深度和颜色信息智能计算遮蔽，创造出更自然、更沉浸的视觉效果。

# Input types
## Required
- images
    - 输入图像参数对于节点的操作至关重要，因为它提供了将应用环境光遮蔽效果的原始视觉数据。这些图像的质量和分辨率直接影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- depth_images
    - 深度图像对于准确确定场景内的遮蔽级别至关重要。它们提供深度信息，补充输入图像，增强环境光遮蔽效果的真实性。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- strength
    - 强度参数允许用户控制环境光遮蔽效果的强度。调整此参数可以微调遮蔽的视觉影响，根据创意需求使其更加或不那么明显。
    - Comfy dtype: FLOAT
    - Python dtype: float
- radius
    - 半径参数定义了在每个像素周围进行遮蔽计算的区域。较大的半径会导致更渐进和广泛的遮蔽效果，而较小的半径则创造出更紧密、更局部的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ao_blur
    - ao_blur 参数负责应用于遮蔽图像的模糊程度。它可以平滑遮蔽效果，创造出更微妙和自然的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- specular_threshold
    - specular_threshold 参数用于确定镜面高光的截止值，这会影响遮蔽与图像中明亮区域的交互方式。
    - Comfy dtype: INT
    - Python dtype: int
- enable_specular_masking
    - 通过 enable_specular_masking 参数启用镜面遮罩允许选择性地应用遮蔽效果，绕过高镜面反射区域。
    - Comfy dtype: COMBO[True, False]
    - Python dtype: bool
- tile_size
    - tile_size 参数通过将图像划分为多个小块来优化环境光遮蔽的处理。这可以通过允许并行处理，特别是对于大型图像，从而提高性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- composited_images
    - composited_images 输出参数表示应用了环境光遮蔽效果的最终渲染图像。它是输入图像和计算出的遮蔽的组合，从而呈现出更加立体的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ssao_images
    - ssao_images 输出参数提供了在过程中计算出的独立环境光遮蔽图像。这些可以用于进一步分析或额外的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- specular_mask_images
    - specular_mask_images 输出参数包含生成的用于应用镜面遮罩的遮罩。这些遮罩决定了哪些图像区域将根据镜面反射值应用遮蔽效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Ambient_Occlusion:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'depth_images': ('IMAGE',), 'strength': ('FLOAT', {'min': 0.0, 'max': 5.0, 'default': 1.0, 'step': 0.01}), 'radius': ('FLOAT', {'min': 0.01, 'max': 1024, 'default': 30, 'step': 0.01}), 'ao_blur': ('FLOAT', {'min': 0.01, 'max': 1024, 'default': 2.5, 'step': 0.01}), 'specular_threshold': ('INT', {'min': 0, 'max': 255, 'default': 25, 'step': 1}), 'enable_specular_masking': (['True', 'False'],), 'tile_size': ('INT', {'min': 1, 'max': 512, 'default': 1, 'step': 1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('composited_images', 'ssao_images', 'specular_mask_images')
    FUNCTION = 'ambient_occlusion'
    CATEGORY = 'WAS Suite/Image/Filter'

    def ambient_occlusion(self, images, depth_images, strength, radius, ao_blur, specular_threshold, enable_specular_masking, tile_size):
        enable_specular_masking = enable_specular_masking == 'True'
        composited = []
        occlusions = []
        speculars = []
        for (i, image) in enumerate(images):
            cstr(f'Processing SSAO image {i + 1}/{len(images)} ...').msg.print()
            (composited_image, occlusion_image, specular_mask) = self.create_ambient_occlusion(tensor2pil(image), tensor2pil(depth_images[i if len(depth_images) >= i else -1]), strength=strength, radius=radius, ao_blur=ao_blur, spec_threshold=specular_threshold, enable_specular_masking=enable_specular_masking, tile_size=tile_size)
            composited.append(pil2tensor(composited_image))
            occlusions.append(pil2tensor(occlusion_image))
            speculars.append(pil2tensor(specular_mask))
        composited = torch.cat(composited, dim=0)
        occlusions = torch.cat(occlusions, dim=0)
        speculars = torch.cat(speculars, dim=0)
        return (composited, occlusions, speculars)

    def process_tile(self, tile_rgb, tile_depth, tile_x, tile_y, radius):
        tile_occlusion = calculate_ambient_occlusion_factor(tile_rgb, tile_depth, tile_rgb.shape[0], tile_rgb.shape[1], radius)
        return (tile_x, tile_y, tile_occlusion)

    def create_ambient_occlusion(self, rgb_image, depth_image, strength=1.0, radius=30, ao_blur=5, spec_threshold=200, enable_specular_masking=False, tile_size=1):
        import concurrent.futures
        if depth_image.size != rgb_image.size:
            depth_image = depth_image.resize(rgb_image.size)
        rgb_normalized = np.array(rgb_image, dtype=np.float32) / 255.0
        depth_normalized = np.array(depth_image, dtype=np.float32) / 255.0
        (height, width, _) = rgb_normalized.shape
        if tile_size <= 1:
            print('Processing single-threaded AO (highest quality) ...')
            occlusion_array = calculate_ambient_occlusion_factor(rgb_normalized, depth_normalized, height, width, radius)
        else:
            tile_size = (tile_size if tile_size <= 8 else 8) if tile_size > 1 else 1
            num_tiles_x = (width - 1) // tile_size + 1
            num_tiles_y = (height - 1) // tile_size + 1
            occlusion_array = np.zeros((height, width), dtype=np.uint8)
            with concurrent.futures.ThreadPoolExecutor() as executor:
                futures = []
                with tqdm(total=num_tiles_y * num_tiles_x) as pbar:
                    for tile_y in range(num_tiles_y):
                        for tile_x in range(num_tiles_x):
                            tile_left = tile_x * tile_size
                            tile_upper = tile_y * tile_size
                            tile_right = min(tile_left + tile_size, width)
                            tile_lower = min(tile_upper + tile_size, height)
                            tile_rgb = rgb_normalized[tile_upper:tile_lower, tile_left:tile_right]
                            tile_depth = depth_normalized[tile_upper:tile_lower, tile_left:tile_right]
                            future = executor.submit(self.process_tile, tile_rgb, tile_depth, tile_x, tile_y, radius)
                            futures.append(future)
                    for future in concurrent.futures.as_completed(futures):
                        (tile_x, tile_y, tile_occlusion) = future.result()
                        tile_left = tile_x * tile_size
                        tile_upper = tile_y * tile_size
                        tile_right = min(tile_left + tile_size, width)
                        tile_lower = min(tile_upper + tile_size, height)
                        occlusion_array[tile_upper:tile_lower, tile_left:tile_right] = tile_occlusion
                        pbar.update(1)
        occlusion_array = (occlusion_array * strength).clip(0, 255).astype(np.uint8)
        occlusion_image = Image.fromarray(occlusion_array, mode='L')
        occlusion_image = occlusion_image.filter(ImageFilter.GaussianBlur(radius=ao_blur))
        occlusion_image = occlusion_image.filter(ImageFilter.SMOOTH)
        occlusion_image = ImageChops.multiply(occlusion_image, ImageChops.multiply(occlusion_image, occlusion_image))
        mask = rgb_image.convert('L')
        mask = mask.point(lambda x: x > spec_threshold, mode='1')
        mask = mask.convert('RGB')
        mask = mask.filter(ImageFilter.GaussianBlur(radius=2.5)).convert('L')
        if enable_specular_masking:
            occlusion_image = Image.composite(Image.new('L', rgb_image.size, 255), occlusion_image, mask)
        occlsuion_result = ImageChops.multiply(rgb_image, occlusion_image.convert('RGB'))
        return (occlsuion_result, occlusion_image, mask)
```