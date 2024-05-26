# Documentation
- Class name: BrushMotion
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

BrushMotion节点通过根据指定的掩码缩放和插值输入的运动数据，实现对视觉内容的动态调整，从而生成运动效果。

# Input types
## Required
- model
    - 模型参数至关重要，它定义了要生成的运动效果的基础结构和特征。
    - Comfy dtype: DragNUWA
    - Python dtype: torchvision.models.video.DragNUWA
- motion_brush
    - 运动刷子参数对于提供原始运动数据至关重要，这些数据将根据掩码进行处理和缩放。
    - Comfy dtype: MotionBrush
    - Python dtype: torch.Tensor
- brush_mask
    - 画笔掩码参数很重要，因为它决定了将要修改的运动效果区域，确保对视觉调整有精确的控制。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray

# Output types
- results
    - 结果参数包含了最终的运动效果，展示了根据输入掩码和模型规格调整后的运动。
    - Comfy dtype: MotionBrush
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BrushMotion:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('DragNUWA',), 'motion_brush': ('MotionBrush',), 'brush_mask': ('MASK',)}}
    RETURN_TYPES = ('MotionBrush',)
    FUNCTION = 'run_inference'
    CATEGORY = 'DragNUWA'

    def run_inference(self, model, motion_brush, brush_mask):
        from torchvision.ops import masks_to_boxes
        boxes = masks_to_boxes(brush_mask)
        box = boxes[0].int().tolist()
        print(box)
        xratio = (box[2] - box[0]) / motion_brush.shape[2]
        yratio = (box[3] - box[1]) / motion_brush.shape[1]
        xmotionbrush = motion_brush[:, :, :, :1]
        ymotionbrush = motion_brush[:, :, :, 1:]
        xmotionbrush = xmotionbrush * xratio
        ymotionbrush = ymotionbrush * yratio
        motionbrush = torch.cat([xmotionbrush, ymotionbrush], 3)
        results = torch.zeros(model.model_length - 1, model.height, model.width, 2)
        for i in range(model.model_length - 1):
            temp = F.interpolate(motionbrush[i].unsqueeze(0).permute(0, 3, 1, 2).float(), size=(box[3] - box[1], box[2] - box[0]), mode='bilinear', align_corners=True).squeeze().permute(1, 2, 0)
            for x in range(box[0], box[2]):
                for y in range(box[1], box[3]):
                    if brush_mask[0][y][x]:
                        results[i][y][x][0] = temp[y - box[1]][x - box[0]][0]
                        results[i][y][x][1] = temp[y - box[1]][x - box[0]][1]
        return (results,)
```