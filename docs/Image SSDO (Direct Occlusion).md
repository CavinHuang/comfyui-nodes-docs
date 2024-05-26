# Documentation
- Class name: WAS_Image_Direct_Occlusion
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Direct_Occlusion节点旨在处理图像和深度图，以创建直接遮挡效果，通过模拟光线与物体的相互作用来增强图像的视觉真实感。它识别光源，并根据深度和颜色差异应用遮挡，从而生成具有更立体外观的图像。

# Input types
## Required
- images
    - 输入图像参数对于节点的操作至关重要，因为它是生成遮挡效果的主要数据源。它直接影响最终结果，通过确定将被处理以产生遮挡的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- depth_images
    - depth_images参数提供了计算遮挡效果所必需的深度信息。它对于确定光线如何根据图像不同部分的深度进行交互至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - strength参数控制遮挡效果的强度。它很重要，因为它允许用户调整应用于图像的遮挡程度，从而微调最终输出的视觉影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- radius
    - radius参数定义了在计算遮挡时每个像素的影响区域。它很重要，因为它决定了每个像素周围遮挡效果的范围，影响图像的整体纹理和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- specular_threshold
    - specular_threshold参数用于识别图像中最亮的区域，这些区域有助于光源的识别。它在确定哪些图像部分将被视为遮挡计算中的光源中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- colored_occlusion
    - colored_occlusion参数决定是否将以彩色或灰度效果应用遮挡效果。这个选择影响遮挡的视觉风格，允许进行更微妙或更显著的视觉变化。
    - Comfy dtype: COMBO[True, False]
    - Python dtype: bool

# Output types
- composited_images
    - composited_images输出参数代表了应用了直接遮挡效果的最终图像。它很重要，因为它是节点处理的主要结果，用于进一步的可视化或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ssdo_images
    - ssdo_images输出参数提供了合成前带有遮挡效果的图像。它对于单独检查遮挡效果以及用于调试目的很有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ssdo_image_masks
    - ssdo_image_masks输出参数包括与图像中的遮挡区域相对应的掩码。这些掩码可以用于进一步的图像处理或隔离遮挡效果的特定区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- light_source_image_masks
    - light_source_image_masks输出参数包含标识图像中被视为光源区域的掩码。这些掩码对于理解图像的哪些部分有助于遮挡效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_Image_Direct_Occlusion:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'depth_images': ('IMAGE',), 'strength': ('FLOAT', {'min': 0.0, 'max': 5.0, 'default': 1.0, 'step': 0.01}), 'radius': ('FLOAT', {'min': 0.01, 'max': 1024, 'default': 30, 'step': 0.01}), 'specular_threshold': ('INT', {'min': 0, 'max': 255, 'default': 128, 'step': 1}), 'colored_occlusion': (['True', 'False'],)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('composited_images', 'ssdo_images', 'ssdo_image_masks', 'light_source_image_masks')
    FUNCTION = 'direct_occlusion'
    CATEGORY = 'WAS Suite/Image/Filter'

    def direct_occlusion(self, images, depth_images, strength, radius, specular_threshold, colored_occlusion):
        composited = []
        occlusions = []
        occlusion_masks = []
        light_sources = []
        for (i, image) in enumerate(images):
            cstr(f'Processing SSDO image {i + 1}/{len(images)} ...').msg.print()
            (composited_image, occlusion_image, occlusion_mask, light_source) = self.create_direct_occlusion(tensor2pil(image), tensor2pil(depth_images[i if len(depth_images) >= i else -1]), strength=strength, radius=radius, threshold=specular_threshold, colored=True)
            composited.append(pil2tensor(composited_image))
            occlusions.append(pil2tensor(occlusion_image))
            occlusion_masks.append(pil2tensor(occlusion_mask))
            light_sources.append(pil2tensor(light_source))
        composited = torch.cat(composited, dim=0)
        occlusions = torch.cat(occlusions, dim=0)
        occlusion_masks = torch.cat(occlusion_masks, dim=0)
        light_sources = torch.cat(light_sources, dim=0)
        return (composited, occlusions, occlusion_masks, light_sources)

    def find_light_source(self, rgb_normalized, threshold):
        from skimage.measure import regionprops
        from skimage import measure
        rgb_uint8 = (rgb_normalized * 255).astype(np.uint8)
        rgb_to_grey = Image.fromarray(rgb_uint8, mode='RGB')
        dominant = self.dominant_region(rgb_to_grey, threshold)
        grayscale_image = np.array(dominant.convert('L'), dtype=np.float32) / 255.0
        regions = measure.label(grayscale_image > 0)
        if np.max(regions) > 0:
            region_sums = measure.regionprops(regions, intensity_image=grayscale_image)
            brightest_region = max(region_sums, key=lambda r: r.mean_intensity)
            (light_y, light_x) = brightest_region.centroid
            light_mask = (regions == brightest_region.label).astype(np.uint8)
            light_mask_cluster = light_mask
        else:
            (light_x, light_y) = (np.nan, np.nan)
            light_mask_cluster = np.zeros_like(dominant, dtype=np.uint8)
        return (light_mask_cluster, light_x, light_y)

    def dominant_region(self, image, threshold=128):
        from scipy.ndimage import label
        image = ImageOps.invert(image.convert('L'))
        binary_image = image.point(lambda x: 255 if x > threshold else 0, mode='1')
        (l, n) = label(np.array(binary_image))
        sizes = np.bincount(l.flatten())
        dominant = 0
        try:
            dominant = np.argmax(sizes[1:]) + 1
        except ValueError:
            pass
        dominant_region_mask = (l == dominant).astype(np.uint8) * 255
        result = Image.fromarray(dominant_region_mask, mode='L')
        return result.convert('RGB')

    def create_direct_occlusion(self, rgb_image, depth_image, strength=1.0, radius=10, threshold=200, colored=False):
        rgb_normalized = np.array(rgb_image, dtype=np.float32) / 255.0
        depth_normalized = np.array(depth_image, dtype=np.float32) / 255.0
        (height, width, _) = rgb_normalized.shape
        (light_mask, light_x, light_y) = self.find_light_source(rgb_normalized, threshold)
        occlusion_array = calculate_direct_occlusion_factor(rgb_normalized, depth_normalized, height, width, radius)
        occlusion_scaled = ((occlusion_array - np.min(occlusion_array)) / (np.max(occlusion_array) - np.min(occlusion_array)) * 255).astype(np.uint8)
        occlusion_image = Image.fromarray(occlusion_scaled, mode='L')
        occlusion_image = occlusion_image.filter(ImageFilter.GaussianBlur(radius=0.5))
        occlusion_image = occlusion_image.filter(ImageFilter.SMOOTH_MORE)
        if colored:
            occlusion_result = Image.composite(Image.new('RGB', rgb_image.size, (0, 0, 0)), rgb_image, occlusion_image)
            occlusion_result = ImageOps.autocontrast(occlusion_result, cutoff=(0, strength))
        else:
            occlusion_result = Image.blend(occlusion_image, occlusion_image, strength)
        light_image = ImageOps.invert(Image.fromarray(light_mask * 255, mode='L'))
        direct_occlusion_image = ImageChops.screen(rgb_image, occlusion_result.convert('RGB'))
        return (direct_occlusion_image, occlusion_result, occlusion_image, light_image)
```