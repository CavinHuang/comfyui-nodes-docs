# Documentation
- Class name: CinematicLook
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

CinematicLook节点旨在通过应用各种风格化调整来提升图像的视觉吸引力，模仿常见于电影和专业摄影作品中的高质量外观。该节点利用颜色分级和其他视觉效果将普通图像转变为具有电影质感的图像，适用于从专业作品集到社交媒体帖子的广泛用途。

# Input types
## Required
- image
    - 图像参数是节点处理的源素材。它至关重要，因为它作为所有后续转换和增强的基础。输入图像的质量和特性直接影响最终输出，影响整体的审美和视觉冲击力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- look
    - 外观参数决定了图像转换的风格方向。它在确定处理后图像的最终视觉色调和情绪上至关重要。不同的外观满足不同的创意愿景和应用，允许得到与期望的审美相一致的定制结果。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- result_img
    - result_img输出是应用了电影外观的转换后的图像。它代表了节点处理的成果，包含了对输入图像所做的风格增强和调整。这是创意工作流中准备使用或进一步处理的最终产品。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class CinematicLook:

    @classmethod
    def INPUT_TYPES(s):
        s.haldclut_files = read_cluts()
        s.file_names = [os.path.basename(f) for f in s.haldclut_files]
        return {'required': {'image': ('IMAGE', {'default': None}), 'look': (['modern', 'retro', 'clipped', 'broadcast', 'black and white', 'black and white - warm'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'cinematic_look'
    CATEGORY = 'Mikey/Image'

    def apply_haldclut(self, image, hald_clut, gamma_correction):
        hald_img = Image.open(self.haldclut_files[self.file_names.index(hald_clut)])
        img = tensor2pil(image)
        if gamma_correction == 'True':
            corrected_img = gamma_correction_pil(img, 1.0 / 2.2)
        else:
            corrected_img = img
        filtered_image = apply_hald_clut(hald_img, corrected_img).convert('RGB')
        return filtered_image

    @apply_to_batch
    def cinematic_look(self, image, look):
        if look == 'modern':
            image = self.apply_haldclut(image, 'modern.png', 'False')
        elif look == 'retro':
            image = self.apply_haldclut(image, 'retro.png', 'False')
        elif look == 'clipped':
            image = self.apply_haldclut(image, 'clipped.png', 'False')
        elif look == 'broadcast':
            image = self.apply_haldclut(image, 'broadcast.png', 'False')
        elif look == 'black and white':
            image = self.apply_haldclut(image, 'bw.png', 'False')
        elif look == 'black and white - warm':
            image = self.apply_haldclut(image, 'bw_warm.png', 'False')
        p = os.path.dirname(os.path.realpath(__file__))
        if look in ['black and white']:
            noise_img = os.path.join(p, 'noise_bw.png')
        else:
            noise_img = os.path.join(p, 'noise.png')
        noise = Image.open(noise_img)
        IO = ImageOverlay()
        image = pil2tensor(image)
        noise = pil2tensor(noise)
        if look == 'modern':
            image = IO.overlay(image, noise, 0.3)[0]
        if look == 'retro':
            image = IO.overlay(image, noise, 0.4)[0]
        if look == 'clipped':
            image = IO.overlay(image, noise, 0.25)[0]
        if look == 'broadcast':
            image = IO.overlay(image, noise, 0.3)[0]
        if look == 'black and white':
            image = IO.overlay(image, noise, 0.25)[0]
        if look == 'black and white - warm':
            image = IO.overlay(image, noise, 0.25)[0]
        return image
```