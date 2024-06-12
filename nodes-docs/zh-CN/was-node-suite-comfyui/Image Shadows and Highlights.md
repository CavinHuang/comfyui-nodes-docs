# Documentation
- Class name: WAS_Shadow_And_Highlight_Adjustment
- Category: WAS Suite/Image/Adjustment
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Shadow_And_Highlight_Adjustment节点旨在通过调整图像的阴影和高光来修改其对比度和色调范围。该节点通过增强图像中较暗和较亮区域的细节，允许更好的视觉定义和更平衡的曝光。它通过分别对阴影和高光应用不同的阈值和因子来操作，并可选择性地平滑这些区域，以获得更自然的外观。该节点特别适用于后期处理图像，其中动态范围需要针对更好的视觉吸引力或满足特定技术要求进行优化。

# Input types
## Required
- image
    - 要应用阴影和高光调整的输入图像。此参数至关重要，因为它决定了节点将处理的基本视觉内容。节点的执行和结果严重依赖于输入图像的质量和特性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- shadow_threshold
    - 像素值被视为阴影部分的阈值。调整此参数会影响图像中阴影的修改程度。这是一个重要的参数，用于控制最终输出中阴影的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shadow_factor
    - 用于增加图像阴影区域强度的乘法因子。这是一个关键参数，用于增强图像暗部的细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- shadow_smoothing
    - 要应用于阴影遮罩的平滑度。较高的值会在阴影和非阴影区域之间产生更平滑的过渡，这可能更适合更自然的外观，但可能会降低阴影中的对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highlight_threshold
    - 像素值被视为高光部分的阈值。此参数对于确定图像的哪些部分将被视为高光并随后进行调整至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highlight_factor
    - 用于减少图像高光区域强度的乘法因子。这是一个关键参数，用于控制高光的烧毁程度，并防止图像中较亮部分的细节丢失。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highlight_smoothing
    - 要应用于高光遮罩的平滑度。与阴影平滑类似，它有助于在高光和非高光区域之间实现更渐进的过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- simplify_isolation
    - 要应用于阴影和高光遮罩隔离的简化量。它可以用于减少遮罩的复杂性，这对于性能原因或实现特定视觉效果可能很有帮助。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 最终调整后的图像，具有增强的阴影和高光。它代表了节点的主要输出，展示了对输入图像进行的所有调整的累积效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- shadow_map
    - 作为调整过程的一部分生成的阴影图。它是一个灰度图像，其中较暗的值表示已被修改的阴影区域。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- highlight_map
    - 作为调整过程的一部分生成的高光图。它是一个灰度图像，其中较亮的值指示已被修改的高光区域。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Shadow_And_Highlight_Adjustment:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'shadow_threshold': ('FLOAT', {'default': 75, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'shadow_factor': ('FLOAT', {'default': 1.5, 'min': -12.0, 'max': 12.0, 'step': 0.1}), 'shadow_smoothing': ('FLOAT', {'default': 0.25, 'min': -255.0, 'max': 255.0, 'step': 0.1}), 'highlight_threshold': ('FLOAT', {'default': 175, 'min': 0.0, 'max': 255.0, 'step': 0.1}), 'highlight_factor': ('FLOAT', {'default': 0.5, 'min': -12.0, 'max': 12.0, 'step': 0.1}), 'highlight_smoothing': ('FLOAT', {'default': 0.25, 'min': -255.0, 'max': 255.0, 'step': 0.1}), 'simplify_isolation': ('FLOAT', {'default': 0, 'min': -255.0, 'max': 255.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('image', 'shadow_map', 'highlight_map')
    FUNCTION = 'apply_shadow_and_highlight'
    CATEGORY = 'WAS Suite/Image/Adjustment'

    def apply_shadow_and_highlight(self, image, shadow_threshold=30, highlight_threshold=220, shadow_factor=1.5, highlight_factor=0.5, shadow_smoothing=0, highlight_smoothing=0, simplify_isolation=0):
        WTools = WAS_Tools_Class()
        (result, shadows, highlights) = WTools.shadows_and_highlights(tensor2pil(image), shadow_threshold, highlight_threshold, shadow_factor, highlight_factor, shadow_smoothing, highlight_smoothing, simplify_isolation)
        (result, shadows, highlights) = WTools.shadows_and_highlights(tensor2pil(image), shadow_threshold, highlight_threshold, shadow_factor, highlight_factor, shadow_smoothing, highlight_smoothing, simplify_isolation)
        return (pil2tensor(result), pil2tensor(shadows), pil2tensor(highlights))
```