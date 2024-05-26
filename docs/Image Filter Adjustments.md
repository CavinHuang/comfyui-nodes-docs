# Documentation
- Class name: WAS_Image_Filters
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Filters节点旨在对输入图像应用一系列全面的图像处理滤镜，以增强或修改图像的视觉特征。它提供的功能包括调整亮度、对比度和饱和度，以及应用锐化、模糊、边缘增强和细节增强效果。该节点的目的是提供一个多功能的图像处理工具，可以用于从简单调整到更复杂的视觉转换的各种应用。

# Input types
## Required
- image
    - 'image'参数是节点的主要输入，代表将经历过滤的图像数据。它至关重要，因为它决定了所有后续增强和修改将应用的基础内容。输入图像的质量和格式直接影响节点的执行和最终输出的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- brightness
    - '亮度'参数允许用户调整图像的整体亮度。它很重要，因为它可以在光线不足的条件下增强可见性或创造风格化效果。这个参数的值直接影响节点的输出，数值越高，亮度增加；数值越低，亮度减少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - '对比度'参数用于修改图像各部分之间的颜色或色调差异。它在使图像看起来更生动或减少颜色强度以达到更柔和的外观方面起着重要作用。这种调整可以显著改变最终图像的视觉冲击力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 'saturation'参数控制图像中颜色的强度。它对于创建更丰富多彩和丰富的图像或制作更去饱和、复古的视觉效果至关重要。饱和度的水平可以极大地影响对图像的情感反应和其整体的美学吸引力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sharpness
    - '锐度'参数负责增强图像内的边缘，使它们更加清晰。它对于提高图像的清晰度很重要，特别是当图像看起来模糊或焦点不清晰时尤其有用。增加锐度可以使细节更加突出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur
    - '模糊'参数对图像应用模糊效果，可以用来创造深度感或有意地软化图像。在需要不太锐利的外观的场景中，它很重要，例如出于美学目的或减少图像噪声。
    - Comfy dtype: INT
    - Python dtype: int
- gaussian_blur
    - '高斯模糊'参数对图像应用高斯模糊，这是一种减少细节和噪声的平滑技术。它特别适用于创建平滑、模糊的外观，并通过模糊效果的半径来控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- edge_enhance
    - '边缘增强'参数用于强调图像内的边缘，使它们更加引人注目。它在突出细节方面起着重要作用，并且可以创造性地用于改变图像的视觉风格。
    - Comfy dtype: FLOAT
    - Python dtype: float
- detail_enhance
    - '细节增强'参数，当设置为true时，对图像应用细节增强滤镜。这可以使微妙的细节更加可见，特别适用于需要更高清晰度和定义的图像。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: Union[str, Literal['false', 'true']]

# Output types
- output_image
    - 'output_image'参数代表应用了所有指定滤镜后的处理图像。它是节点功能的最高表现，包含了图像处理过程的结果。此输出很重要，因为它是节点的主要交付物，反映了所有调整的集体影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Filters:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'brightness': ('FLOAT', {'default': 0.0, 'min': -1.0, 'max': 1.0, 'step': 0.01}), 'contrast': ('FLOAT', {'default': 1.0, 'min': -1.0, 'max': 2.0, 'step': 0.01}), 'saturation': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 5.0, 'step': 0.01}), 'sharpness': ('FLOAT', {'default': 1.0, 'min': -5.0, 'max': 5.0, 'step': 0.01}), 'blur': ('INT', {'default': 0, 'min': 0, 'max': 16, 'step': 1}), 'gaussian_blur': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1024.0, 'step': 0.1}), 'edge_enhance': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'detail_enhance': (['false', 'true'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_filters'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_filters(self, image, brightness, contrast, saturation, sharpness, blur, gaussian_blur, edge_enhance, detail_enhance):
        tensors = []
        if len(image) > 1:
            for img in image:
                pil_image = None
                if brightness > 0.0 or brightness < 0.0:
                    img = np.clip(img + brightness, 0.0, 1.0)
                if contrast > 1.0 or contrast < 1.0:
                    img = np.clip(img * contrast, 0.0, 1.0)
                if saturation > 1.0 or saturation < 1.0:
                    pil_image = tensor2pil(img)
                    pil_image = ImageEnhance.Color(pil_image).enhance(saturation)
                if sharpness > 1.0 or sharpness < 1.0:
                    pil_image = pil_image if pil_image else tensor2pil(img)
                    pil_image = ImageEnhance.Sharpness(pil_image).enhance(sharpness)
                if blur > 0:
                    pil_image = pil_image if pil_image else tensor2pil(img)
                    for _ in range(blur):
                        pil_image = pil_image.filter(ImageFilter.BLUR)
                if gaussian_blur > 0.0:
                    pil_image = pil_image if pil_image else tensor2pil(img)
                    pil_image = pil_image.filter(ImageFilter.GaussianBlur(radius=gaussian_blur))
                if edge_enhance > 0.0:
                    pil_image = pil_image if pil_image else tensor2pil(img)
                    edge_enhanced_img = pil_image.filter(ImageFilter.EDGE_ENHANCE_MORE)
                    blend_mask = Image.new(mode='L', size=pil_image.size, color=round(edge_enhance * 255))
                    pil_image = Image.composite(edge_enhanced_img, pil_image, blend_mask)
                    del blend_mask, edge_enhanced_img
                if detail_enhance == 'true':
                    pil_image = pil_image if pil_image else tensor2pil(img)
                    pil_image = pil_image.filter(ImageFilter.DETAIL)
                out_image = pil2tensor(pil_image) if pil_image else img
                tensors.append(out_image)
            tensors = torch.cat(tensors, dim=0)
        else:
            pil_image = None
            img = image
            if brightness > 0.0 or brightness < 0.0:
                img = np.clip(img + brightness, 0.0, 1.0)
            if contrast > 1.0 or contrast < 1.0:
                img = np.clip(img * contrast, 0.0, 1.0)
            if saturation > 1.0 or saturation < 1.0:
                pil_image = tensor2pil(img)
                pil_image = ImageEnhance.Color(pil_image).enhance(saturation)
            if sharpness > 1.0 or sharpness < 1.0:
                pil_image = pil_image if pil_image else tensor2pil(img)
                pil_image = ImageEnhance.Sharpness(pil_image).enhance(sharpness)
            if blur > 0:
                pil_image = pil_image if pil_image else tensor2pil(img)
                for _ in range(blur):
                    pil_image = pil_image.filter(ImageFilter.BLUR)
            if gaussian_blur > 0.0:
                pil_image = pil_image if pil_image else tensor2pil(img)
                pil_image = pil_image.filter(ImageFilter.GaussianBlur(radius=gaussian_blur))
            if edge_enhance > 0.0:
                pil_image = pil_image if pil_image else tensor2pil(img)
                edge_enhanced_img = pil_image.filter(ImageFilter.EDGE_ENHANCE_MORE)
                blend_mask = Image.new(mode='L', size=pil_image.size, color=round(edge_enhance * 255))
                pil_image = Image.composite(edge_enhanced_img, pil_image, blend_mask)
                del blend_mask, edge_enhanced_img
            if detail_enhance == 'true':
                pil_image = pil_image if pil_image else tensor2pil(img)
                pil_image = pil_image.filter(ImageFilter.DETAIL)
            out_image = pil2tensor(pil_image) if pil_image else img
            tensors = out_image
        return (tensors,)
```