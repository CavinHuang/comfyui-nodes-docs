
# Documentation
- Class name: SaltMaskRegionLabeling
- Category: SALT/Masking/Filter
- Output node: False

该节点旨在标记掩码中的不同区域，将其转换为基于连通性的视觉上不同的区域，并将这些标记的区域输出为张量。它利用阈值处理和连通组件分析来分割和标记不同的区域，通过为每个区域分配唯一的颜色来增强掩码区域的可解释性。

# Input types
## Required
- masks
    - 需要标记的输入掩码，每个掩码都会根据指定的阈值进行处理，以识别和标记连通区域。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- threshold
    - 用于对掩码进行二值化阈值处理的阈值列表，这对于分离要标记的区域至关重要。如果提供单个值，则将应用于所有掩码。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- images
    - 包含标记区域的输出张量，每个区域被分配一个唯一的颜色以区分它与其他区域。这个修正解决了反馈中的问题，正确地将输出识别为标记图像的张量，而不仅仅是"regions_tensor"。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskRegionLabeling:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "threshold": ("INT", {"default": 128, "min": 0, "max": 255, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "region_labeling"

    def region_labeling(self, masks, threshold=[128]):

        if not isinstance(threshold, list):
            threshold = [threshold]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('L'))

            _, thresh_image = cv2.threshold(image_array, threshold[i if i < len(threshold) else -1], 255, cv2.THRESH_BINARY)

            num_labels, labels_im = cv2.connectedComponents(thresh_image)
            max_label = max(num_labels - 1, 1)

            hues = np.linspace(0, 179, num=max_label + 1, endpoint=False, dtype=np.uint8)

            label_hue = np.zeros_like(labels_im, dtype=np.uint8)
            for i in range(1, num_labels):
                label_hue[labels_im == i] = hues[i]

            saturation = np.uint8(np.where(labels_im == 0, 0, 255))
            value = np.uint8(np.where(labels_im == 0, 0, 255))

            labeled_img = cv2.merge([label_hue, saturation, value])
            labeled_img = cv2.cvtColor(labeled_img, cv2.COLOR_HSV2BGR)

            labeled_pil = Image.fromarray(labeled_img)
            region_tensor = pil2tensor(labeled_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
