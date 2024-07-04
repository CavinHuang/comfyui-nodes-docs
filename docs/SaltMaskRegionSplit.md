
# Documentation
- Class name: SaltMaskRegionSplit
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskRegionSplit节点旨在隔离和分割给定掩码集中的不同区域，基于连通性有效地将它们分割成不同的区域。这个节点在图像处理和计算机视觉任务中特别有用，可以帮助识别和分析复杂图像中的独立区域或对象。

# Input types
## Required
- masks
    - masks参数是SaltMaskRegionSplit节点的核心输入，它代表要被分割成不同区域的输入掩码。这个参数对确定分割结果至关重要，因为它直接影响掩码中不同区域的隔离。通过处理这些输入掩码，节点能够识别和分离出独立的连通区域，从而实现有效的区域分割。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- region1
    - 代表从输入掩码中分离出的第一个区域。这个输出可能对应于图像中最大或最显著的连通区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- region2
    - 代表从输入掩码中分离出的第二个区域。这个输出可能对应于图像中第二大或第二显著的连通区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- region3
    - 代表从输入掩码中分离出的第三个区域。这个输出继续按重要性或大小顺序提供下一个独立区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- region4
    - 代表从输入掩码中分离出的第四个区域。这个输出提供了另一个独立的连通区域，进一步细化了区域分割。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- region5
    - 代表从输入掩码中分离出的第五个区域。这个输出继续提供更多的独立区域，有助于全面分析复杂图像。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- region6
    - 代表从输入掩码中分离出的第六个区域。这是最后一个输出区域，完成了对输入掩码中主要连通区域的分割。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskRegionSplit:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK", "MASK", "MASK", "MASK", "MASK", "MASK")
    RETURN_NAMES = ("region1", "region2", "region3", "region4", "region5", "region6")

    FUNCTION = "isolate_regions"

    def isolate_regions(self, masks):
        region_outputs = []

        for mask in masks:
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            mask_array = np.array(pil_image.convert('L'))

            num_labels, labels_im = cv2.connectedComponents(mask_array)

            outputs = [np.zeros_like(mask_array) for _ in range(6)]

            for i in range(1, min(num_labels, 7)):
                outputs[i-1][labels_im == i] = 255

            for output in outputs:
                output_pil = Image.fromarray(output)
                region_tensor = pil2mask(output_pil)
                region_outputs.append(region_tensor)

        regions_tensor = torch.stack(region_outputs, dim=0).view(len(masks), 6, *mask.size())
        return tuple(regions_tensor.unbind(dim=1))

```
