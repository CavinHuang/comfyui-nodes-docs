# Documentation
- Class name: GroundingDinoSAMSegment
- Category: segment_anything
- Output node: False
- Repo Ref: https://github.com/storyicon/comfyui_segment_anything

GroundingDinoSAMSegment节点旨在通过基于文本提示的图像分割来处理图像。它利用SAM（Segment Anything Model）和GroundingDino模型的能力来识别和隔离图像中的对象，提供分割后的图像及其对应的掩码。该节点特别适用于需要从视觉和文本输入中理解对象级别的应用程序。

# Input types
## Required
- sam_model
    - SAM模型对于分割过程至关重要，提供了识别和分离图像中对象的核心功能。它在节点根据输入图像和提示执行精确分割的能力中起着关键作用。
    - Comfy dtype: SAM_MODEL
    - Python dtype: torch.nn.Module
- grounding_dino_model
    - GroundingDino模型用于根据文本提示预测图像中对象的边界框。它是初始对象检测步骤的关键组件，为后续的分割过程奠定了基础。
    - Comfy dtype: GROUNDING_DINO_MODEL
    - Python dtype: torch.nn.Module
- image
    - 输入图像是节点操作的主要数据源。它是分割过程的对象，节点的目标是根据提供的提示识别和分离其中包含的对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- prompt
    - 提示作为文本描述，指导节点在图像中识别感兴趣的对象。它是一个重要的输入，帮助节点将其分割工作集中在图像的相关部分上。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- threshold
    - 阈值参数用于确定对象检测的置信度水平。它影响节点基于grounding预测决定要分割哪些对象，允许控制最终输出中包含的对象。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 输出图像是分割过程的结果，显示了从输入图像中分离出的对象。它代表了节点的主要视觉输出，根据提供的提示和模型能力突出了分割成功。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - 掩码输出提供了分割的二进制表示，概述了图像中与分割对象相对应的精确区域。对于需要详细对象勾画的应用程序来说，它是一个关键组件。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class GroundingDinoSAMSegment:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'sam_model': ('SAM_MODEL', {}), 'grounding_dino_model': ('GROUNDING_DINO_MODEL', {}), 'image': ('IMAGE', {}), 'prompt': ('STRING', {}), 'threshold': ('FLOAT', {'default': 0.3, 'min': 0, 'max': 1.0, 'step': 0.01})}}
    CATEGORY = 'segment_anything'
    FUNCTION = 'main'
    RETURN_TYPES = ('IMAGE', 'MASK')

    def main(self, grounding_dino_model, sam_model, image, prompt, threshold):
        res_images = []
        res_masks = []
        for item in image:
            item = Image.fromarray(np.clip(255.0 * item.cpu().numpy(), 0, 255).astype(np.uint8)).convert('RGBA')
            boxes = groundingdino_predict(grounding_dino_model, item, prompt, threshold)
            if boxes.shape[0] == 0:
                break
            (images, masks) = sam_segment(sam_model, item, boxes)
            res_images.extend(images)
            res_masks.extend(masks)
        if len(res_images) == 0:
            (_, height, width, _) = image.size()
            empty_mask = torch.zeros((1, height, width), dtype=torch.uint8, device='cpu')
            return (empty_mask, empty_mask)
        return (torch.cat(res_images, dim=0), torch.cat(res_masks, dim=0))
```