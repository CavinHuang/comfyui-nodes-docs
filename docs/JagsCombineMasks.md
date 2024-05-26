# Documentation
- Class name: JagsCombineMasks
- Category: Jags_vector/CLIPSEG
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点将多个掩码张量协同整合为统一的表示形式，便于在给定的图像上下文中集成分割区域。它旨在简化将二进制或分类数据合并为一致视觉输出的过程，提高基于掩码的图像处理任务的实用性。

# Input types
## Required
- input_image
    - 输入图像作为合并和可视化掩码的基础层，其作用至关重要，因为它提供了准确叠加和整合掩码所需的空间上下文。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_1
    - 主掩码在融合过程中是一个关键组件，定义了初始分割，为后续叠加其他掩码奠定了基础。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_2
    - 次级掩码通过引入额外的分割层来完善合并掩码，提高了最终输出的粒度和特异性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mask_3
    - 可选的第三级掩码为掩码组合提供了额外的维度，当需要时允许更复杂和细致的分割。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]

# Output types
- Combined Mask
    - 生成的合并掩码包含了输入掩码的集体分割信息，作为图像中分割元素的综合表示。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- Heatmap Mask
    - 热图掩码通过颜色叠加可视化合并分割，提供了直观且易于解释的分割结果描述。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- BW Mask
    - 二值掩码提供了一个清晰、高对比度的分割表示，以清晰和精确的方式突出显示划分的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class JagsCombineMasks:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_image': ('IMAGE',), 'mask_1': ('MASK',), 'mask_2': ('MASK',)}, 'optional': {'mask_3': ('MASK',)}}
    CATEGORY = 'Jags_vector/CLIPSEG'
    RETURN_TYPES = ('MASK', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('Combined Mask', 'Heatmap Mask', 'BW Mask')
    FUNCTION = 'combine_masks'

    def combine_masks(self, input_image: torch.Tensor, mask_1: torch.Tensor, mask_2: torch.Tensor, mask_3: Optional[torch.Tensor]=None) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """A method that combines two or three masks into one mask. Takes in tensors and returns the mask as a tensor, as well as the heatmap and binary mask as tensors."""
        if mask_1 is not None:
            mask_1 = mask_1.squeeze()
        if mask_2 is not None:
            mask_2 = mask_2.squeeze()
        if mask_3 is not None:
            mask_3 = mask_3.squeeze()
        combined_mask = mask_1 + mask_2 + mask_3 if mask_3 is not None else mask_1 + mask_2
        image_np = tensor_to_numpy(input_image)
        heatmap = apply_colormap(combined_mask, cm.viridis)
        binary_mask = apply_colormap(combined_mask, cm.Greys_r)
        dimensions = (image_np.shape[1], image_np.shape[0])
        print('heatmap', heatmap)
        if dimensions is None or dimensions[0] == 0 or dimensions[1] == 0:
            raise ValueError('Invalid dimensions')
        heatmap_resized = resize_image(heatmap, dimensions)
        binary_mask_resized = resize_image(binary_mask, dimensions)
        (alpha_heatmap, alpha_binary) = (0.5, 1)
        overlay_heatmap = overlay_image(image_np, heatmap_resized, alpha_heatmap)
        overlay_binary = overlay_image(image_np, binary_mask_resized, alpha_binary)
        image_out_heatmap = numpy_to_tensor(overlay_heatmap)
        image_out_binary = numpy_to_tensor(overlay_binary)
        return (combined_mask, image_out_heatmap, image_out_binary)
```