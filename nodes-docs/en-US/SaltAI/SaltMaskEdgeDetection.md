---
tags:
- Mask
- MaskEnhancement
- MaskRegion
---

# Edge Detect Mask Regions
## Documentation
- Class name: `SaltMaskEdgeDetection`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies edge detection algorithms to mask regions, enhancing the edges within the masks using methods like Canny or Sobel. It's designed to highlight the contours and boundaries of objects within the mask regions, making them more distinct for further processing or analysis.
## Input types
### Required
- **`masks`**
    - The input masks on which edge detection will be performed. These masks are processed to highlight their edges, significantly impacting the node's output by delineating object boundaries more clearly.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`method`**
    - Specifies the edge detection method to use ('canny' or 'sobel'). The choice of method affects the edge enhancement technique applied to the masks, influencing the clarity and style of the resulting edges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`low_threshold`**
    - The lower bound for the edge detection algorithm's thresholding. It helps in filtering out noise and less prominent edges, focusing on more significant boundaries.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`high_threshold`**
    - The upper bound for the edge detection algorithm's thresholding. It defines the intensity above which edges are considered significant, ensuring that only the most prominent edges are enhanced.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`sobel_ksize`**
    - The kernel size for the Sobel operator, applicable only when the Sobel method is used. It affects the smoothness and precision of the edge detection.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output tensor containing the enhanced edges of the input masks. This tensor represents the detected edges, making the boundaries within the masks more pronounced and ready for further analysis.
    - Python dtype: `torch.Tensor`
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
