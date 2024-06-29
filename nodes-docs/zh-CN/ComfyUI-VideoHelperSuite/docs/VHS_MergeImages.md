# Documentation
- Class name: MergeImages
- Category: Video Helper Suite 🎥🅥🅗🅢/image
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

MergeImages 节点的 'merge' 方法旨在将两组图像合并为一个单一的数组。它通过应用基于指定合并策略的缩放和裁剪技术，智能地处理图像尺寸的差异。当需要进一步处理或可视化时，此方法对于准备统一的图像数据集至关重要。

# Input types
## Required
- images_A
    - 参数 'images_A' 表示要合并的第一组图像。当两组图像之间存在尺寸差异时，它在确定合并后的图像数组的最终尺寸和结构中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images_B
    - 参数 'images_B' 表示要合并的第二组图像。它的尺寸会与 'images_A' 进行协调，以确保输出的一致性，并且对合并后的图像集的最终组成有重要贡献。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- merge_strategy
    - 参数 'merge_strategy' 决定如何组合两组图像。它对于解决尺寸不匹配至关重要，并指导缩放和裁剪过程以持合并输出中的视觉一致性。
    - Comfy dtype: str
    - Python dtype: str
- scale_method
    - 参数 'scale_method' 指定用于调整图像大小以匹配尺寸的技术。它是图像合并过程中的一个关键组成部分，确保图像在不损害质量的情况下被适当缩放。
    - Comfy dtype: str
    - Python dtype: str
- crop
    - 参数 'crop' 确定在缩放后应如何裁剪图像以适应合并后的图像数组。它对于保持最终合并图像的纵横比和整体视觉吸引力具有重要意义。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- IMAGE
    - 输出 'IMAGE' 表示合并后的图像数组，是合并过程的最终结果。它包含了根据指定的合并策略和缩放参数从 'images_A' 和 'images_B' 组合的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- count
    - 输出 'count' 提供了合并数组中图像的总数。这个整数值对于依赖于知道确切图像数量的索引和进一步处理步骤具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MergeImages:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images_A': ('IMAGE',), 'images_B': ('IMAGE',), 'merge_strategy': (MergeStrategies.list_all,), 'scale_method': (ScaleMethods.list_all,), 'crop': (CropMethods.list_all,)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/image'
    RETURN_TYPES = ('IMAGE', 'INT')
    RETURN_NAMES = ('IMAGE', 'count')
    FUNCTION = 'merge'

    def merge(self, images_A: Tensor, images_B: Tensor, merge_strategy: str, scale_method: str, crop: str):
        images = []
        if images_A.shape[3] != images_B.shape[3] or images_A.shape[2] != images_B.shape[2]:
            images_A = images_A.movedim(-1, 1)
            images_B = images_B.movedim(-1, 1)
            A_size = images_A.shape[3] * images_A.shape[2]
            B_size = images_B.shape[3] * images_B.shape[2]
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            if use_A_as_template:
                images_B = comfy.utils.common_upscale(images_B, images_A.shape[3], images_A.shape[2], scale_method, crop)
            else:
                images_A = comfy.utils.common_upscale(images_A, images_B.shape[3], images_B.shape[2], scale_method, crop)
            images_A = images_A.movedim(1, -1)
            images_B = images_B.movedim(1, -1)
        images.append(images_A)
        images.append(images_B)
        all_images = torch.cat(images, dim=0)
        return (all_images, all_images.size(0))
```