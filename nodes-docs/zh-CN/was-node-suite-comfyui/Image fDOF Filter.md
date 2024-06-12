# Documentation
- Class name: WAS_Image_fDOF
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_fDOF节点的fdof_composite函数旨在对图像应用景深效果，通过模糊背景来增强对主体的视觉焦点。它通过结合不同的图像处理技术实现这一效果，这些技术适用于不同的模式，如模拟、高斯或盒状模糊，并通过诸如半径和样本数等参数进行定制。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将要应用景深效果的输入图像。它通过确定将要处理的视觉内容，显著影响节点执行的最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- depth
    - 深度参数提供了一个深度图，用于确定图像中应该聚焦或模糊的区域。它在节点的执行中起着关键作用，通过指导景深效果的应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- mode
    - 模式参数确定要应用于图像的模糊类型。它很重要，因为它决定了景深效果的风格，提供了模拟、高斯或盒状模糊等选项。
    - Comfy dtype: COMBO['mock', 'gaussian', 'box']
    - Python dtype: str
- radius
    - 半径参数定义了模糊效果的范围，对于控制景深的强度很重要。它直接影响输出图像中模糊区域的外观。
    - Comfy dtype: INT
    - Python dtype: int
- samples
    - 样本参数指定了模糊效果应用的次数，这可以增加模糊的平滑度。它通过确定最终合成图像中的细节水平来影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 输出图像参数代表了应用了景深效果的最终处理图像。它很重要，因为它是节点操作的直接结果，并反映了应用的过滤器的创意意图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_fDOF:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'depth': ('IMAGE',), 'mode': (['mock', 'gaussian', 'box'],), 'radius': ('INT', {'default': 8, 'min': 1, 'max': 128, 'step': 1}), 'samples': ('INT', {'default': 1, 'min': 1, 'max': 3, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'fdof_composite'
    CATEGORY = 'WAS Suite/Image/Filter'

    def fdof_composite(self, image, depth, radius, samples, mode):
        import cv2 as cv
        tensor_images = []
        for i in range(len(image)):
            if i <= len(image):
                img = tensor2pil(image[i])
            else:
                img = tensor2pil(image[-1])
            if i <= len(depth):
                dpth = tensor2pil(depth[i])
            else:
                dpth = tensor2pil(depth[-1])
            tensor_images.append(pil2tensor(self.portraitBlur(img, dpth, radius, samples, mode)))
        tensor_images = torch.cat(tensor_images, dim=0)
        return (tensor_images,)

    def portraitBlur(self, img, mask, radius, samples, mode='mock'):
        mask = mask.resize(img.size).convert('L')
        bimg: Optional[Image.Image] = None
        if mode == 'mock':
            bimg = medianFilter(img, radius, radius * 1500, 75)
        elif mode == 'gaussian':
            bimg = img.filter(ImageFilter.GaussianBlur(radius=radius))
        elif mode == 'box':
            bimg = img.filter(ImageFilter.BoxBlur(radius))
        else:
            return
        bimg.convert(img.mode)
        rimg: Optional[Image.Image] = None
        if samples > 1:
            for i in range(samples):
                if not rimg:
                    rimg = Image.composite(img, bimg, mask)
                else:
                    rimg = Image.composite(rimg, bimg, mask)
        else:
            rimg = Image.composite(img, bimg, mask).convert('RGB')
        return rimg
```