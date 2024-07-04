
# Documentation
- Class name: BboxVisualize
- Category: KJNodes/masking
- Output node: False

BboxVisualize节点旨在将边界框叠加到图像上，通过清晰地标记出特定线宽和颜色的感兴趣区域，从而增强视觉分析效果。

# Input types
## Required
- images
    - 一批将绘制边界框的图像。这些图像作为可视化过程的画布。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- bboxes
    - 一个边界框坐标列表，用于指定图像上需要高亮显示的区域。这些坐标在确定需要可视化的精确区域时起着至关重要的作用。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- line_width
    - 指定用于绘制边界框的线条粗细，影响高亮区域的可见度和显著性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- images
    - 带有绘制边界框的修改后的图像批次，可用于视觉检查或进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BboxVisualize:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "bboxes": ("BBOX",),
                "line_width": ("INT", {"default": 1,"min": 1, "max": 10, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "visualizebbox"
    DESCRIPTION = """
Visualizes the specified bbox on the image.
"""

    CATEGORY = "KJNodes/masking"

    def visualizebbox(self, bboxes, images, line_width):
        image_list = []
        for image, bbox in zip(images, bboxes):
            x_min, y_min, width, height = bbox
            image = image.permute(2, 0, 1)

            img_with_bbox = image.clone()
            
            # Define the color for the bbox, e.g., red
            color = torch.tensor([1, 0, 0], dtype=torch.float32)
            
            # Draw lines for each side of the bbox with the specified line width
            for lw in range(line_width):
                # Top horizontal line
                img_with_bbox[:, y_min + lw, x_min:x_min + width] = color[:, None]
                
                # Bottom horizontal line
                img_with_bbox[:, y_min + height - lw, x_min:x_min + width] = color[:, None]
                
                # Left vertical line
                img_with_bbox[:, y_min:y_min + height, x_min + lw] = color[:, None]
                
                # Right vertical line
                img_with_bbox[:, y_min:y_min + height, x_min + width - lw] = color[:, None]
        
            img_with_bbox = img_with_bbox.permute(1, 2, 0).unsqueeze(0)
            image_list.append(img_with_bbox)

        return (torch.cat(image_list, dim=0),)

```
