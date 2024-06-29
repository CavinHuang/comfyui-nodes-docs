# Documentation
- Class name: CrossFadeImages
- Category: KJNodes/image
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CrossFadeImages节点旨在使用交叉淡化技术无缝地混合两组图像。它应用了一种过渡效果，平滑地在起始图像和结束图像之间进行插值，创建出视觉上吸引人的变形序列。当需要从一张图像逐渐变化到另一张图像时，此节点特别有用，适用于创建动画过渡或视觉效果。

# Input types
## Required
- images_1
    - 过渡期间将逐渐淡出的第一组图像。这些图像构成了交叉淡化效果的起点，对于初始视觉表现至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- images_2
    - 过渡期间将逐渐显现的第二组图像。这些图像代表了交叉淡化的结束状态，对最终视觉效果至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- interpolation
    - 用于交叉淡化效果的插值类型。此参数决定了图像之间变化的速率，可以显著影响过渡的视觉动态。
    - Comfy dtype: COMBO['linear', 'ease_in', 'ease_out', 'ease_in_out', 'bounce', 'elastic', 'glitchy', 'exponential_ease_out']
    - Python dtype: str
- transition_start_index
    - 交叉淡化过渡开始的索引。此参数允许控制图像序列中淡入过程的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- transitioning_frames
    - 交叉淡化过渡发生的帧数。此参数定义了动画序列中过渡效果的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- start_level
    - 交叉淡化的起始alpha级别，它决定了images_2相对于images_1的初始不透明度。值为0.0意味着images_1将完全不透明，而images_2将完全透明。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_level
    - 交叉淡化的结束alpha级别，它决定了images_2相对于images_1的最终不透明度。值为1.0意味着images_2将完全不透明，而images_1将完全透明。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- crossfade_images
    - 节点的输出是代表交叉淡化过渡的图像序列。序列中的每张图像都是输入图像的混合，混合程度由指定的alpha级别和缓动函数确定。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CrossFadeImages:
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'crossfadeimages'
    CATEGORY = 'KJNodes/image'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images_1': ('IMAGE',), 'images_2': ('IMAGE',), 'interpolation': (['linear', 'ease_in', 'ease_out', 'ease_in_out', 'bounce', 'elastic', 'glitchy', 'exponential_ease_out'],), 'transition_start_index': ('INT', {'default': 1, 'min': 0, 'max': 4096, 'step': 1}), 'transitioning_frames': ('INT', {'default': 1, 'min': 0, 'max': 4096, 'step': 1}), 'start_level': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'end_level': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}

    def crossfadeimages(self, images_1, images_2, transition_start_index, transitioning_frames, interpolation, start_level, end_level):

        def crossfade(images_1, images_2, alpha):
            crossfade = (1 - alpha) * images_1 + alpha * images_2
            return crossfade

        def ease_in(t):
            return t * t

        def ease_out(t):
            return 1 - (1 - t) * (1 - t)

        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t

        def bounce(t):
            if t < 0.5:
                return self.ease_out(t * 2) * 0.5
            else:
                return self.ease_in((t - 0.5) * 2) * 0.5 + 0.5

        def elastic(t):
            return math.sin(13 * math.pi / 2 * t) * math.pow(2, 10 * (t - 1))

        def glitchy(t):
            return t + 0.1 * math.sin(40 * t)

        def exponential_ease_out(t):
            return 1 - (1 - t) ** 4
        easing_functions = {'linear': lambda t: t, 'ease_in': ease_in, 'ease_out': ease_out, 'ease_in_out': ease_in_out, 'bounce': bounce, 'elastic': elastic, 'glitchy': glitchy, 'exponential_ease_out': exponential_ease_out}
        crossfade_images = []
        alphas = torch.linspace(start_level, end_level, transitioning_frames)
        for i in range(transitioning_frames):
            alpha = alphas[i]
            image1 = images_1[i + transition_start_index]
            image2 = images_2[i + transition_start_index]
            easing_function = easing_functions.get(interpolation)
            alpha = easing_function(alpha)
            crossfade_image = crossfade(image1, image2, alpha)
            crossfade_images.append(crossfade_image)
        crossfade_images = torch.stack(crossfade_images, dim=0)
        last_frame = crossfade_images[-1]
        remaining_frames = len(images_2) - (transition_start_index + transitioning_frames)
        for i in range(remaining_frames):
            alpha = alphas[-1]
            image1 = images_1[i + transition_start_index + transitioning_frames]
            image2 = images_2[i + transition_start_index + transitioning_frames]
            easing_function = easing_functions.get(interpolation)
            alpha = easing_function(alpha)
            crossfade_image = crossfade(image1, image2, alpha)
            crossfade_images = torch.cat([crossfade_images, crossfade_image.unsqueeze(0)], dim=0)
        beginning_images_1 = images_1[:transition_start_index]
        crossfade_images = torch.cat([beginning_images_1, crossfade_images], dim=0)
        return (crossfade_images,)
```