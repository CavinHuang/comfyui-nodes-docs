# Documentation
- Class name: ConstrainImage
- Category: image
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点旨在将图像尺寸调整到指定边界内，同时保持图像的纵横比。它通过将图像缩放到最接近的最大和最小尺寸的尺寸来操作，如有必要，还会裁剪图像以确保它完全适合定义的约束条件。

# Input types
## Required
- images
    - 图像参数是必需的，因为它提供了将被约束的输入图像。它通过确定节点将处理和转换的数据直接影响节点的操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- max_width
    - 最大宽度参数规定了图像变换后宽度的上限。它在确保图像不超出期望尺寸，从而保持预期的纵横比方面发挥着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- max_height
    - 与最大宽度类似，最大高度参数设置了图像高度的上限。它在确保图像在变换过程中垂直尺寸得到适当约束方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- min_width
    - 最小宽度参数确保图像不会缩小到某个阈值以下，这对于保持图像的完整性和防止图像变得太小而无法有效查看或分析非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- min_height
    - 最小高度参数用于维持图像高度的基线，确保即使在缩放以适应指定的约束条件时，图像仍然保持可见和可读。
    - Comfy dtype: INT
    - Python dtype: int
- crop_if_required
    - 如果需要，crop_if_required参数是一个决策点，用于确定在缩放后如果图像不符合指定的约束条件是否应该裁剪图像。这个选择会影响图像变换的最终结果。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- IMAGE
    - 输出图像是约束过程的结果，代表已调整以适应指定的最大和最小尺寸的输入图像，同时保持其纵横比。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ConstrainImage:
    """
    A node that constrains an image to a maximum and minimum size while maintaining aspect ratio.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'max_width': ('INT', {'default': 1024, 'min': 0}), 'max_height': ('INT', {'default': 1024, 'min': 0}), 'min_width': ('INT', {'default': 0, 'min': 0}), 'min_height': ('INT', {'default': 0, 'min': 0}), 'crop_if_required': (['yes', 'no'], {'default': 'no'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'constrain_image'
    CATEGORY = 'image'
    OUTPUT_IS_LIST = (True,)

    def constrain_image(self, images, max_width, max_height, min_width, min_height, crop_if_required):
        crop_if_required = crop_if_required == 'yes'
        results = []
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8)).convert('RGB')
            (current_width, current_height) = img.size
            aspect_ratio = current_width / current_height
            constrained_width = max(min(current_width, min_width), max_width)
            constrained_height = max(min(current_height, min_height), max_height)
            if constrained_width / constrained_height > aspect_ratio:
                constrained_width = max(int(constrained_height * aspect_ratio), min_width)
                if crop_if_required:
                    constrained_height = int(current_height / (current_width / constrained_width))
            else:
                constrained_height = max(int(constrained_width / aspect_ratio), min_height)
                if crop_if_required:
                    constrained_width = int(current_width / (current_height / constrained_height))
            resized_image = img.resize((constrained_width, constrained_height), Image.LANCZOS)
            if crop_if_required and (constrained_width > max_width or constrained_height > max_height):
                left = max((constrained_width - max_width) // 2, 0)
                top = max((constrained_height - max_height) // 2, 0)
                right = min(constrained_width, max_width) + left
                bottom = min(constrained_height, max_height) + top
                resized_image = resized_image.crop((left, top, right, bottom))
            resized_image = np.array(resized_image).astype(np.float32) / 255.0
            resized_image = torch.from_numpy(resized_image)[None,]
            results.append(resized_image)
        return (results,)
```