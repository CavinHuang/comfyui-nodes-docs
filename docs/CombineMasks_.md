# Documentation
- Class name: CombineMasks
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-CLIPSeg

CombineMasks是一个旨在将多个掩码张量整合为一个综合掩码的节点，增强了底层数据的表示。该节点不仅合并掩码，还生成如热图和二值叠加等视觉表示，提供了对掩码内容更详细的分析。

# Input types
## Required
- input_image
    - 输入图像参数至关重要，因为它作为掩码组合过程的基础层。它提供了节点正确叠加和可视化掩码所需的空间上下文。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_1
    - 第一个掩码是组合过程中不可或缺的组成部分，代表了将与后续掩码一起增强的初始分割信息层。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_2
    - 第二个掩码增加了额外的分割层，有助于提高组合掩码的复杂性和细节。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mask_3
    - 可选的第三个掩码通过引入更细粒度的细节来进一步细化分割，增强了整体掩码的表示。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- Combined Mask
    - 组合掩码是节点的主要输出，代表了所有输入掩码融合为单一、统一表示的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- Heatmap Mask
    - 热图掩码可视化了组合分割，提供了彩色表示，增强了分割结果的可解释性和分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- BW Mask
    - 二值掩码提供了一个简化的黑白视图，强调核心元素，并提供了一个清晰、直接的分析工具。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CombineMasks:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_image': ('IMAGE',), 'mask_1': ('MASK',), 'mask_2': ('MASK',)}, 'optional': {'mask_3': ('MASK',)}}
    CATEGORY = '♾️Mixlab/Mask'
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
        print(mask_1.shape, mask_2.shape, mask_3.shape)
        combined_mask = mask_1 + mask_2 + mask_3 if mask_3 is not None else mask_1 + mask_2
        image_np = tensor_to_numpy(input_image)
        heatmap = apply_colormap(combined_mask, cm.viridis)
        binary_mask = apply_colormap(combined_mask, cm.Greys_r)
        dimensions = (image_np.shape[1], image_np.shape[0])
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