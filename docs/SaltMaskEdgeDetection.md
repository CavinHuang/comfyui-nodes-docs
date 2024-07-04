
# Documentation
- Class name: SaltMaskEdgeDetection
- Category: SALT/Masking/Filter
- Output node: False

本节点应用边缘检测算法来处理遮罩区域,主要使用Canny或Sobel方法来增强遮罩内的边缘。它旨在突出遮罩区域内物体的轮廓和边界,使其更加清晰,便于进一步处理或分析。

# Input types
## Required
- masks
    - 将进行边缘检测的输入遮罩。这些遮罩将被处理以突出其边缘,通过更清晰地描绘物体边界,显著影响节点的输出。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
- method
    - 指定要使用的边缘检测方法('canny'或'sobel')。方法的选择影响应用于遮罩的边缘增强技术,从而影响结果边缘的清晰度和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- low_threshold
    - 边缘检测算法阈值处理的下限。它有助于过滤噪声和不太明显的边缘,聚焦于更显著的边界。
    - Comfy dtype: INT
    - Python dtype: List[int]
- high_threshold
    - 边缘检测算法阈值处理的上限。它定义了被视为显著边缘的强度阈值,确保只有最突出的边缘被增强。
    - Comfy dtype: INT
    - Python dtype: List[int]
- sobel_ksize
    - Sobel算子的核大小,仅在使用Sobel方法时适用。它影响边缘检测的平滑度和精确度。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- MASKS
    - 包含输入遮罩增强边缘的输出张量。这个张量代表检测到的边缘,使遮罩内的边界更加突出,为进一步分析做好准备。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskEdgeDetection:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "method": (["sobel", "canny"], ),
                "low_threshold": ("INT", {"default": 50, "min": 0, "max": 255, "step": 1}),
                "high_threshold": ("INT", {"default": 150, "min": 0, "max": 255, "step": 1}),
                "sobel_ksize": ("INT", {"default": 5, "min": 1, "max": 7, "step": 1})
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "edge_detection"

    def edge_detection(self, masks, method='canny', low_threshold=50, high_threshold=150, sobel_ksize=5):
        regions = []

        if not isinstance(low_threshold, list):
            low_threshold = [low_threshold]
        if not isinstance(high_threshold, list):
            high_threshold = [high_threshold]
        if not isinstance(sobel_ksize, list):
            sobel_ksize = [sobel_ksize]

        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            image_array = np.array(pil_image.convert('L'))

            if method == 'canny':
                edges = cv2.Canny(
                    image_array, 
                    low_threshold[i if i < len(low_threshold) else -1], 
                    high_threshold[i if i < len(high_threshold) else -1]
                )
            elif method == 'sobel':
                sobelx = cv2.Sobel(image_array, cv2.CV_64F, 1, 0, ksize=sobel_ksize[i if i < len(sobel_ksize) else -1])
                sobely = cv2.Sobel(image_array, cv2.CV_64F, 0, 1, ksize=sobel_ksize[i if i < len(sobel_ksize) else -1])
                edges = cv2.magnitude(sobelx, sobely)
                edges = np.uint8(255 * edges / np.max(edges))
            else:
                raise ValueError(f"Invalid edge detection mode '{method}', please use sobel, or canny.")
            
            edge_pil = Image.fromarray(edges)

            region_tensor = pil2mask(edge_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
