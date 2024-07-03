
# Documentation
- Class name: HDR Effects (SuperBeasts.AI)
- Category: SuperBeastsAI/Image
- Output node: False

HDR Effects节点通过应用高动态范围(HDR)效果来增强图像，通过调整对比度、色彩饱和度和亮度来提高视觉质量。它利用先进的图像处理技术模拟HDR摄影，使图像看起来更加生动逼真。

# Input types
## Required
- image
    - 需要增强HDR效果的输入图像。它作为所有后续HDR相关调整的基础，包括对比度、色彩饱和度和亮度的增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- hdr_intensity
    - 控制应用于图像的HDR效果的整体强度，影响阴影、高光和中间调的调整深度和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shadow_intensity
    - 决定图像中阴影的强度，增强暗部区域的深度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highlight_intensity
    - 调整高光的亮度，增强图像亮部区域的细节和可见度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma_intensity
    - 修改图像的伽马水平，影响中间调亮度和整体视觉对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 调整图像的对比度水平，使暗部更暗，亮部更亮，以增强整体动态范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- enhance_color
    - 增加图像的色彩饱和度，使颜色更加鲜艳，提升整体视觉吸引力。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result_img
    - 应用HDR效果后的增强图像，包括改善的对比度、色彩饱和度和亮度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HDREffects:
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE', {'default': None}),
                             'hdr_intensity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 5.0, 'step': 0.01}),
                             'shadow_intensity': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'highlight_intensity': ('FLOAT', {'default': 0.75, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'gamma_intensity': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'contrast': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'enhance_color': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01})
                             }}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'apply_hdr2'
    CATEGORY = 'SuperBeastsAI/Image'
    
    @apply_to_batch
    def apply_hdr2(self, image, hdr_intensity=0.5, shadow_intensity=0.25, highlight_intensity=0.75, gamma_intensity=0.25, contrast=0.1, enhance_color=0.25):
        # Load the image
        img = tensor2pil(image)
        
        # Step 1: Convert RGB to LAB for better color preservation
        img_lab = ImageCms.profileToProfile(img, sRGB_profile, Lab_profile, outputMode='LAB')

        # Extract L, A, and B channels
        luminance, a, b = img_lab.split()
        
        # Convert luminance to a NumPy array for processing
        lum_array = np.array(luminance, dtype=np.float32)

        # Preparing adjustment layers (shadows, midtones, highlights)
        # This example assumes you have methods to extract or calculate these adjustments
        shadows_adjusted = adjust_shadows_non_linear(luminance, shadow_intensity)
        highlights_adjusted = adjust_highlights_non_linear(luminance, highlight_intensity)


        merged_adjustments = merge_adjustments_with_blend_modes(lum_array, shadows_adjusted, highlights_adjusted, hdr_intensity, shadow_intensity, highlight_intensity)

        # Apply gamma correction with a base_gamma value (define based on desired effect)
        gamma_corrected = apply_gamma_correction(np.array(merged_adjustments), gamma_intensity)
        gamma_corrected = Image.fromarray(gamma_corrected).resize(a.size)


        # Merge L channel back with original A and B channels
        adjusted_lab = Image.merge('LAB', (gamma_corrected, a, b))

        # Step 3: Convert LAB back to RGB
        img_adjusted = ImageCms.profileToProfile(adjusted_lab, Lab_profile, sRGB_profile, outputMode='RGB')
        
        
        # Enhance contrast
        enhancer = ImageEnhance.Contrast(img_adjusted)
        contrast_adjusted = enhancer.enhance(1 + contrast)

        
        # Enhance color saturation
        enhancer = ImageEnhance.Color(contrast_adjusted)
        color_adjusted = enhancer.enhance(1 + enhance_color * 0.2)
         
        return pil2tensor(color_adjusted)

```
