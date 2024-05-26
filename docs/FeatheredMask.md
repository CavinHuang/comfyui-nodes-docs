# Documentation
- Class name: FeatheredMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

FeatheredMask 节点旨在通过应用羽化效果来处理和增强遮罩图像，使遮罩边缘与周围图像内容更自然、无缝地融合。该节点接受输入遮罩并对其进行细化，以创建更自然和无缝的混合效果。

# Input types
## Required
- mask
    - ‘mask’参数是节点的主要输入，代表将被处理的图像遮罩。它在确定节点的最终输出中起着关键作用，因为羽化效果直接应用于此遮罩。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- start_offset
    - ‘start_offset’参数控制从遮罩边缘开始羽化效果的初始距离。它很重要，因为它决定了平滑过渡的起始点，从而影响羽化遮罩的整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- feathering_weight
    - ‘feathering_weight’参数调整羽化效果的强度。它很重要，因为它允许微调遮罩边缘的柔和度和混合度，确保结果在视觉上令人愉悦。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- masks
    - ‘masks’输出包含已应用羽化效果的遮罩图像。它很重要，因为它代表了节点操作的最终产品，可供进一步使用或展示。
    - Comfy dtype: LIST[IMAGE]
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class FeatheredMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'start_offset': ('INT', {'default': 1, 'min': -150, 'max': 150, 'step': 1, 'display': 'slider'}), 'feathering_weight': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1, 'step': 0.1, 'display': 'slider'})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'
    OUTPUT_IS_LIST = (True,)

    def run(self, mask, start_offset, feathering_weight):
        (num, _, _) = mask.size()
        masks = []
        for i in range(num):
            mm = mask[i]
            image = tensor2pil(mm)
            image = image.convert('L')
            if start_offset > 0:
                image = ImageOps.invert(image)
            image_np = np.array(image)
            edges = cv2.Canny(image_np, 30, 150)
            for i in range(0, abs(start_offset)):
                a = int(abs(start_offset) * 0.1 * i)
                kernel = np.ones((a, a), np.uint8)
                dilated_edges = cv2.dilate(edges, kernel, iterations=1)
                smoothed_edges = cv2.GaussianBlur(dilated_edges, (5, 5), 0)
                feathering_weight = max(0, min(feathering_weight, 1))
                image_np = cv2.addWeighted(image_np, 1, smoothed_edges, feathering_weight, feathering_weight)
            result_image = Image.fromarray(np.uint8(image_np))
            result_image = result_image.convert('L')
            if start_offset > 0:
                result_image = ImageOps.invert(result_image)
            result_image = result_image.convert('L')
            mt = pil2tensor(result_image)
            masks.append(mt)
        return (masks,)
```