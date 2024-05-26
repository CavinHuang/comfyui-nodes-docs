# Documentation
- Class name: StableSRColorFix
- Category: image
- Output node: False
- Repo Ref: https://github.com/Arthurzhangsheng/Comfyui-StableSR.git

StableSRColorFix 节点旨在通过应用先进的颜色校正技术来增强图像的颜色质量。它利用深度学习模型的能力，智能地调整输入图像的颜色调色板以匹配参考颜色映射图像，从而产生视觉上连贯且美观的输出。

# Input types
## Required
- image
    - 输入图像是 StableSRColorFix 节点的关键参数，因为它是将经历颜色校正的主要数据。节点处理此图像以使其颜色分布与 color_map_image 保持一致，确保最终输出在视觉上是一致的。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- color_map_image
    - color_map_image 作为节点执行颜色调整的参考。它对于指导颜色校正过程，以在输出图像中实现和谐的颜色调色板至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- color_fix
    - color_fix 参数决定了节点将使用的颜色校正算法类型。它可以是 'Wavelet' 或 'AdaIN'，种方法都提供了不同的颜色调整方法，这显著影响了校正后图像的最终外观。
    - Comfy dtype: COMBO['Wavelet', 'AdaIN']
    - Python dtype: str

# Output types
- refined_image
    - refined_image 是颜色校正过程的输出，代表了具有改进颜色保真度的输入图像的增强版本。它是节点功能的顶点，展示了所选 color_fix 算法的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class StableSRColorFix:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'color_map_image': ('IMAGE',), 'color_fix': (['Wavelet', 'AdaIN'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'fix_color'
    CATEGORY = 'image'

    def fix_color(self, image, color_map_image, color_fix):
        print(f'[StableSR] fix_color')
        try:
            color_fix_func = wavelet_color_fix if color_fix == 'Wavelet' else adain_color_fix
            result_image = color_fix_func(tensor2pil(image), tensor2pil(color_map_image))
            refined_image = pil2tensor(result_image)
            return (refined_image,)
        except Exception as e:
            print(f'[StableSR] Error fix_color: {e}')
```