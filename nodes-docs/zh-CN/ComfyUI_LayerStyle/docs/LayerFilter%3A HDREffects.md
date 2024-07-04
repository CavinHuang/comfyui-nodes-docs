# Documentation
- Class name: LS_HDREffects
- Category: 😺dzNodes/LayerFilter
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

HDR效果

# Input types
## Required

- image
    - 输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- hdr_intensity
    - HDR强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-5.0

- shadow_intensity
    - 阴影强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-1.0

- highlight_intensity
    - 高光强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-1.0

- gamma_intensity
    - 伽马强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-1.0

- contrast
    - 对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-1.0

- enhance_color
    - 增强颜色。
    - Comfy dtype: FLOAT
    - Python dtype: float
    - 可选值: 0.0-1.0


# Output types

- image
    - 处理后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LS_HDREffects:
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE', {'default': None}),
                             'hdr_intensity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 5.0, 'step': 0.01}),
                             'shadow_intensity': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'highlight_intensity': ('FLOAT', {'default': 0.75, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'gamma_intensity': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'contrast': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.01}),
                             'enhance_color': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.01})
                             }}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'hdr_effects'
    CATEGORY = '😺dzNodes/LayerFilter'

    @apply_to_batch
    def hdr_effects(self, image, hdr_intensity=0.5, shadow_intensity=0.25, highlight_intensity=0.75,
                   gamma_intensity=0.25, contrast=0.1, enhance_color=0.25):
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

        merged_adjustments = merge_adjustments_with_blend_modes(lum_array, shadows_adjusted, highlights_adjusted,
                                                                hdr_intensity, shadow_intensity, highlight_intensity)

        # Apply gamma correction with a base_gamma value (define based on desired effect)
        gamma_corrected = apply_gamma_correction(np.array(merged_adjustments), hdr_intensity, gamma_intensity)

        # Merge L channel back with original A and B channels
        adjusted_lab = Image.merge('LAB', (merged_adjustments, a, b))

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